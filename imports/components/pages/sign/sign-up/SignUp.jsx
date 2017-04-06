import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {isValidEmail, isValidPassword} from "/imports/functions/validation.js";
import FacebookBtn from '../../../btn-facebook/FacebookBtn.jsx';

/* Semantic UI */
import { Form, Input, Message } from 'semantic-ui-react';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation: {
        email: '',
        password: '',
        username: '',
        message: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  Check(validation) {
    this.setState({validation: Object.assign(this.state.validation, validation)});
  } 
  
  validationError() {
    const { username, email, password, message } = this.state.validation;
    if (username) {
      return username;
    } else if (email) {
      return email;
    } else if (password) {
      return password;
    } else if (message) {
      return message;
    };
  } 
  
  handleSubmit(e, {formData}) {
    e.preventDefault();
    const validation = {
      email: '',
      password: '',
      username: '',
      message: ''
    };
    this.setState({ validation });

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).trim();
    }
    const username = capitalizeFirstLetter(formData.name);
    const email = formData.email;
    const password = formData.password.trim();
    const passwordR = formData.passwordR.trim();
    
    if (username.length < 3) {
      validation.username = "Имя пользователя слишком короткое!";
      return this.Check(validation);
    }
    if (!isValidEmail(email)) {
      validation.email = "Введите корректный адрес!";
      return this.Check(validation);
    }
    if (!isValidPassword(password, 6)) {
      validation.password = "Введите более надёжный пароль!";
      return this.Check(validation);
    }
    if (password !== passwordR) {
      validation.password = "Пароли не совпадают!";
      return this.Check(validation);
    } 

    const userInfo = { 
      email : email,
      password : password,
      profile : {
        userName : username
      }
    };

    Accounts.createUser(userInfo, (err) => {
    	const { validation } = this.state;
      if (err) {
        validation.message = err.message;
        return this.Check(validation);
      } else {
        Meteor.call("userCreate", userInfo, (err, res) => {
          if(err) {
            validation.message = err.message;
            return this.Check(validation);
          } else {
            FlowRouter.go('Home');  
          };
        });
      };
    });

  }

  render() {
    const { username, email, password, message } = this.state.validation;
    return (
      <div className="signup">
        <div className="card card_login">
          <div className="login-form">
              <div className="login-item"> 
                <div className="headline-login">Регистрация</div>
              </div>
              <div className="login-item">
                <FacebookBtn />
              </div>
              <div className="login-item-separator">
                <div className="login-item-separator__text">или</div>
              </div>
              <Form size={'tiny'} onSubmit={this.handleSubmit}>
                <div className="login-item">
                	{this.validationError() ? 
                  	<Message size='tiny' negative>
                     	<Message.Header>{this.validationError()}</Message.Header>
                  	</Message>
    				 	: null}
                </div>
                <div className="login-item">
                  <Form.Input label='Ваше имя:' name='name' type="text" placeholder='Елена Петровна' error={username} required/>
                </div>
                <div className="login-item">
                  <Form.Input label='E-mail:' name='email' type="email" placeholder='example@mail.com' error={email} required/>
                </div>
                <div className="login-item">
                  <Form.Input label='Пароль' name='password' type="password" placeholder='Ваш пароль' error={password} required/>
                </div>
                <div className="login-item">
                  <Form.Input label='Повторите пароль' name='passwordR' type="password" placeholder='Пароль еще раз' required/>
                </div>
                <div className="login-item">
                  <button type="submit" className="simple-btn simple-btn_blue">Зарегистрироваться</button>
                </div>
              </Form>

              <div className="login-item login-item-forgot"> 
                <p>Регистрируясь вы принимаете условия</p><a className="link-default" href="#">Пользовательского соглашения</a>
              </div>
          </div>
        </div>
        <div className="login-item-forgot login-item-forgot_center">
          Есть аккаунт? <a className="link-default" href="/signin">Войти</a>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  // layout: React.PropTypes.string,
};
