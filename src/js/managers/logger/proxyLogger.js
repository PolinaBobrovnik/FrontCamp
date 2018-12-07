const handler = {
  get: (target, prop) => (...args) => {
    // eslint-disable-next-line no-console
    console.log(`Call "${prop}" with ${JSON.stringify(args)}`);
    return target[prop](...args);
  },
};

export default function proxyLogger(target) {
  return new Proxy(target, handler);
}
