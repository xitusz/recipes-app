import React, { useContext } from 'react';
import RecipeContext from '../context/RecipesContext';
import Button from './Button';
import {
  nameApi,
} from '../service/ApiFoods';

function FilterButtonsFoods() {
  const FIVE = 5;
  const {
    /* arrayMeals, */
    filtedMeals,
    newListFoods,
    setFiltedMeals } = useContext(RecipeContext);

  async function filterByCategory(cat) {
    if (filtedMeals.every((item) => item.strCategory === cat)) {
      const meals = await nameApi('');
      return setFiltedMeals(meals);
    }
    const meals = await nameApi(cat);

    setFiltedMeals(meals);
    /*
    if (cat) {
      return setFiltedMeals(arrayMeals.filter((recipe) => recipe.strCategory === cat));
    }
    setFiltedMeals(arrayMeals);
    */
  }

  return (
    <div className="flex flex-wrap justify-center mt-3">
      <div
        className="bg-blue-700 text-white
          border rounded w-24 text-center m-1"
      >
        <Button
          dataTestId="All-category-filter"
          handleClick={ () => filterByCategory('') }
        >
          All
        </Button>
      </div>
      {newListFoods.slice(0, FIVE).map((categoryName) => (
        <div
          className="bg-blue-700 text-white
            border rounded w-24 text-center m-1"
          key={ categoryName.strCategory }
        >
          <Button
            dataTestId={ `${categoryName.strCategory}-category-filter` }
            handleClick={ () => filterByCategory(categoryName.strCategory) }
          >
            {categoryName.strCategory}
          </Button>
        </div>
      ))}
    </div>
  );
}

export default FilterButtonsFoods;
