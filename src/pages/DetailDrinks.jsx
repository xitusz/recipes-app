import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { detailDrinksApi } from '../service/ApiDrinks';
import { nameApi } from '../service/ApiFoods';
import StartContinueButton from '../components/StartContinueButton';
import {
  addIdToLocalSto,
  deleteIdFromLocalSto,
  getLocalStorageInfo } from '../service/localStorage';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DetailDrinks({ match }) {
  const [objDetail, setObjDetail] = useState([]);
  const [recomFood, setRecomFood] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const whiteHeart = (
    <img
      data-testid="favorite-btn"
      src={ whiteHeartIcon }
      alt="whiteHeart"
    />
  );
  const blackHeart = (
    <img
      data-testid="favorite-btn"
      src={ blackHeartIcon }
      alt="blackHeartIcon"
    />
  );

  const buttonShareIcon = (
    <img
      data-testid="share-btn"
      src={ shareIcon }
      alt="share"
    />
  );

  const copyToClipboard = async () => {
    await copy(window.location.href);
    return setIsLinkCopied(true);
  };

  const { params: { id } } = match;
  const idReceita = id;

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      return setIsFavorite(getLocalStorageInfo('favoriteRecipes')
        .some((drink) => drink.id === idReceita));
    }
  }, [idReceita]);

  useEffect(() => {
    const apiFoodsRequest = async () => {
      const foods = await nameApi('');
      const SIX = 6;
      if (foods !== null) {
        return setRecomFood(foods.slice(0, SIX));
      }
    };
    apiFoodsRequest();
  }, []);

  useEffect(() => {
    const apiRequest = async () => {
      const detail = await detailDrinksApi(idReceita);
      setObjDetail(detail);
    };
    apiRequest();
  }, [idReceita]);

  if (objDetail.length === 0) return null;

  const QUINZE = 15;
  const arrayIngred = [];
  for (let i = 1; i <= QUINZE; i += 1) {
    if (objDetail[0][`strIngredient${i}`]) {
      arrayIngred.push(
        `- ${objDetail[0][`strIngredient${i}`]} - ${objDetail[0][`strMeasure${i}`]}`,
      );
    }
  }

  const { idDrink, strCategory, strAlcoholic, strDrink,
    strDrinkThumb } = objDetail[0];

  function handleFavoriteItem() {
    const favoriteRecipe = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    if (isFavorite === false) {
      addIdToLocalSto(favoriteRecipe, 'favoriteRecipes');
      setIsFavorite(true);
    } else {
      deleteIdFromLocalSto(idReceita, 'favoriteRecipes');
      setIsFavorite(false);
    }
  }

  return (
    <div>
      <img
        src={ `${objDetail[0].strDrinkThumb}` }
        alt="drink"
        data-testid="recipe-photo"
        className="mb-2"
      />
      <div className="ml-2 mr-2">
        <div className="w-full flex flex-row">
          <h2
            data-testid="recipe-title"
          >
            { objDetail[0].strDrink }
          </h2>
          <div className="w-full flex flex-row justify-end ml-4">
            <button
              type="button"
              onClick={ () => copyToClipboard() }
              className="mr-4"
            >
              { buttonShareIcon }
            </button>
            <button
              type="button"
              onClick={ () => handleFavoriteItem() }
            >
              { isFavorite ? blackHeart : whiteHeart }
            </button>
            { isLinkCopied && <span>Link copied!</span> }
          </div>
        </div>
        <p data-testid="recipe-category">{ objDetail[0].strAlcoholic }</p>
        <h4 data-testid="recipe-category">{ objDetail[0].strCategory }</h4>
        <br />
      </div>
      <h3 className="font-medium ml-2">Ingredients</h3>
      <ul className="bg-gray-300 mt-2 mb-2">
        {arrayIngred.map((ingredient, i) => (
          <li
            className="ml-4"
            key={ i }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>
        ))}
      </ul>
      <br />
      <div className="ml-2 mr-2">
        <h3 className="font-medium">Instruction</h3>
        <p
          data-testid="instructions"
        >
          { objDetail[0].strInstructions }
        </p>
        <br />
        <h3 className="mb-1 font-medium">Recommended</h3>
        {recomFood && (
          <div className="h-full w-24 flex flex-wrap-nowrap overflow-x-scroll">
            { recomFood.map((food, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key={ food.idMeal }
                className="mr-2"
              >
                <Link to={ `/foods/${food.idMeal}` }>
                  <img
                    src={ `${food.strMealThumb}` }
                    alt={ food.strMeal }
                    className="rounded-full h-12"
                  />
                  <h4 data-testid={ `${index}-recomendation-title` }>
                    { food.strMeal }
                  </h4>
                </Link>
                <br />
              </div>
            ))}
          </div>
        )}
      </div>
      <br />
      <StartContinueButton />
    </div>
  );
}

DetailDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

DetailDrinks.defaultProps = {
  match: {},
};

export default DetailDrinks;
