import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import Main from '../components/Main';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Main name="React" />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  );
});
