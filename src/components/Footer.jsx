import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import explorerIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          alt="drinkIcon"
          src={ drinkIcon }
        />
      </Link>
      <Link to="/explore">
        <img
          data-testid="explore-bottom-btn"
          alt="exploreIcon"
          src={ explorerIcon }
        />
      </Link>
      <Link to="/foods">
        <img
          data-testid="food-bottom-btn"
          alt="mealIcon"
          src={ mealIcon }
        />
      </Link>
    </footer>
  );
}

export default Footer;
