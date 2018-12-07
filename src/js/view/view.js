// view.js

import {
  article, clearfix, noData, newSourceName,
} from './template';
import { $on, preventDefault } from '../utils/util';

export default class View {
  constructor() {
    this.el = document.getElementById('target');
    this.searchInput = document.querySelector('.search-input');
    this.searchSubmit = document.querySelector('.search-submit');
    this.search = document.querySelector('.search');
    this.searchForm = document.querySelector('.src-form');
    this.searchButton = document.querySelector('.src-btn');
    this.srcIcn = document.querySelector('.src-icn');
    this.closeIcn = document.querySelector('.close-icn');
    this.menuIcon = document.querySelector('.menu-nav-icon');
    this.autosuggest = document.querySelector('.autosuggest');
    this.topHeadlinesFilter = document.querySelector('.center');
    this.categories = document.querySelector('#main-menu');
    this.mainContent = document.querySelector('#main-content');
    this.settings = document.querySelector('.settings');
    this.cbx = document.querySelector('#cbx');
    this.toggle = document.querySelector('.toggle');
    this.numberInput = document.querySelector('#number');
    this.preventDefaultForSubmit();
  }

  bindSelectCategory(handler) {
    $on(this.categories, 'click', handler);
  }

  preventDefaultForSubmit() {
    $on(this.settings, 'submit', preventDefault);
    $on(this.search, 'submit', preventDefault);
  }

  bindToggleTopHeadlines(handler) {
    $on(this.toggle, 'click', handler);
  }

  bindOnNumberInputChange(handler) {
    $on(this.numberInput, 'blur', handler);
    $on(this.numberInput, 'keypress', handler);
  }

  bindToggleSearchButton(handler) {
    $on(this.searchButton, 'click', handler);
  }

  bindToggleMenu(handler) {
    $on(this.menuIcon, 'click', handler);
  }

  bindOnSearchInputChange(handler) {
    $on(this.searchInput, 'input', handler);
  }

  bindOnSearchInputSubmit(handler) {
    $on(this.searchSubmit, 'click', handler);
  }

  bindSelectPublisher(handler) {
    $on(this.autosuggest, 'click', handler);
  }

  createArticles(articles) {
    while (this.mainContent.firstChild) {
      this.mainContent.removeChild(this.mainContent.firstChild);
    }
    this.numberInput.value = articles.length;
    articles.forEach((element) => {
      this.mainContent.appendChild(article(element));
    });
    this.mainContent.appendChild(clearfix());
  }

  showTopHeadlinesFilter(isShown) {
    if (isShown) {
      this.topHeadlinesFilter.classList.remove('hidden');
    } else {
      this.topHeadlinesFilter.classList.add('hidden');
    }
  }

  createAutosuggest(sourceNames) {
    while (this.autosuggest.firstChild) {
      this.autosuggest.removeChild(this.autosuggest.firstChild);
    }

    if (sourceNames.length === 0) {
      this.autosuggest.appendChild(noData());
    } else {
      sourceNames.forEach((sourceName) => {
        this.autosuggest.appendChild(newSourceName(sourceName));
      });
    }
    this.autosuggest.style.bottom = `-${this.autosuggest.clientHeight}px`;
    this.autosuggest.classList.remove('hidden');
  }

  toggleSearchButton() {
    this.srcIcn.classList.toggle('active');
    this.closeIcn.classList.toggle('active');
    this.searchForm.classList.toggle('active');
  }

  onSearchInputSubmit() {
    this.searchButton.click();
    this.autosuggest.classList.add('hidden');
  }

  toggleMenu() {
    const mainMenu = this.menuIcon.dataset.menu;
    document.querySelector(mainMenu).classList.toggle('visible-menu');
  }
}
