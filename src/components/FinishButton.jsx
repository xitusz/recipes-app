import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function FinishButton(props) {
  const history = useHistory();
  const { isDisabled } = props;

  return (
    <button
      className={
        isDisabled
          ? `w-full bottom-0 bg-red-700 hover:bg-red-700
      text-white font-bold py-2 border border-red-700 rounded`
          : `w-full bottom-0 bg-blue-700 hover:bg-blue-700
      text-white font-bold py-2 border border-blue-700 rounded`
      }
      data-testid="finish-recipe-btn"
      type="button"
      onClick={ () => { history.push('/done-recipes'); } }
      disabled={ isDisabled }
    >
      Finish Recipe
    </button>
  );
}

FinishButton.propTypes = {
  isDisabled: PropTypes.bool,
};

FinishButton.defaultProps = {
  isDisabled: false,
};

export default FinishButton;
