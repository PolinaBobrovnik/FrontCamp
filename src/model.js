// model.js

export default class Model {
  constructor() {
      this.sourcesNameToId = new Map();
      this.sourcesNames = [];
      this.category = '';
      this.sources = '';
      this.pageSize = '';
      this.q = '';
  };
  setCategory(category) {
    this.category = category;
  };
  setTop(top) {
    this.top = top;
  };
    setNumberOfRecords(numberOfRecords) {
        this.numberOfRecords = numberOfRecords;
    };
    setSourcesName(source) {
      this.sourcesNameToId.set(source.name, source.id);
      this.sourcesNames.push(source.name);
    };
    setQ(q) {
        this.q = q;
    };
    setSourceId(source) {
        const sourceId = this.sourcesNameToId.get(source);
        this.sourceId = sourceId;
    };    
  getModel() {
      return {
          category: this.category,
          top: this.top,
          numberOfRecords: this.numberOfRecords,
          sources: this.sources,
          pageSize: this.pageSize,
          q: this.q,
      }
  };
}