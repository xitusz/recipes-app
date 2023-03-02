import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import Input from '../components/Input';
import { detailDrinksApi } from '../service/ApiDrinks';
import {
  addIdToLocalSto,
  deleteIdFromLocalSto,
  getLocalStorageInfo } from '../service/localStorage';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import FinishButton from '../components/FinishButton';

function DrinksInProgress({ match }) {
  const [objDetail, setObjDetail] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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

  const { params: { id } } = match;
  const idReceita = id;

  const copyToClipboard = () => {
    copy(`http://localhost:3000/drinks/${idReceita}`);

    return setIsLinkCopied(true);
  };

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      return setIsFavorite(getLocalStorageInfo('favoriteRecipes')
        .some((drink) => drink.id === idReceita));
    }
  }, [idReceita]);

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
        ` ${objDetail[0][`strIngredient${i}`]} - ${objDetail[0][`strMeasure${i}`]}`,
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
          { objDetail[0].strInstructions }
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

DrinksInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

DrinksInProgress.defaultProps = {
  match: {},
};

export default DrinksInProgress;
