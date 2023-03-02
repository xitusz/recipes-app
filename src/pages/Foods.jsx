import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipesContext';
import MainFoodScreen from '../components/MainFoodScreen';
import FilterButtonsFoods from '../components/FilterButtonsFoods';

function Foods() {
  const {
    handleClickFoods,
  } = useContext(RecipeContext);

  const showSearchBtn = true;

  return (
    <>
      <Header
        showSearchBtn={ showSearchBtn }
        handleClick={ handleClickFoods }
      >
        Foods
      </Header>
      <FilterButtonsFoods />
      <MainFoodScreen />
      <Footer />
    </>
  );
}

export default Foods;
