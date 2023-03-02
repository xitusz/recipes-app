import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipesContext';

function MainFoodScreen() {
  const { filtedMeals, arrayMeals } = useContext(RecipeContext);
  const TWELVE = 12;
  const history = useHistory();

  useEffect(() => {
    const ONE = 1;
    if (arrayMeals !== null && arrayMeals.length === ONE) {
      return history.push(`/foods/${arrayMeals[0].idMeal}`);
    }
  }, [arrayMeals, history]);

  useEffect(() => {
    const ONE = 1;
    if (filtedMeals !== null && filtedMeals.length === ONE) {
      return history.push(`/foods/${filtedMeals[0].idMeal}`);
    }
  }, [filtedMeals, history]);

  // useEffect(() => {
  //   const TWELVE = 12;
  //   if (filtedMeals !== null && filtedMeals > TWELVE) {
  //     return setFiltedMeals(filtedMeals.slice(0, TWELVE));
  //   }
  // }, [filtedMeals]);

  return (
    <main className="flex flex-wrap justify-evenly">
      {filtedMeals && filtedMeals.slice(0, TWELVE).map((meal, id) => (
        <div
          className="bg-white flex justify-center my-4 max-w-2/4 shadow-lg rounded-md"
          data-testid={ `${id}-recipe-card` }
          key={ meal.idMeal }
        >
          <Link to={ `/foods/${meal.idMeal}` }>
            <img
              src={ `${meal.strMealThumb}` }
              alt={ meal.strMeal }
              data-testid={ `${id}-card-img` }
              width="150"
              height="150"
            />
            <p
              className="flex justify-center m-1"
              data-testid={ `${id}-card-name` }
            >
              {meal.strMeal}
            </p>
          </Link>
        </div>
      ))}
    </main>
  );
}

export default MainFoodScreen;
