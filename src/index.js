// main.js

import '@babel/polyfill';
import './css/styles.css';
import './fonts/ionicons.css';
import './images/favicon.ico';
import 'whatwg-fetch';
import 'es6-promise';

import View from './js/view';
import Model from './js/model';
import Controller from './js/controller';
import { $on } from './js/util';

class App {
  constructor() {
    const model = new Model();
    const view = new View();
    this.controller = new Controller(model, view);
  }
}

$on(window, 'load', new App());
