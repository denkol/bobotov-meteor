import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {isValidEmail} from "/imports/functions/validation.js";
import FacebookBtn from '../../../btn-facebook/FacebookBtn.jsx';

/* Semantic UI */
import { Form, Input, Message, Icon } from 'semantic-ui-react';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation: {
        email: false,
        password: false,
        username: false,
        message: false
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, {formData}) {
    e.preventDefault();
    const validation = {
      email: false,
      password: false,
      username: false,
      message: false
    };
    this.setState({ validation });

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).trim();
    }
    const username = capitalizeFirstLetter(formData.name);
    const email = formData.email;
    const password = formData.password.trim();
    const passwordR = formData.passwordR.trim();
    
    const message = "У вас ошибки при заполнении формы, исправьте ошибки и попробуйте снова";
    if (username.length < 3) {
      validation.message = message;
      validation.username = "Имя пользователя слишком короткое!";
      this.setState({ validation });
    }
    if (!isValidEmail(email)) {
    	validation.message = message;
      validation.email = "Введите корректный адрес!";
      this.setState({ validation });
    }
    if (!password || !passwordR) {
    	validation.message = message;
      validation.password = "Введите пароль!";
      this.setState({ validation });
    }
    if (!!password && !!passwordR && password !== passwordR) {
    	validation.message = message;
      validation.password = "Пароли не совпадают!";
      this.setState({ validation });
    } 
    if (validation.message) return;

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
        return this.setState({ validation });
      } else {
        Meteor.call("userCreate", userInfo, (err, res) => {
          if(err) {
            validation.message = err.message;
            return this.setState({ validation });
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
                	{message ? 
                  	<Message size='tiny' negative>
                     	<Message.Header>{message}</Message.Header>
                     	{username ? <p>{username}</p> : null}
                     	{email ? <p>{email}</p> : null}
                     	{password ? <p>{password}</p> : null}
                  	</Message>
    				 	: null}
                </div>
                <div className="login-item">
                  <Form.Input icon='checkmark' label='Ваше имя:' name='name' type="text" placeholder='Елена Петровна' error={username ? true : false} required/>
                </div>
                <div className="login-item">
                  <Form.Input label='E-mail:' name='email' type="email" placeholder='example@mail.com' error={email ? true : false} required/>
                </div>
                <div className="login-item">
                  <Form.Input label='Пароль' name='password' type="password" placeholder='Ваш пароль' error={password ? true : false}/>
                </div>
                <div className="login-item">
                  <Form.Input label='Повторите пароль' name='passwordR' type="password" placeholder='Пароль еще раз' error={password ? true : false}/>
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
