import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

import '../Css/Header.css';

import Input from './Input';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const [showInput, setShowInput] = useState(false);
  const history = useHistory();

  const {
    searchInput,
    setSearchInput,
    setSearchRadio,
  } = useContext(RecipesContext);

  const handleInputChange = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const handleRadioChange = ({ target: { id, checked } }) => {
    if (checked) {
      setSearchRadio(id);
    }
  };

  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  const { showSearchBtn, children, handleClick } = props;

  return (
    <>
      <div className="header-container">
        <button
          onClick={ () => history.push('/profile') }
          type="button"
        >
          <img
            data-testid="profile-top-btn"
            alt="profileIcon"
            src={ profileIcon }
          />
        </button>
        <h1
          className="text-2xl font-bold"
          data-testid="page-title"
        >
          {children}
        </h1>
        { showSearchBtn && (
          <button
            type="button"
            onClick={ handleShowInput }
          >
            <img
              data-testid="search-top-btn"
              alt="SearchIcon"
              src={ searchIcon }
            />
          </button>
        ) }
      </div>

      { showInput && (
        <div
          className="flex items-center flex-col bg-gray-100"
        >
          <div>
            <Input
              classInput="placeholder:italic placeholder:text-slate-400 w-full mt-3 px-5
              border rounded border-gray-500 border border-slate-300 rounded-md
              py-1 pl-1 pr-20 shadow-sm"
              dataTestId="search-input"
              idLabel="searchInput"
              nameInput="searchInput"
              placeholderInput="Search Recipe"
              handleInputChange={ handleInputChange }
              typeInput="text"
              valueInput={ searchInput }
            />
          </div>
          <div className="w-full flex justify-evenly">
            <Input
              dataTestId="ingredient-search-radio"
              typeInput="radio"
              idLabel="ingredient"
              nameInput="search-radio"
              textLabel="Ingredient"
              handleInputChange={ handleRadioChange }
            />
            <Input
              dataTestId="name-search-radio"
              typeInput="radio"
              idLabel="name"
              nameInput="search-radio"
              textLabel="Name"
              handleInputChange={ handleRadioChange }
            />
            <Input
              dataTestId="first-letter-search-radio"
              typeInput="radio"
              idLabel="first-letter"
              nameInput="search-radio"
              textLabel="First letter"
              handleInputChange={ handleRadioChange }
            />
          </div>
          <div>
            <button
              className="rounded-full bg-transparent hover:bg-gray-500 text-white
              font-semibold hover:text-white py-1 px-4 border
              hover:border-transparent rounded bg-gray-800 m-2"
              type="button"
              onClick={ handleClick }
              data-testid="exec-search-btn"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  showSearchBtn: PropTypes.bool,
  handleClick: PropTypes.func,
};

Header.defaultProps = {
  showSearchBtn: true,
  handleClick: () => {},
};

export default Header;
