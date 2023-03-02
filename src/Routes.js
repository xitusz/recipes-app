import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import DoneRecipes from './pages/DoneRecipes';
import ExploreDrinks from './pages/ExploreDrinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreFdsIngred from './pages/ExploreFdsIngred';
import ExploreDksIngred from './pages/ExploreDksIngred';
import ExploreFdsNation from './pages/ExploreFdsNation';
import DetailFoods from './pages/DetailFoods';
import DetailDrinks from './pages/DetailDrinks';
import FoodsInProgress from './pages/FoodsInProgress';
import DrinksInProgress from './pages/DrinksInProgress';
import NotFound from './pages/NotFound';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:id" component={ DetailFoods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id" component={ DetailDrinks } />
        <Route exact path="/foods/:id/in-progress" component={ FoodsInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/explore/foods/ingredients" component={ ExploreFdsIngred } />
        <Route exact path="/explore/drinks/ingredients" component={ ExploreDksIngred } />
        <Route exact path="/explore/foods/nationalities" component={ ExploreFdsNation } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default Routes;
