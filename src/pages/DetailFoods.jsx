import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import RecipeContext from '../context/RecipesContext';
import { detailApi } from '../service/ApiFoods';
import { nameDrinksApi } from '../service/ApiDrinks';
import StartContinueButton from '../components/StartContinueButton';
import {
  addIdToLocalSto,
  deleteIdFromLocalSto,
  getLocalStorageInfo } from '../service/localStorage';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function handleingredients(objDetail) {
  const VINTE = 20;
  const arrayIngred = [];
  for (let i = 1; i <= VINTE; i += 1) {
    if (objDetail[0][`strIngredient${i}`]) {
      arrayIngred.push(
        `- ${objDetail[0][`strIngredient${i}`]} - ${objDetail[0][`strMeasure${i}`]}`,
      );
    }
  }
  return arrayIngred;
}

function DetailFoods() {
  const { filtedMeals } = useContext(RecipeContext);
  const [objDetail, setObjDetail] = useState([]);
  const [recomDrink, setRecomDrink] = useState([]);
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

  const { id } = useParams();

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      return setIsFavorite(getLocalStorageInfo('favoriteRecipes')
        .some((meal) => meal.id === id));
    }
  }, [id]);

  useEffect(() => {
    const apiDrinksRequest = async () => {
      const drinks = await nameDrinksApi('');
      const SIX = 6;
      if (drinks !== null) {
        return setRecomDrink(drinks.slice(0, SIX));
      }
    };
    apiDrinksRequest();
  }, []);

  useEffect(() => {
    console.log(filtedMeals);
    if (filtedMeals.some((item) => item.idMeal === id)) {
      const detail = filtedMeals.filter((item) => item.idMeal === id);
      return setObjDetail(detail);
    }
    const apiRequest = async () => {
      const detail = await detailApi(id);
      setObjDetail(detail);
    };
    apiRequest();
  }, [id, filtedMeals]);

  if (objDetail.length === 0) return null;

  const arrayIngred = handleingredients(objDetail);

  const { idMeal, strCategory, strMeal, strArea,
    strMealThumb } = objDetail[0];

  function handleFavoriteItem() {
    const favoriteRecipe = {
      id: idMeal,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    if (!isFavorite) {
      addIdToLocalSto(favoriteRecipe, 'favoriteRecipes');
      setIsFavorite(true);
    } else {
      deleteIdFromLocalSto(id, 'favoriteRecipes');
      setIsFavorite(false);
    }
  }

  return (
    <div>
      <img
        src={ `${objDetail[0].strMealThumb}` }
        alt="meal"
        data-testid="recipe-photo"
        className="mb-2"
      />
      <div className="ml-2 mr-2">
        <div className="w-full flex flex-row">
          <h2
            data-testid="recipe-title"
          >
            { objDetail[0].strMeal }
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
        <h4 data-testid="recipe-category">{objDetail[0].strCategory}</h4>
        <br />
      </div>
      <div>
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
            className="bg-gray-200"
            data-testid="instructions"
          >
            {objDetail[0].strInstructions}
          </p>
          <br />
        </div>
        <h3 className="mb-1 font-medium ml-2">Video</h3>
        <iframe
          data-testid="video"
          title="video"
          width="360"
          height="240"
          src={ objDetail[0].strYoutube.replace('watch?v=', 'embed/') }
        />
        <br />
        <div className="ml-2 mr-2">
          <h3 className="mb-1 font-medium">Recommended</h3>
          { recomDrink && (
            <div className="h-full w-32 flex flex-wrap-nowrap overflow-x-scroll">
              { recomDrink.map((drink, index) => (
                <div
                  data-testid={ `${index}-recomendation-card` }
                  key={ drink.idDrink }
                  className="mr-2"
                >
                  <Link to={ `/drinks/${drink.idDrink}` }>
                    <div>
                      <img
                        src={ `${drink.strDrinkThumb}` }
                        alt={ drink.strDrink }
                        className="rounded-full h-12"
                      />
                      <p>{drink.strAlcoholic}</p>
                      <h4 data-testid={ `${index}-recomendation-title` }>
                        {drink.strDrink}
                      </h4>
                    </div>
                  </Link>
                  <br />
                </div>
              )) }
            </div>
          ) }
        </div>
      </div>
      <br />
      <StartContinueButton />
    </div>
  );
}

DetailFoods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

DetailFoods.defaultProps = {
  match: {},
};

export default DetailFoods;
