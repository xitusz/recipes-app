import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { filterApiIngredDrink, ingredientDrinksApi } from '../service/ApiDrinks';

function ExploreDksIngred() {
  const { setArrayDrinks } = useContext(RecipeContext);
  const [ingredArr, setIngredArr] = useState();
  const showSearchBtn = false;
  const history = useHistory();

  const verifyLength = (param) => {
    if (param === null || !param) {
      return global.alert('Sorry, we haven\'t found any recipes for these filter.');
    }
  };

  useEffect(() => {
    async function filterIngredientRequest() {
      const TWELVE = 12;
      const ingredients = await filterApiIngredDrink();
      verifyLength(ingredients);
      setIngredArr(ingredients.slice(0, TWELVE));
    }
    filterIngredientRequest();
  }, []);

  async function apiIngredientRequest(ingredient) {
    const drinks = await ingredientDrinksApi(ingredient);
    console.log(drinks);
    verifyLength(drinks);
    setArrayDrinks(drinks);
  }

  function handleClick(ingredient) {
    apiIngredientRequest(ingredient);
    return history.push('/drinks');
  }
  console.log(ingredArr);
  return (
    <>
      <Header
        showSearchBtn={ showSearchBtn }
      >
        Explore Ingredients
      </Header>
      <main className="flex flex-wrap justify-evenly">
        {ingredArr && ingredArr.map((item, id) => (
          <button
            className="bg-white flex  flex-col justify-center
              my-4 max-w-2/4 shadow-lg rounded-md"
            data-testid={ `${id}-ingredient-card` }
            key={ id }
            type="button"
            onClick={ () => handleClick(item.strIngredient1) }
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
              alt={ item.strIngredient1 }
              data-testid={ `${id}-card-img` }
              width="150"
              height="150"
            />
            <p
              className="flex justify-center m-1"
              data-testid={ `${id}-card-name` }
            >
              {item.strIngredient1}
            </p>
          </button>
        ))}
      </main>
      <Footer />
    </>
  );
}

export default ExploreDksIngred;
