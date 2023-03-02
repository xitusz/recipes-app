import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
// import useLocalStorage from '../service/useLocalStorage';
import Input from '../components/Input';
import { detailApi } from '../service/ApiFoods';
import FinishButton from '../components/FinishButton';
import {
  addIdToLocalSto,
  deleteIdFromLocalSto,
  getLocalStorageInfo } from '../service/localStorage';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodsInProgress({ match }) {
  const [objDetail, setObjDetail] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { params: { id } } = match;
  const idReceita = id;
  const [isFavorite, setIsFavorite] = useState(false);
  // const [key, setKey] = useLocalStorage('favoriteRecipes');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // console.log(key);
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

  const copyToClipboard = () => {
    copy(`http://localhost:3000/foods/${idReceita}`);
    return setIsLinkCopied(true);
  };

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      return setIsFavorite(getLocalStorageInfo('favoriteRecipes')
        .some((meal) => meal.id === idReceita));
    }
  }, [idReceita]);

  useEffect(() => {
    const apiRequest = async () => {
      const detail = await detailApi(idReceita);
      setObjDetail(detail);
    };
    apiRequest();
  }, [idReceita]);

  if (objDetail.length === 0) return null;

  const VINTE = 20;
  const arrayIngred = [];
  for (let i = 1; i <= VINTE; i += 1) {
    if (objDetail[0][`strIngredient${i}`]) {
      arrayIngred.push(
        ` ${objDetail[0][`strIngredient${i}`]} - ${objDetail[0][`strMeasure${i}`]}`,
      );
    }
  }

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
    if (isFavorite === false) {
      addIdToLocalSto(favoriteRecipe, 'favoriteRecipes');
      setIsFavorite(true);
    } else {
      deleteIdFromLocalSto(idReceita, 'favoriteRecipes');
      setIsFavorite(false);
    }
  }

  function handleButtonDisable() {
    const arrCheckBox = document.getElementsByClassName('checked');
    if (arrCheckBox.length === arrayIngred.length) {
      return setIsButtonDisabled(false);
    }
    setIsButtonDisabled(true);
  }

  function handleCheckbox({ target }) {
    const labelText = document.getElementById(target.value).nextSibling;
    labelText.classList.toggle('checked');
    handleButtonDisable();
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
      <h3 className="font-medium ml-2">Ingredients</h3>
      <section className="bg-gray-300 mt-2 mb-2">
        {arrayIngred.map((ingredient, index) => (
          <div
            className="ml-4"
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <Input
              data-testid={ `${index}-ingredient-step` }
              typeInput="checkbox"
              idLabel={ ingredient }
              textLabel={ ingredient }
              valueInput={ ingredient }
              nameInput={ ingredient }
              handleInputChange={ (event) => handleCheckbox(event) }
            />
          </div>
        ))}
      </section>
      <br />
      <div className="ml-2 mr-2">
        <h3 className="font-medium">Instruction</h3>
        <p
          className="bg-gray-200"
          data-testid="instructions"
        >
          {objDetail[0].strInstructions}
        </p>
      </div>
      <br />
      <FinishButton
        data-testid="finish-recipe-btn"
        isDisabled={ isButtonDisabled }
      />
    </div>
  );
}

FoodsInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

FoodsInProgress.defaultProps = {
  match: {},
};

export default FoodsInProgress;
