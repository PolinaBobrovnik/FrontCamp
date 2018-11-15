// controller.js

import { fetchJSON } from './util';
import API_KEY from './constants';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  selectCategory(event) {
    const category = event.target.dataset.name;
    this.model.setCategory(category);
    this.requestData({
      category: this.model.category,
      numberOfRecords: this.model.numberOfRecords,
    });
  }

  toggleTopHeadlines() {
    this.model.setTop(!this.view.cbx.checked);
    this.requestData(this.model.getModel());
  }

  onNumberInputChange(event) {
    if (!event.keyCode || (event.keyCode && event.keyCode === 13)) {
      this.model.setNumberOfRecords(event.target.value);
      this.requestData(this.model.getModel());
    }
  }

  toggleSearchButton() {
    this.view.toggleSearchButton();
  }

  toggleMenu() {
    this.view.toggleMenu();
  }

  onSearchInputChange(event) {
    const searchedSourcesNames = this.model.sourcesNames
      .filter(sourceName => sourceName.toLowerCase()
        .indexOf(event.target.value.toLowerCase()) === 0);
    this.view.createAutosuggest(searchedSourcesNames);
  }

  onSearchInputSubmit(event) {
    if (!event.keyCode || (event.keyCode && event.keyCode === 13)) {
      this.view.onSearchInputSubmit();
      this.model.setQ(this.view.searchInput.value);
      this.requestData({ q: this.model.q, numberOfRecords: this.model.numberOfRecords });
    }
  }

  selectPublisher(event) {
    const { source } = event.target.dataset;
    if (source) {
      this.view.onSearchInputSubmit();
      this.model.setSourceId(source);
      this.requestData({
        publisher: this.model.sourceId,
        numberOfRecords: this.model.numberOfRecords,
      });
    }
  }

  requestData({
    top = true, category, country = 'us', numberOfRecords, publisher, q,
  }) {
    this.view.showTopHeadlinesFilter(Boolean(q));
    const search = top ? 'top-headlines' : 'everything';
    const queryMap = {
      apiKey: API_KEY,
      category: category && !publisher ? category : '',
      country: top && !publisher ? country : '',
      sources: publisher || '',
      pageSize: numberOfRecords || '',
      q: q || '',
    };
    const query = Object.keys(queryMap)
      .filter(key => queryMap[key])
      .map(key => `${key}=${queryMap[key]}`)
      .join('&');

    const url = `https://newsapi.org/v2/${search}?${query}`;
    const req = new Request(url);
    fetchJSON(req).then((result) => {
      this.view.createArticles(result.articles);
      this.model.setNumberOfRecords(result.articles.length);
    });
  }

  requestSources() {
    fetchJSON(`https://newsapi.org/v2/sources?apiKey=${API_KEY}`)
      .then(data => data.sources.forEach((source) => {
        this.model.setSourcesName(source);
      }));
  }
}
