import { fetchJSON } from '../../utils/util';
import proxyLogger from '../logger/proxyLogger';

const newsApiFactory = (method) => {
  switch (method) {
    case 'GET':
      return {
        execute: url => fetchJSON(url),
      };
    case 'POST':
      return {
        execute: (url, data) => {
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(data),
          };
          return fetchJSON(url, options);
        },
      };
    case 'PUT':
      return {
        execute: (url, data) => {
          const options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(data),
          };
          return fetchJSON(url, options);
        },
      };
    default:
      return {
        execute: () => {
          throw new Error('No method');
        },
      };
  }
};

export default proxyLogger(newsApiFactory);
