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

// document.addEventListener("turbolinks:load", () => {})
// should be able to use this for compatability between react router and rails Router
// need to look into effect of turbolinks on react router
