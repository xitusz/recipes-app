import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { filterApiIngredFood, ingredientApi } from '../service/ApiFoods';

function ExploreFdsIngred() {
  const { setArrayMeals } = useContext(RecipeContext);
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
      const ingredients = await filterApiIngredFood();
      verifyLength(ingredients);
      setIngredArr(ingredients.slice(0, TWELVE));
    }
    filterIngredientRequest();
  }, []);

  async function apiIngredientRequest(ingredient) {
    const meals = await ingredientApi(ingredient);
    verifyLength(meals);
    setArrayMeals(meals);
  }

  function handleClick(ingredient) {
    apiIngredientRequest(ingredient);
    return history.push('/foods');
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
            className="bg-white flex flex-col my-4 max-w-2/4 shadow-lg rounded-md"
            data-testid={ `${id}-ingredient-card` }
            key={ item.idIngredient }
            type="button"
            onClick={ () => handleClick(item.strIngredient) }
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
              alt={ item.strIngredient }
              data-testid={ `${id}-card-img` }
              width="150"
              height="150"
            />
            <p
              className="flex m-1"
              data-testid={ `${id}-card-name` }
            >
              {item.strIngredient}
            </p>
          </button>
        ))}
      </main>
      <Footer />
    </>
  );
}

export default ExploreFdsIngred;
