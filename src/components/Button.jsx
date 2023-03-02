import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      disabled,
      handleClick,
      children,
      dataTestId,
      typeBtn,
      classNameStyle,
    } = this.props;
    return (
      <button
        type={ typeBtn ? 'submit' : 'button' }
        onClick={ handleClick }
        disabled={ disabled }
        data-testid={ dataTestId }
        className={ classNameStyle }
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  typeBtn: PropTypes.string,
  classNameStyle: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  dataTestId: PropTypes.string,
};

Button.defaultProps = {
  typeBtn: '',
  classNameStyle: '',
  disabled: false,
  handleClick: () => {},
  dataTestId: '',
};

export default Button;
