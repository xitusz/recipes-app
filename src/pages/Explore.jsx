import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';

function Explore() {
  const showSearchBtn = false;
  const history = useHistory();

  return (
    <>
      <div>
        <Header
          showSearchBtn={ showSearchBtn }
        >
          Explore
        </Header>
      </div>
      <main className="flex flex-col items-center mt-20">
        <Button
          classNameStyle="m-14 bg-blue-700 text-white font-bold
          text-2xl border rounded-full w-60 h-16 text-center"
          dataTestId="explore-foods"
          typeBtn="button"
          handleClick={ () => { history.push('/explore/foods'); } }
        >
          Explore Foods
        </Button>
        <Button
          classNameStyle="m-14 bg-blue-700 text-white font-bold
          text-2xl border rounded-full w-60 h-16 text-center"
          dataTestId="explore-drinks"
          typeBtn="button"
          handleClick={ () => { history.push('/explore/drinks'); } }
        >
          Explore Drinks
        </Button>
      </main>
      <Footer />
    </>
  );
}

export default Explore;
