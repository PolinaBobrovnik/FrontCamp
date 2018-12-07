// model.js

import API_KEY from '../constants/constants';
import newsApiFactory from '../managers/requester/newsApiFactory';

export default class Model {
  constructor() {
    this.getResult = newsApiFactory('GET');
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
    try {
      const result = await this.getResult.execute(url);
      this.setNumberOfRecords(result.articles.length);
      if (result.articles.length) {
        if (callback) {
          callback(q, result);
        }
      } else {
        this.showErrorPopup('No results!');
      }
    } catch (e) {
      this.showErrorPopup('Connection Error!');
    }
  }

  async requestSources() {
    try {
      const data = await this.getResult.execute(`https://newsapi.org/v2/sources?apiKey=${API_KEY}`);
      data.sources.forEach((source) => {
        this.setSourcesName(source);
      });
    } catch (e) {
      this.showErrorPopup('Connection Error!');
    }
  }

  showErrorPopup(msg) {
    import('../managers/error_handler/errorHandler.js')
      .then((errorHandlerModule) => {
        const ErrorPopup = errorHandlerModule.default;
        this.errorPopup = new ErrorPopup();
        this.errorPopup.showErrorPopup(msg);
      });
  }
}
