import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import GameTables from './Lobby/GameTables';
import Game from './Game/Game';
import ServerError from './ServerError';
import { fetchUserRequest, fetchUserReceived } from '../actions';
import { get, apiRequest } from '../utils/fetch';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/lobby" component={GameTables} />
        <Route exact path="/game/:id" component={Game} />
        <Redirect from="/" to="/lobby" />
      </Switch>
    </BrowserRouter>
  );
};

class Main extends React.Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return this.props.isFetching === false && (
      [
        <ServerError key="1" />,
        <Router key="2" />,
      ]
    );
  }
}

Main.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ currentUser }) => ({
  isFetching: currentUser.isFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: async () => {
    dispatch(fetchUserRequest());
    const getUser = () => get('/api/users/id');
    apiRequest(getUser, (json) => {
      dispatch(fetchUserReceived(json.user));
    });
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
