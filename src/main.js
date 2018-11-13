// main.js

import View from './view';
import Model from './model';
import Controller from './controller';

class App {
  constructor() {
    const model = new Model();
    const view = new View();
    this.controller = new Controller(model, view);
  };
  startListen() {
    $on(view.categories, 'click', this.controller.selectCategory);
    $on(view.settings, 'submit', this.controller.preventDefault);
    $on(view.toggle, 'click', this.controller.toggleTopHeadlines);
    $on(view.numberInput, 'blur', this.controller.onNumberInputChange);
    $on(view.numberInput, 'keypress', this.controller.onNumberInputChange);
    $on(view.searchButton, 'click', this.controller.toggleSearchButton);
    $on(view.menuIcon, 'click', this.controller.toggleMenu);
    $on(view.searchInput, 'input', this.controller.onSearchInputChange);
    $on(view.searchSubmit, 'click', this.controller.onSearchInputSubmit);
    $on(view.autosuggest, 'click', this.controller.selectPublisher);
  };
  init() {
    this.controller.requestData({});
    this.controller.requestSources();
    app.startListen();
  };
}

const app = new App();
app.init();
