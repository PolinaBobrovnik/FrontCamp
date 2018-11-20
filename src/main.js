// main.js

import View from './view';
import Model from './model';
import Controller from './controller';
import { $on } from './util';

require('es6-promise').polyfill();
require('isomorphic-fetch');
require('babel-register');
require('babel-polyfill');

class App {
  constructor() {
    const model = new Model();
    const view = new View();
    this.controller = new Controller(model, view);
  }
}

$on(window, 'load', new App());
