import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipesContext';
import {
  ingredientApi,
  nameApi,
  firstLetterApi,
  filterFoodButtons,
  nationApi,
} from '../service/ApiFoods';
import {
  ingredientDrinksApi,
  nameDrinksApi,
  firstLetterDrinksApi,
  filterDrinkButtons,
} from '../service/ApiDrinks';

function RecipeProvider({ children }) {
  // Login
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  // Foods
  const [arrayMeals, setArrayMeals] = useState([]);
  const [filtedMeals, setFiltedMeals] = useState([]);
  const [newListFoods, setNewListFoods] = useState([]);
  // Drinks
  const [arrayDrinks, setArrayDrinks] = useState([]);
  const [filtedDrinks, setFiltedDrinks] = useState([]);
  const [newListDrinks, setNewListDrinks] = useState([]);

  const verifyLength = (param) => {
    if (param === null || !param) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  // console.log(arrayMeals.length, arrayDrinks.length);
  // console.log(filtedMeals);

  useEffect(() => {
    async function apiMealRequest() {
      const meals = await nameApi('');
      verifyLength(meals);
      setArrayMeals(meals);
    }
    apiMealRequest();
    async function apiDrinkRequest() {
      const drinks = await nameDrinksApi('');
      verifyLength(drinks);
      setArrayDrinks(drinks);
    }
    apiDrinkRequest();
  }, []);

  useEffect(() => {
    setFiltedMeals(arrayMeals);
    setFiltedDrinks(arrayDrinks);
  }, [arrayMeals, arrayDrinks]);

  useEffect(() => {
    filterDrinkButtons()
      .then((newData) => setNewListDrinks(newData));
  }, []);

  useEffect(() => {
    filterFoodButtons()
      .then((newData) => setNewListFoods(newData));
  }, []);

  const handleClickFoods = async () => {
    if (searchRadio === 'ingredient') {
      const meals = await ingredientApi(searchInput);
      verifyLength(meals);
      setArrayMeals(meals);
    }
    if (searchRadio === 'name') {
      const meals = await nameApi(searchInput);
      verifyLength(meals);
      setArrayMeals(meals);
    }
    if (searchRadio === 'first-letter') {
      const ONE = 1;
      if (searchInput.length > ONE) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const meals = await firstLetterApi(searchInput);
      verifyLength(meals);
      setArrayMeals(meals);
    }
  };

  const handleClickDrinks = async () => {
    if (searchRadio === 'ingredient') {
      const drinks = await ingredientDrinksApi(searchInput);
      verifyLength(drinks);
      setArrayDrinks(drinks);
    }
    if (searchRadio === 'name') {
      const drinks = await nameDrinksApi(searchInput);
      verifyLength(drinks);
      setArrayDrinks(drinks);
    }
    if (searchRadio === 'first-letter') {
      const ONE = 1;
      if (searchInput.length > ONE) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const drinks = await firstLetterDrinksApi(searchInput);
      verifyLength(drinks);
      setArrayDrinks(drinks);
    }
  };

  const handleNationSelect = async (nation) => {
    let meals;
    if (!nation || nation === 'all') {
      meals = await nameApi('');
    } else {
      meals = await nationApi(nation);
    }
    verifyLength(meals);
    setArrayMeals(meals);
  };

  const contextValue = {
    searchInput,
    searchRadio,
    arrayMeals,
    arrayDrinks,
    filtedMeals,
    filtedDrinks,
    newListDrinks,
    newListFoods,
    setArrayMeals,
    setArrayDrinks,
    setFiltedMeals,
    setSearchInput,
    setSearchRadio,
    handleClickFoods,
    handleClickDrinks,
    setFiltedDrinks,
    handleNationSelect,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipeProvider;
