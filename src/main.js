// main.js

import View from './view';
import Model from './model';
import Controller from './controller';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class App {
  constructor() {
    const model = new Model();
    const view = new View();
    this.controller = new Controller(model, view);
  }

  init() {
    this.controller.requestData({});
    this.controller.requestSources();
  }
}

const app = new App();
app.init();
