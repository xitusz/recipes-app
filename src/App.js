import React from 'react';
import './App.css';

import Routes from './Routes';
import RecipeProvider from './context/RecipesProvider';

function App() {
  return (
    <RecipeProvider>
      <Routes />
    </RecipeProvider>
  );
}

export default App;
