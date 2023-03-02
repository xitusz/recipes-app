import React from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../service/useLocalStorage';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';

function Profile() {
  const showSearchBtn = false;
  const [user] = useLocalStorage('user');
  const history = useHistory();
  const email = Object.values(user);

  const logOut = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header
        showSearchBtn={ showSearchBtn }
      >
        Profile
      </Header>
      {/* <button data-testid="profile-done-btn" type="button">Profile</button>
      <button data-testid="profile-favorite-btn" type="button">Profile</button>
      <button data-testid="profile-logout-btn" type="button">Profile</button> */}
      <Footer />
      <div className="temporario">
        <p data-testid="profile-email">{email}</p>
        <Button
          dataTestId="profile-done-btn"
          handleClick={ () => { history.push('/done-recipes'); } }
          type="Button"
        >
          Done Recipes
        </Button>
        <Button
          dataTestId="profile-favorite-btn"
          handleClick={ () => { history.push('/favorite-recipes'); } }
          type="button"
        >
          Favorite Recipes
        </Button>
        <Button
          dataTestId="profile-logout-btn"
          handleClick={ logOut }
          type="button"
        >
          Logout
        </Button>
      </div>
      <div className="footerExplorer">
        <Footer />
      </div>
    </>
  );
}

export default Profile;
