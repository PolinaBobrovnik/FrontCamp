// model.js

import { fetchJSON } from './util';
import API_KEY from './constants';

export default class Model {
  constructor() {
    this.sourcesNameToId = new Map();
    this.sourcesNames = [];
    this.category = '';
    this.sources = '';
    this.pageSize = '';
    this.q = '';
  }

  setCategory(category) {
    this.category = category;
  }

  setTop(top) {
    this.top = top;
  }

  setNumberOfRecords(numberOfRecords) {
    this.numberOfRecords = numberOfRecords;
  }

  setSourcesName(source) {
    this.sourcesNameToId.set(source.name, source.id);
    this.sourcesNames.push(source.name);
  }

  setQ(q) {
    this.q = q;
  }

  setSourceId(source) {
    const sourceId = this.sourcesNameToId.get(source);
    this.sourceId = sourceId;
  }

  getModel() {
    return {
      category: this.category,
      top: this.top,
      numberOfRecords: this.numberOfRecords,
      sources: this.sources,
      pageSize: this.pageSize,
      q: this.q,
    };
  }

  async requestData({
    top = true, category, country = 'us', numberOfRecords, publisher, q,
  }, callback) {
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
    const result = await fetchJSON(url);
    this.setNumberOfRecords(result.articles.length);
    if (callback) {
      callback(q, result);
    }
  }

  async requestSources() {
    const data = await fetchJSON(`https://newsapi.org/v2/sources?apiKey=${API_KEY}`);
    data.sources.forEach((source) => {
      this.setSourcesName(source);
    });
  }
}
