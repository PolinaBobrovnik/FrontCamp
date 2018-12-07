const handler = {
  apply(target, thisArg, argumentsList) {
    // eslint-disable-next-line no-console
    console.log(`Call "${target.name}" with ${argumentsList}`);
    return target(...argumentsList);
  },
};


export default function proxyLogger(target) {
  return new Proxy(target, handler);
}
