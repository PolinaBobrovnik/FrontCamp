// main.js

import View from './view';
import Model from './model';
import Controller from './controller';
import { $on, preventDefault } from './util';

class App {
  constructor() {
    const model = new Model();
    const view = new View();
    this.controller = new Controller(model, view);
  }

  startListen() {
    $on(this.controller.view.categories, 'click', this.controller.selectCategory.bind(this.controller));
    $on(this.controller.view.settings, 'submit', preventDefault);
    $on(this.controller.view.toggle, 'click', this.controller.toggleTopHeadlines.bind(this.controller));
    $on(this.controller.view.numberInput, 'blur', this.controller.onNumberInputChange.bind(this.controller));
    $on(this.controller.view.numberInput, 'keypress', this.controller.onNumberInputChange.bind(this.controller));
    $on(this.controller.view.searchButton, 'click', this.controller.toggleSearchButton.bind(this.controller));
    $on(this.controller.view.menuIcon, 'click', this.controller.toggleMenu.bind(this.controller));
    $on(this.controller.view.searchInput, 'input', this.controller.onSearchInputChange.bind(this.controller));
    $on(this.controller.view.searchSubmit, 'click', this.controller.onSearchInputSubmit.bind(this.controller));
    $on(this.controller.view.autosuggest, 'click', this.controller.selectPublisher.bind(this.controller));
  }

  init() {
    this.controller.requestData({});
    this.controller.requestSources();
    this.startListen();
  }
}

const app = new App();
app.init();
