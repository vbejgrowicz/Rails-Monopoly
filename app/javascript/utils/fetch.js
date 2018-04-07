import store from '../store';

const baseUrl = 'http://localhost:5000';
const baseOpts = {
  'Content-Type': 'application/json',
  credentials: 'same-origin',
  headers: {
    'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
  },
};

const get = relPath => fetch(`${baseUrl}${relPath}`, { ...baseOpts, method: 'GET' });

const post = (relPath, params = {}) => fetch(`${baseUrl}${relPath}`, { ...baseOpts, method: 'POST', body: JSON.stringify(params) });

const put = (relPath, params = {}) => fetch(`${baseUrl}${relPath}`, { ...baseOpts, method: 'PUT', body: JSON.stringify(params) });

const destroy = (relPath, params = {}) => fetch(`${baseUrl}${relPath}`, { ...baseOpts, method: 'DELETE', body: JSON.stringify(params) });

const apiRequest = async (fetchReq, callBack) => {
  const resp = await fetchReq();
  const json = await resp.json();
  if (resp.status === 500) {
    store.dispatch({ type: 'SERVER_ERROR', error: json.error });
  } else {
    callBack(json);
  }
};

export { get, post, put, destroy, apiRequest };
