// util.js

const $on = (target, event, handler) => target.addEventListener(event, handler);

const preventDefault = (event) => {
  event.preventDefault();
};

export { $on, preventDefault };
