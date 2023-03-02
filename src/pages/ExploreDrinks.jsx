import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';
import { randomDrinksApi } from '../service/ApiDrinks';

function ExploreDrinks() {
  const [randomDrink, setRandomDrink] = useState();
  const showSearchBtn = false;
  const history = useHistory();

  const verifyLength = (param) => {
    if (param === null || !param) {
      return global.alert('Sorry, we haven\'t found any recipes for these filter.');
    }
  };

  useEffect(() => {
    async function apiRandomDrinkRequest() {
      const drink = await randomDrinksApi();
      verifyLength(drink);
      setRandomDrink(drink);
    }
    apiRandomDrinkRequest();
  }, []);

  function handleRandomButton() {
    history.push(`/drinks/${randomDrink[0].idDrink}`);
  }

  return (
    <>
      <Header
        showSearchBtn={ showSearchBtn }
      >
        Explore Drinks
      </Header>
      <main className="flex flex-col items-center mt-20">
        <Button
          classNameStyle="m-8 bg-blue-700 text-white font-bold
          text-2xl border rounded-full w-60 h-16 text-center"
          dataTestId="explore-by-ingredient"
          typeBtn="button"
          handleClick={ () => { history.push('/explore/drinks/ingredients'); } }
        >
          By Ingredient
        </Button>
        <Button
          classNameStyle="m-10 bg-blue-700 text-white font-bold
          text-2xl border rounded-full w-60 h-16 text-center"
          dataTestId="explore-surprise"
          typeBtn="button"
          handleClick={ () => handleRandomButton() }
        >
          Surprise me!
        </Button>
      </main>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
