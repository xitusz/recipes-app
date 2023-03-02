import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      idLabel,
      textLabel,
      dataTestId,
      nameInput,
      placeholderInput,
      handleInputChange,
      typeInput,
      valueInput,
      classInput,
      onClick,
    } = this.props;
    return (
      <label htmlFor={ idLabel }>
        <input
          data-testid={ dataTestId }
          id={ idLabel }
          name={ nameInput }
          placeholder={ placeholderInput }
          onChange={ handleInputChange }
          type={ typeInput }
          value={ valueInput }
          className={ classInput }
          onClick={ onClick }
        />
        <span>{ textLabel }</span>
      </label>
    );
  }
}

Input.propTypes = {
  placeholderInput: PropTypes.string,
  dataTestId: PropTypes.string,
  typeInput: PropTypes.string.isRequired,
  nameInput: PropTypes.string,
  handleInputChange: PropTypes.func,
  onClick: PropTypes.func,
  valueInput: PropTypes.string,
  idLabel: PropTypes.string,
  textLabel: PropTypes.string,
  classInput: PropTypes.string,
};

Input.defaultProps = {
  placeholderInput: '',
  nameInput: '',
  valueInput: '',
  dataTestId: '',
  idLabel: '',
  textLabel: '',
  classInput: '',
  handleInputChange: () => {},
  onClick: () => {},
};

export default Input;
