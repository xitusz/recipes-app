import React, { useContext, useState, useEffect } from 'react';
import RecipeContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainFoodScreen from '../components/MainFoodScreen';
import { filterApiNation } from '../service/ApiFoods';

function ExploreFdsNation() {
  const { handleNationSelect } = useContext(RecipeContext);
  const [nationsArr, setNationsArr] = useState();
  const [valueSelect, setValueSelect] = useState();
  const showSearchBtn = true;

  useEffect(() => {
    async function filterNationRequest() {
      const nations = await filterApiNation();
      setNationsArr(nations);
    }
    filterNationRequest();
  }, []);

  useEffect(() => {
    handleNationSelect(valueSelect);
  }, [valueSelect, handleNationSelect]);

  return (
    <>
      <Header
        showSearchBtn={ showSearchBtn }
      >
        Explore Nationalities
      </Header>
      <main className="flex flex-wrap justify-evenly">
        <select
          data-testid="explore-by-nationality-dropdown"
          className=" w-5/6 mt-5 px-5 border rounded
          border-gray-500 border-slate-300 rounded-md
          py-1 pl-1 pr-20 bg-white"
          onChange={ (e) => setValueSelect(e.target.value) }
        >
          <option data-testid="All-option" value="all">All</option>
          {nationsArr && nationsArr.map((item, id) => (
            <option
              key={ id }
              data-testid={ `${item.strArea}-option` }
              value={ item.strArea }
            >
              { item.strArea }
            </option>
          ))}
        </select>
        <MainFoodScreen />
      </main>
      <Footer />
    </>
  );
}

export default ExploreFdsNation;
