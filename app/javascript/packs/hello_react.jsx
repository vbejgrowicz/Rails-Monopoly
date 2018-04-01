// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from '../store';

const Hello = props => (
  <div>Hello {props.name}!</div>
);

Hello.defaultProps = {
  name: 'David',
};

Hello.propTypes = {
  name: PropTypes.string,
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    (<Provider store={store}>
      <Hello name="React" />
    </Provider>),
    document.body.appendChild(document.createElement('div')),
  );
});
