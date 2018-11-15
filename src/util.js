// util.js

const $on = (target, event, handler) => target.addEventListener(event, handler);

const preventDefault = (event) => {
  event.preventDefault();
};

const fetchJSON = url => fetch(url).then(res => res.json());

export { $on, preventDefault, fetchJSON };
