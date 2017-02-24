import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import FacebookBtn from '../../../btn-facebook/FacebookBtn.jsx';

/* Semantic UI */
import { Form, Input } from 'semantic-ui-react';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }
  handleSubmit(e, { formData }) {
    e.preventDefault();
    this.setState({ formData });

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let username = capitalizeFirstLetter(formData.name);
    let email = formData.email;
    let password = formData.password;
    let passwordR = formData.passwordR; 

    let userInfo = { 
      email : email,
      password : password,
      profile : {
        userName : username
      }
    };

    if(password === passwordR) {
      Accounts.createUser(userInfo, (err) => {
        if (err) {
          console.log(err)
        } else {
          Meteor.call("userCreate", userInfo, (err, res) => {
            if(err) {
              console.log(err)
            } else {
              FlowRouter.go('Home');  
            };
          });
        };
      });
    }
  }
  validate(object) {
    let validCounter = 0;
    function emailValidate(value) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(value)) {
        validCounter++;
      }
    }
  }
  render() {
    const { formData, value } = this.state;
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
              <Form size={'tiny'} onSubmit={this.handleSubmit} >
                <div className="login-item">
                  <Form.Input label='Ваше имя:' name='name' type="text" placeholder='Елена Петровна' required/>
                </div>
                <div className="login-item">
                  <Form.Input label='E-mail:' name='email' type="email" placeholder='example@mail.com' required/>
                </div>
                <div className="login-item">
                  <Form.Input label='Пароль' name='password' type="password" placeholder='Ваш пароль' required/>
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
