import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import FacebookBtn from '../../../btn-facebook/FacebookBtn.jsx';
import VkBtn from '../../../btn-vk/VkBtn.jsx';
import AvatarUpload from '../../../avatar-upload/AvatarUpload.jsx';

/* Semantic UI */
import { Input } from 'semantic-ui-react'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: "",
      emailValue: "",
      passwordValue: "",
      passwordRvalue: ""
    }
  }
  handlerChange(event) {
    event.preventDefault();
    this.setState({
      nameValue: this.refs.username.value,
      emailValue: this.refs.email.value.trim(),
      passwordValue: this.refs.password.value.trim(),
      passwordRvalue: this.refs.passwordR.value.trim(),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let usernameValue = capitalizeFirstLetter(this.refs.username.value.trim());
    let emailValue = this.refs.email.value;
    let passwordValue = this.refs.password.value.trim();
    let passwordRvalue = this.refs.passwordR.value.trim();
    let userInfo = { 
      email : emailValue,
      password : passwordValue,
      profile : {
        username : usernameValue,
        userPhoto: Session.get("uploadedAvatar")
      }
    };

    Accounts.createUser(userInfo, (err) => {
      if (err) {
        console.log(err)
      } else {
        Meteor.call("userNew", userInfo, (err, res) => {
          if(err) {
            console.log(err)
          } else {
            FlowRouter.go('Home');  
          };
        });
      };
    }); 
  }
  render() {
    return (
      <div className="signup">
        <div className="card card_login">
          <div className="login-form">
            <form onSubmit={this.handleSubmit.bind(this)} method="POST">
              <div className="login-item"> 
                <div className="headline-login">Регистрация</div>
              </div>
              <div className="login-item">
                <FacebookBtn />
                <VkBtn />
              </div>
              <div className="login-item-separator">
                <div className="login-item-separator__text">или</div>
              </div>
              <div className="login-item">
                <AvatarUpload size="medium"/>
              </div>
              <div className="login-item">
                <div className="input-wrapper">
                  <div className="input-labels">
                    <div className="input-labels__item">
                      <label htmlFor="username" className="input-add-group__name">Представьтесь</label>
                    </div>
                  </div>
                  <div className="input-default">
                    <Input type="text" name="username" id="username" placeholder='' />
                  </div>
                  <div className="input-message">
                    <div className="input-message__item">
                      
                    </div>
                  </div>
                </div>
              </div>

              <div className="login-item">
                <div className="input-wrapper">
                  <div className="input-labels">
                    <div className="input-labels__item">
                      <label fluid htmlFor="email" className="input-add-group__name">Email</label>
                    </div>
                  </div>
                  <div className="input-default">
                    <Input fluid type="email" id="email" name="email" placeholder='example@mail.com' />
                  </div>
                  <div className="input-message">
                    <div className="input-message__item">
                    </div>
                  </div>
                </div>
              </div>

              <div className="login-item">
                <div className="input-wrapper">
                  <div className="input-labels">
                    <div className="input-labels__item">
                      <label htmlFor="password" className="input-add-group__name">Пароль</label>
                    </div>
                  </div>
                  <div className="input-default">
                    <Input fluid type="password" id="password" name="password" placeholder='' />
                  </div>
                  <div className="input-message">
                    <div className="input-message__item">
                    </div>
                  </div>
                </div>
              </div>
              <div className="login-item">
                <div className="input-wrapper">
                  <div className="input-labels">
                    <div className="input-labels__item">
                      <label htmlFor="password-r" className="input-add-group__name">Повторите пароль</label>
                    </div>
                  </div>
                  <div className="input-default">
                    <Input fluid type="password" id="password-r" name="password-r" placeholder='' />
                  </div>
                  <div className="input-message">
                    <div className="input-message__item">
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="login-item">
                <button type="submit" ref="submit" className="simple-btn simple-btn_blue">Зарегистрироваться</button>
              </div>
              <div className="login-item login-item-forgot"> 
                <p>Регистрируясь вы принимаете условия</p><a className="link-default" href="#">Пользовательского соглашения</a>
              </div>
            </form>
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
