import { $on } from '../../utils/util';

let instance = null;

export default class ErrorPopup {
  constructor() {
    if (!instance) {
      this.popup = document.querySelector('.error-popup');
      this.errorMsg = document.querySelector('.error-message');
      this.popupCloseBtn = document.querySelector('.close');
      this.popupCloseIcon = document.querySelector('.popup-close');
      this.init();
      instance = this;
    } else {
      return instance;
    }
  }

  init() {
    $on(this.popup, 'click', this.clickHandler.bind(this));
  }

  clickHandler(event) {
    if (event.target === this.popupCloseBtn || event.target === this.popupCloseIcon) {
      this.closePopup();
    }
  }

  showErrorPopup(msg) {
    this.errorMsg.innerHTML = msg;
    this.popup.classList.remove('hidden');
  }

  closePopup() {
    this.popup.classList.add('hidden');
  }
}
