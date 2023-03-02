import React from 'react';
import { useHistory } from 'react-router-dom';

function StartContinueButton() {
  const history = useHistory();
  const { location: { pathname } } = history;

  return (
    <div>
      <button
        className="w-full fixed bottom-0 bg-blue-700 hover:bg-blue-700
          text-white font-bold py-2 border border-blue-700 rounded"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => { history.push(`${pathname}/in-progress`); } }
      >
        Start Recipe
      </button>
    </div>
  );
}

export default StartContinueButton;
