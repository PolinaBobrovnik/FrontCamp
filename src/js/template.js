// template.js

import moment from 'moment';

const article = (element) => {
  const newArticle = document.createElement('div');
  newArticle.classList.add('article');
  newArticle.innerHTML = `<div class="post float-left float-sm-none pos-relative">
            <a class="pos-relative h-100 dplay-block" target="_blank" href = "${element.url}">
                <div class="img-bg bg-4 bg-grad-layer-6" style="background-image: url(${element.urlToImage})"></div>
                <div class="abs-blr color-white p-20 bg-sm-color-7">
                    <h4 class="mb-10 mb-sm-5"><b>${element.title}</b></h4>
                    <ul class="list-li-mr-20">
                        <li>${moment(element.publishedAt).format('MMM DD, YYYY')}</li>
                        <li><i class="color-primary mr-5 font-12 ion-ios-bolt"></i>${element.source.name}</li>
                    </ul>
                </div>
            </a>
        </div>`;
  return newArticle;
};

const clearfix = () => {
  const clearfixElement = document.createElement('div');
  clearfixElement.classList.add('clearfix');
  return clearfixElement;
};

const noData = () => {
  const noDataElement = document.createElement('div');
  noDataElement.classList.add('autosuggest-item-noclick');
  noDataElement.innerHTML = 'Not found publisher, press enter or search button to search by this keyword(s)';
  return noDataElement;
};

const newSourceName = (sourceName) => {
  const newSourceNameElement = document.createElement('div');
  newSourceNameElement.setAttribute('data-source', sourceName);
  newSourceNameElement.classList.add('autosuggest-item');
  newSourceNameElement.innerHTML = `${sourceName}`;
  return newSourceNameElement;
};

export {
  article, clearfix, noData, newSourceName,
};
