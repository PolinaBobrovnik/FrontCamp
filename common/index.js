const sourcesNameToId = new Map();
const sourcesNames = [];
fetch('https://newsapi.org/v2/sources?apiKey=2a878fc593044fdba0c5153f9a2a46e7')
    .then(res => res.json())
    .then(data => data.sources)
    .then(sources => sources.forEach(source => {
        sourcesNameToId.set(source.name, source.id);
        sourcesNames.push(source.name);
    }));

const searchInput = document.querySelector('.search-input');
const searchSubmit = document.querySelector('.search-submit');
searchInput.addEventListener('input', (event) => {
    const searchedSourcesNames = sourcesNames
        .filter(sourceName => sourceName.toLowerCase()
            .indexOf(event.target.value.toLowerCase()) === 0);
    createAutosuggest(searchedSourcesNames);
});
searchSubmit.addEventListener('click', (event) => {
    const q = searchInput.value;
    requestData({q})
});

const autosuggest = document.querySelector('.autosuggest');
autosuggest.addEventListener('click', (event) => {
    console.log(event.target.dataset.source);
    const sourceId = sourcesNameToId.get(event.target.dataset.source);
    requestData({ publisher: sourceId });
});
const createAutosuggest = (sourceNames) => {
    while (autosuggest.firstChild) {
        autosuggest.removeChild(autosuggest.firstChild);
    }
    sourceNames.forEach(sourceName => {
        const newSourceName = document.createElement('div');
        newSourceName.setAttribute('data-source', sourceName);
        newSourceName.innerHTML = `${sourceName}`;

        autosuggest.appendChild(newSourceName);  
    });
}

function requestData({
    top = true, category, country = 'us', numberOfRecords, publisher, q
}) {
    const search = top ? `top-headlines` : `everything`;
    const queryMap = {
        apiKey: '2a878fc593044fdba0c5153f9a2a46e7', 
        category: category && !publisher || '',
        country: top && !publisher ? country : '',
        sources: publisher || '',
        pageSize: numberOfRecords || '',
        q: q || ''
    }
    const query = Object.keys(queryMap)
                    .filter(key => queryMap[key])
                    .map(key => `${key}=${queryMap[key]}`)
                    .join('&');

    const url = `https://newsapi.org/v2/${search}?${query}`;
    const req = new Request(url);
    fetch(req)
        .then( response => response.json())
        .then(result => createArticles(result.articles))
};
requestData({});

const categories = document.querySelector('#main-menu');
const mainContent = document.querySelector('#main-content');

categories.onclick = (event) => {
    const category = event.target.dataset.name;
    requestData({category});
};

const settings = document.querySelector('.settings');
settings.addEventListener('submit', (event) => {
    event.preventDefault();
});

const cbx = document.querySelector('#cbx');
const toggle = document.querySelector('.toggle');
toggle.onclick = () => {
    requestData({ top: !cbx.checked });
}

const numberInput = document.querySelector('#number');
const onNumberInputChange = (event) => {
    if (!event.keyCode  || event.keyCode && event.keyCode === 13) {
        requestData({ numberOfRecords: event.target.value });
    }
};
numberInput.addEventListener('blur', onNumberInputChange);
numberInput.addEventListener('keypress', onNumberInputChange);

const createArticles = (articles) => {
    while (mainContent.firstChild) {
        mainContent.removeChild(mainContent.firstChild);
    }
    articles.forEach(element => {
        const newArticle = document.createElement('div');
        newArticle.innerHTML = `<div class="post pr-5 pr-sm-0 pt-5 float-left float-sm-none pos-relative w-1-3 w-sm-100 h-sm-300x">
            <a class="pos-relative h-100 dplay-block" target="_blank" href = "${element.url}">
                <div class="img-bg bg-4 bg-grad-layer-6" style="background-image: url(${element.urlToImage})"></div>
                <div class="abs-blr color-white p-20 bg-sm-color-7">
                    <h4 class="mb-10 mb-sm-5"><b>${element.title}</b></h4>
                    <ul class="list-li-mr-20">
                        <li>${new Date(element.publishedAt).toDateString()}</li>
                        <li><i class="color-primary mr-5 font-12 ion-ios-bolt"></i>30,190</li>
                        <li><i class="color-primary mr-5 font-12 ion-chatbubbles"></i>30</li>
                    </ul>
                </div> <!--abs - blr-- >
					</a >< !--pos - relative-- >
				</div >`;
    mainContent.appendChild(newArticle);  
    });
};