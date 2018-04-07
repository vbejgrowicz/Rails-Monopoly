import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearError } from '../actions';

class ServerError extends React.Component {
  render() {
    return this.props.error.length > 0 && (
      <div className="outer-modal">
        <div className="error-modal">
          <h2>Oops, something went wrong</h2>
          <div className="error-close" onClick={() => this.props.clearError()}><span>x</span></div>
          <div className="error-group">
            <div>We could not process your request because of:</div>
            <div className="error-message">{this.props.error}</div>
          </div>
          <div className="error-shrug">¯\_(ツ)_/¯</div>
          <div className="error-action">Please refresh the page and try again!</div>
        </div>
      </div>
    );
  }
}

ServerError.propTypes = {
  error: PropTypes.string,
  clearError: PropTypes.func.isRequired,
};

ServerError.defaultProps = {
  error: '',
};

const mapStateToProps = ({ serverErrors }) => ({
  error: serverErrors.error,
});

const mapDispatchToProps = dispatch => ({
  clearError: () => {
    dispatch(clearError());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerError);
