// controller.js

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.bindSelectCategory(this.selectCategory.bind(this));
    view.bindToggleTopHeadlines(this.toggleTopHeadlines.bind(this));
    view.bindOnNumberInputChange(this.onNumberInputChange.bind(this));
    view.bindToggleSearchButton(this.toggleSearchButton.bind(this));
    view.bindToggleMenu(this.toggleMenu.bind(this));
    view.bindOnSearchInputChange(this.onSearchInputChange.bind(this));
    view.bindOnSearchInputSubmit(this.onSearchInputSubmit.bind(this));
    view.bindSelectPublisher(this.selectPublisher.bind(this));

    this.updateArticles = this.updateArticles.bind(this);
    this.model.requestData({}, this.updateArticles);
    this.model.requestSources();
  }

  selectCategory(event) {
    const category = event.target.dataset.name;
    this.model.setCategory(category);
    this.model.requestData({
      category: this.model.category,
      numberOfRecords: this.model.numberOfRecords,
    }, this.updateArticles);
  }

  toggleTopHeadlines() {
    this.model.setTop(!this.view.cbx.checked);
    this.model.requestData(this.model.getModel(), this.updateArticles);
  }

  onNumberInputChange(event) {
    if (!event.keyCode || (event.keyCode && event.keyCode === 13)) {
      this.model.setNumberOfRecords(event.target.value);
      this.model.requestData(this.model.getModel(), this.updateArticles);
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
        .includes(event.target.value.toLowerCase()));
    this.view.createAutosuggest(searchedSourcesNames);
  }

  onSearchInputSubmit(event) {
    if (!event.keyCode || (event.keyCode && event.keyCode === 13)) {
      this.view.onSearchInputSubmit();
      this.model.setQ(this.view.searchInput.value);
      this.model.requestData({ q: this.model.q, numberOfRecords: this.model.numberOfRecords },
        this.updateArticles);
    }
  }

  selectPublisher(event) {
    const { source } = event.target.dataset;
    if (source) {
      this.view.onSearchInputSubmit();
      this.model.setSourceId(source);
      this.model.requestData({
        publisher: this.model.sourceId,
        numberOfRecords: this.model.numberOfRecords,
      }, this.updateArticles);
    }
  }

  updateArticles(q, result) {
    this.view.showTopHeadlinesFilter(Boolean(q));
    this.view.createArticles(result.articles);
  }
}
