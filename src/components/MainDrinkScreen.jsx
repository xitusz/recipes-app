import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipesContext';

function MainFoodScreen() {
  const { filtedDrinks, arrayDrinks } = useContext(RecipeContext);
  const TWELVE = 12;

  const history = useHistory();

  useEffect(() => {
    const ONE = 1;
    if (arrayDrinks !== null && arrayDrinks.length === ONE) {
      return history.push(`/drinks/${arrayDrinks[0].idDrink}`);
    }
  }, [arrayDrinks, history]);

  useEffect(() => {
    const ONE = 1;
    if (filtedDrinks !== null && filtedDrinks.length === ONE) {
      return history.push(`/drinks/${filtedDrinks[0].idDrink}`);
    }
  }, [filtedDrinks, history]);

  return (
    <main className="flex flex-wrap justify-evenly">
      {filtedDrinks && filtedDrinks.slice(0, TWELVE).map((drink, id) => (
        <div
          className="bg-white flex justify-center my-4 max-w-2/4 shadow-lg rounded-md"
          data-testid={ `${id}-recipe-card` }
          key={ drink.idDrink }
        >
          <Link to={ `/drinks/${drink.idDrink}` }>
            <img
              src={ `${drink.strDrinkThumb}/preview` }
              alt={ drink.strDrink }
              data-testid={ `${id}-card-img` }
              width="150"
              height="150"
            />
            <p
              className="flex justify-center m-1"
              data-testid={ `${id}-card-name` }
            >
              {drink.strDrink}
            </p>
          </Link>
          <br />
        </div>
      ))}
    </main>
  );
}

export default MainFoodScreen;
