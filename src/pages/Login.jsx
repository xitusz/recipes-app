import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Css/Login.css';
import ImgLogin from '../images/ImgLogin.svg';

import Button from '../components/Button';
import Input from '../components/Input';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      email: '',
      password: '',
    };
  }

  validateButton = () => {
    const { email, password } = this.state;
    const min = 6;

    if (this.validateEmail(email) && password.length > min) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  validateEmail = (email) => String(email)
    .toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

  handleClick = () => {
    const { email } = this.state;
    const { history } = this.props;
    history.push('/foods');
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => { this.validateButton(); });
  }

  render() {
    const { disabled, email, password } = this.state;

    return (
      <div id="login" className="login-container">
        <div className=" flex flex-col items-center">
          <img src={ ImgLogin } alt="login" width="200" />
          <Input
            classInput="border-gray-300 mt-1 block w-full px-3 py-5 bg-white border
            border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-800 focus:ring-1
            focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500
            disabled:border-slate-200 disabled:shadow-none"
            dataTestId="email-input"
            idLabel="email"
            nameInput="email"
            placeholderInput="Email"
            handleInputChange={ this.handleInputChange }
            typeInput="email"
            valueInput={ email }
          />
          <Input
            classInput="border-gray-300 mt-1 block w-full px-3 py-5 bg-white border
            border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-800 focus:ring-1
            focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500
            disabled:border-slate-200 disabled:shadow-none"
            dataTestId="password-input"
            idLabel="password"
            nameInput="password"
            placeholderInput="Password"
            handleInputChange={ this.handleInputChange }
            typeInput="password"
            valueInput={ password }
          />
          <Button
            classNameStyle="rounded-full bg-transparent hover:bg-gray-500 text-white
            font-semibold hover:text-white py-3 px-10 border border-gray-00
            hover:border-transparent rounded bg-gray-800"
            dataTestId="login-submit-btn"
            disabled={ disabled }
            handleClick={ this.handleClick }
            typeBtn="button"
          >
            Enter
          </Button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
