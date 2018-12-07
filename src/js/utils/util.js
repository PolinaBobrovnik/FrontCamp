// util.js

const $on = (target, event, handler) => target.addEventListener(event, handler);

const preventDefault = (event) => {
  event.preventDefault();
};

async function request(url) {
  return fetch(url);
}

async function fetchJSON(url) {
  try {
    const res = await request(url);
    return res.json();
  } catch (e) {
    this.showErrorPopup('Connection Error!');
    return [];
  }
}

export { $on, preventDefault, fetchJSON };
