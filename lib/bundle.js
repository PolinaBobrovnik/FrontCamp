(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _model2.default)();

var sourcesNameToId = new Map();
var sourcesNames = [];
var settingOfRequest = {
    category: '',
    sources: '',
    pageSize: '',
    q: ''
};

fetch('https://newsapi.org/v2/sources?apiKey=2a878fc593044fdba0c5153f9a2a46e7').then(function (res) {
    return res.json();
}).then(function (data) {
    return data.sources;
}).then(function (sources) {
    return sources.forEach(function (source) {
        sourcesNameToId.set(source.name, source.id);
        sourcesNames.push(source.name);
    });
});

var searchInput = document.querySelector('.search-input');
var searchSubmit = document.querySelector('.search-submit');
var searchForm = document.querySelector('.src-form');
var searchButton = document.querySelector('.src-btn');
var srcIcn = document.querySelector('.src-icn');
var closeIcn = document.querySelector('.close-icn');
var menuIcon = document.querySelector('.menu-nav-icon');

searchButton.addEventListener('click', function () {
    srcIcn.classList.toggle('active');
    closeIcn.classList.toggle('active');
    searchForm.classList.toggle('active');
});

menuIcon.addEventListener('click', function () {
    var mainMenu = menuIcon.dataset.menu;
    document.querySelector(mainMenu).classList.toggle('visible-menu');
});

searchInput.addEventListener('input', function (event) {
    var searchedSourcesNames = sourcesNames.filter(function (sourceName) {
        return sourceName.toLowerCase().indexOf(event.target.value.toLowerCase()) === 0;
    });
    createAutosuggest(searchedSourcesNames);
});

var onSearchInputSubmit = function onSearchInputSubmit(event) {
    if (!event.keyCode || event.keyCode && event.keyCode === 13) {
        searchButton.click();
        autosuggest.classList.add("hidden");
        var q = searchInput.value;
        settingOfRequest.q = q;
        requestData({ q: q, numberOfRecords: settingOfRequest.numberOfRecords });
    }
};

searchSubmit.addEventListener('click', onSearchInputSubmit);

var autosuggest = document.querySelector('.autosuggest');
autosuggest.addEventListener('click', function (event) {
    if (event.target.dataset.source) {
        searchButton.click();
        autosuggest.classList.add("hidden");
        var sourceId = sourcesNameToId.get(event.target.dataset.source);
        settingOfRequest.publisher = sourceId;
        requestData({ publisher: sourceId, numberOfRecords: settingOfRequest.numberOfRecords });
    }
});
var createAutosuggest = function createAutosuggest(sourceNames) {
    while (autosuggest.firstChild) {
        autosuggest.removeChild(autosuggest.firstChild);
    }

    if (sourceNames.length === 0) {
        var newSourceName = document.createElement('div');
        newSourceName.classList.add("autosuggest-item-noclick");
        newSourceName.innerHTML = 'Not found publisher, press enter or search button to search by this keyword(s)';
        autosuggest.appendChild(newSourceName);
    } else {
        sourceNames.forEach(function (sourceName) {
            var newSourceName = document.createElement('div');
            newSourceName.setAttribute('data-source', sourceName);
            newSourceName.classList.add("autosuggest-item");
            newSourceName.innerHTML = '' + sourceName;

            autosuggest.appendChild(newSourceName);
        });
    }
    autosuggest.style.bottom = '-' + autosuggest.clientHeight + 'px';
    autosuggest.classList.remove("hidden");
};

var topHeadlinesFilter = document.querySelector('.center');
var showTopHeadlinesFilter = function showTopHeadlinesFilter(isShown) {
    isShown ? topHeadlinesFilter.classList.remove("hidden") : topHeadlinesFilter.classList.add("hidden");
};

function requestData(_ref) {
    var _ref$top = _ref.top,
        top = _ref$top === undefined ? true : _ref$top,
        category = _ref.category,
        _ref$country = _ref.country,
        country = _ref$country === undefined ? 'us' : _ref$country,
        numberOfRecords = _ref.numberOfRecords,
        publisher = _ref.publisher,
        q = _ref.q;

    showTopHeadlinesFilter(Boolean(q));
    var search = top ? 'top-headlines' : 'everything';
    var queryMap = {
        apiKey: '2a878fc593044fdba0c5153f9a2a46e7',
        category: category && !publisher ? category : '',
        country: top && !publisher ? country : '',
        sources: publisher || '',
        pageSize: numberOfRecords || '',
        q: q || ''
    };
    var query = Object.keys(queryMap).filter(function (key) {
        return queryMap[key];
    }).map(function (key) {
        return key + '=' + queryMap[key];
    }).join('&');

    var url = 'https://newsapi.org/v2/' + search + '?' + query;
    var req = new Request(url);
    fetch(req).then(function (response) {
        return response.json();
    }).then(function (result) {
        return createArticles(result.articles);
    });
};
requestData({});

var categories = document.querySelector('#main-menu');
var mainContent = document.querySelector('#main-content');

categories.onclick = function (event) {
    var category = event.target.dataset.name;
    settingOfRequest.category = category;
    requestData({ category: category, numberOfRecords: settingOfRequest.numberOfRecords });
};

var settings = document.querySelector('.settings');
settings.addEventListener('submit', function (event) {
    event.preventDefault();
});

var cbx = document.querySelector('#cbx');
var toggle = document.querySelector('.toggle');
toggle.onclick = function () {
    settingOfRequest.top = !cbx.checked;
    requestData(settingOfRequest);
};

var numberInput = document.querySelector('#number');
var onNumberInputChange = function onNumberInputChange(event) {
    if (!event.keyCode || event.keyCode && event.keyCode === 13) {
        settingOfRequest.numberOfRecords = event.target.value;
        requestData(settingOfRequest);
    }
};
numberInput.addEventListener('blur', onNumberInputChange);
numberInput.addEventListener('keypress', onNumberInputChange);

var createArticles = function createArticles(articles) {
    while (mainContent.firstChild) {
        mainContent.removeChild(mainContent.firstChild);
    }

    numberInput.value = articles.length;
    settingOfRequest.numberOfRecords = articles.length;

    articles.forEach(function (element) {
        var newArticle = document.createElement('div');
        newArticle.classList.add('article');
        newArticle.innerHTML = '<div class="post float-left float-sm-none pos-relative">\n            <a class="pos-relative h-100 dplay-block" target="_blank" href = "' + element.url + '">\n                <div class="img-bg bg-4 bg-grad-layer-6" style="background-image: url(' + element.urlToImage + ')"></div>\n                <div class="abs-blr color-white p-20 bg-sm-color-7">\n                    <h4 class="mb-10 mb-sm-5"><b>' + element.title + '</b></h4>\n                    <ul class="list-li-mr-20">\n                        <li>' + new Date(element.publishedAt).toDateString() + '</li>\n                        <li><i class="color-primary mr-5 font-12 ion-ios-bolt"></i>' + element.source.name + '</li>\n                    </ul>\n                </div>\n            </a>\n        </div>';
        mainContent.appendChild(newArticle);
    });
    var clearfix = document.createElement('div');
    clearfix.classList.add("clearfix");
    mainContent.appendChild(clearfix);
};

},{"./model":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    console.log('gulp');
};

},{}]},{},[1]);
