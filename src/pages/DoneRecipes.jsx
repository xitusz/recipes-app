/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import Button from '../components/Button';

import ShareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const done = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  const showSearchBtn = false;
  const [filtedRecipes, setFiltedRecipes] = useState(done);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    setFiltedRecipes(done);
  }, []);

  const copyToClipboard = async (string) => {
    await copy(window.location.origin + string);
    return setIsLinkCopied(true);
  };

  function filterByType(type) {
    if (type) {
      return setFiltedRecipes(done.filter((recipe) => recipe.type === type));
    }
    setFiltedRecipes(done);
  }

  return (
    <>
      <Header
        showSearchBtn={ showSearchBtn }
      >
        Done Recipes
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
                        <p data-testid={ `${index}-horizontal-done-date` }>
                          {recipe.doneDate}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col">
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
                        <p data-testid={ `${index}-horizontal-done-date` }>
                          {recipe.doneDate}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col">
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

export default DoneRecipes;
