/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import useLocalStorage from '../service/useLocalStorage';
import Header from '../components/Header';
import Button from '../components/Button';

import ShareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const showSearchBtn = false;
  const [favRecipes, setFavRecipes] = useLocalStorage('favoriteRecipes');
  const [filtedRecipes, setFiltedRecipes] = useState(favRecipes);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    setFiltedRecipes(favRecipes);
  }, [favRecipes]);

  const copyToClipboard = async (string) => {
    await copy(window.location.origin + string);
    return setIsLinkCopied(true);
  };

  function handleFavoriteItem(id) {
    setFavRecipes(favRecipes.filter((recipe) => recipe.id !== id));
  }

  function filterByType(type) {
    if (type) {
      return setFiltedRecipes(favRecipes.filter((recipe) => recipe.type === type));
    }
    setFiltedRecipes(favRecipes);
  }

  return (
    <>
      <Header
        showSearchBtn={ showSearchBtn }
      >
        Favorite Recipes
      </Header>
      <div className="filterButtons">
        <Button
          classNameStyle="bg-indigo-500 text-white font-bold
            border rounded w-24 text-center m-1"
          dataTestId="filter-by-all-btn"
          handleClick={ () => filterByType() }
        >
          All
        </Button>
        <Button
          classNameStyle="bg-indigo-500 text-white font-bold
            border rounded w-24 text-center m-1"
          dataTestId="filter-by-food-btn"
          handleClick={ () => filterByType('food') }
        >
          Food
        </Button>
        <Button
          classNameStyle="bg-indigo-500 text-white font-bold
            border rounded w-24 text-center m-1"
          dataTestId="filter-by-drink-btn"
          handleClick={ () => filterByType('drink') }
        >
          Drinks
        </Button>
      </div>
      { filtedRecipes && (
        <div className="flex flex-col items-center">
          { filtedRecipes.map((recipe, index) => (
            recipe.type === 'drink'
              ? (
                <div
                  data-testid={ `${index}-${recipe.name}-horizontal-tag` }
                  className="flex flex-row justify-around my-5 w-3/4 shadow-lg rounded-md"
                  key={ index }
                >
                  <Link to={ `/drinks/${recipe.id}` }>
                    <div className="flex flex-row">
                      <img
                        data-testid={ `${index}-horizontal-image` }
                        src={ `${recipe.image}` }
                        alt={ recipe.name }
                        width="120"
                        height="120"
                      />
                      <div>
                        <p data-testid={ `${index}-horizontal-top-text` }>
                          {recipe.alcoholicOrNot}
                        </p>
                        <h4
                          data-testid={ `${index}-horizontal-name` }
                        >
                          {recipe.name}
                        </h4>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={ () => handleFavoriteItem(recipe.id) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ blackHeartIcon }
                        alt="blackHeartIcon"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={ () => copyToClipboard(`/drinks/${recipe.id}`) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ ShareIcon }
                        alt="shareIcon"
                      />
                    </button>
                    { isLinkCopied && <span className="text-xs">Link copied!</span> }
                  </div>
                  <br />
                </div>
              )
              : (
                <div
                  data-testid={ `${index}-${recipe.name}-horizontal-tag` }
                  className="flex flex-row justify-around my-5 w-3/4 shadow-lg rounded-md"
                  key={ index }
                >
                  <Link to={ `/foods/${recipe.id}` }>
                    <div className="flex flex-row">
                      <img
                        data-testid={ `${index}-horizontal-image` }
                        src={ `${recipe.image}` }
                        alt={ recipe.name }
                        width="120"
                        height="120"
                      />
                      <div>
                        <p data-testid={ `${index}-horizontal-top-text` }>
                          {`${recipe.nationality} - ${recipe.category}`}
                        </p>
                        <h4
                          data-testid={ `${index}-horizontal-name` }
                        >
                          {recipe.name}
                        </h4>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={ () => handleFavoriteItem(recipe.id) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ blackHeartIcon }
                        alt="blackHeartIcon"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={ () => copyToClipboard(`/foods/${recipe.id}`) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ ShareIcon }
                        alt="shareIcon"
                      />
                    </button>
                    { isLinkCopied && <span className="text-xs">Link copied!</span> }
                  </div>
                  <br />
                </div>
              )
          )) }
        </div>
      ) }
    </>
  );
}

export default FavoriteRecipes;
