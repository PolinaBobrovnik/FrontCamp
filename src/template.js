// template.js

import moment from 'moment';

const article = element => {
    const newArticle = document.createElement('div');
    newArticle.classList.add('article');
    newArticle.innerHTML = `<div class="post float-left float-sm-none pos-relative">
            <a class="pos-relative h-100 dplay-block" target="_blank" href = "${element.url}">
                <div class="img-bg bg-4 bg-grad-layer-6" style="background-image: url(${element.urlToImage})"></div>
                <div class="abs-blr color-white p-20 bg-sm-color-7">
                    <h4 class="mb-10 mb-sm-5"><b>${element.title}</b></h4>
                    <ul class="list-li-mr-20">
                        <li>${ moment(element.publishedAt).format('mmm dd, yyyy') }</li>
                        <li><i class="color-primary mr-5 font-12 ion-ios-bolt"></i>${element.source.name}</li>
                    </ul>
                </div>
            </a>
        </div>`;
    return newArticle;
  };

const clearfix = () => {
  const clearfix = document.createElement('div');
  clearfix.classList.add("clearfix");
  return clearfix
}

const noData = () => {
  const noData = document.createElement('div');
  noData.classList.add("autosuggest-item-noclick");
  noData.innerHTML = `Not found publisher, press enter or search button to search by this keyword(s)`;
  return noData;
}

const newSourceName = sourceName => {
  const newSourceName = document.createElement('div');
  newSourceName.setAttribute('data-source', sourceName);
  newSourceName.classList.add("autosuggest-item");
  newSourceName.innerHTML = `${sourceName}`;
  return newSourceName;
}

export { article, clearfix, noData, newSourceName };
