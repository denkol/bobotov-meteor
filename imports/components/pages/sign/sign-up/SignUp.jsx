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
      username: {
        value: "",
        error: false
      },
      email: {
        value: "",
        error: false
      },
      password: {
        value: "",
        error: false,
        message: "Длина пароля должна быть не менее 6 символов"
      },
      passwordR: {
        value: "",
        error: false,
        message: ""
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlerChangeName = this.handlerChangeName.bind(this);
    this.handlerChangeEmail = this.handlerChangeEmail.bind(this);
    this.handlerChangePassword = this.handlerChangePassword.bind(this);
    this.handlerChangePasswordR = this.handlerChangePasswordR.bind(this);
  }
  validateText(value) {
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(value);
    return true;
  }
  validateEmail(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }
  validatePassword(value) {
    let password = this.state.password.value;
    let passwordR = this.state.passwordR.value;
    if(passwordR === password) {
      return true;
    }
  }
  // validatePasswordR(value) {
  //   let password = this.state.password.value;
  //   let passwordR = this.state.passwordR.value;
  //   if(password === value) {
  //     return true;
  //   }
  // }
  handlerChangeName(event, data) {
    event.preventDefault();
    if(this.validateText(data.value) && data.value != "") {
      this.setState({
        username: {
          value: data.value,
          error: false
        }
      });
    } else {
      this.setState({
        username: {
          value: data.value,
          error: false
        }
      });
    }
  }
  handlerChangeEmail(event, data) {
    event.preventDefault();
    if(this.validateEmail(data.value) && data.value) {
      this.setState({
        email: {
          value: data.value,
          error: false
        }
      });
    } else {
      this.setState({
        email: {
          value: data.value,
          error: false
        }
      });
    }
  }
  handlerChangePassword(event, data) {
    event.preventDefault();
    if(this.validatePassword(data.value) && data.value) {
      this.setState({
        password: {
          value: data.value,
          error: false
        }
      });
    } else {
      this.setState({
        password: {
          value: data.value,
          error: false
        }
      });
    }
  }
  handlerChangePasswordR(event, data) {
    event.preventDefault();
    if(this.validatePassword(data.value) && data.value) {
      this.setState({
        passwordR: {
          value: data.value,
          error: false
        }
      });
    } else {
      this.setState({
        passwordR: {
          value: data.value,
          error: false
        }
      });
    }
  }

  // handlerEmail(event, data) {
  //   event.preventDefault();
  //   this.setState({
  //     nameValue: data.value
  //   });
  // }
  // handlerPassword(event, data) {
  //   event.preventDefault();
  //   this.setState({
  //     nameValue: data.value
  //   });
  // }
  // handlerPasswordR(event, data) {
  //   event.preventDefault();
  //   this.setState({
  //     nameValue: data.value
  //   });
  // }

  handleSubmit(event) {
    event.preventDefault();
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let usernameValue = capitalizeFirstLetter(this.state.username.value.trim());
    let emailValue = this.state.email.value;
    let passwordValue = this.state.password.value.trim();
    let passwordRvalue = this.state.passwordR.value.trim();
    
    let userInfo = { 
      email : emailValue,
      password : passwordValue,
      profile : {
        userName : usernameValue,
        userPhoto: Session.get("uploadedAvatar")
      }
    };

    console.log(userInfo)
    // Meteor.call("userCreateValidation", userInfo, (err, res) => {
    //   if(err) {console.log(err)} else {
    //     Accounts.createUser(res, (err) => {
    //       if (err) {
    //         console.log(err)
    //       } else {
    //         Meteor.call("userCreate", res, (err, res) => {
    //           if(err) {
    //             console.log(err)
    //           } else {
    //             FlowRouter.go('Home');  
    //           };
    //         });
    //       };
    //     });
    //   }
    // });
    var self = this;
    Accounts.createUser(userInfo, (err) => {
      if (err) {
        console.log(err)
        if(err.reason == "Email already exists.") {
          this.setState({
            email: {
              error: true,
              message: "Пользователь с таким e-mail уже существует"
            }
          })
        }
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
  render() {
    let allOk = this.state.username.ok && this.state.email.ok && this.state.password.ok && this.state.passwordR.ok
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
                    <Input onChange={this.handlerChangeName} error={this.state.username.error} fluid ref="username" type="text" name="username" id="username" placeholder='' />
                  </div>
                  <div className="input-message">
                    <div className={this.state.username.error ? "input-message__item input-message__item--error" : "input-message__item"}>
                      {this.state.username.message}
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
                    <Input onChange={this.handlerChangeEmail} error={this.state.email.error} fluid ref="email" type="email" id="email" name="email" placeholder='example@mail.com' />
                  </div>
                  <div className="input-message">
                    <div className={this.state.email.error ? "input-message__item input-message__item--error" : "input-message__item"}>
                      {this.state.email.message}
                    </div>
                  </div>
                </div>
              </div>

              <div className="login-item">
                <div className="input-wrapper">
                  <div className="input-labels">
                    <div className="input-labels__item">
                      <label htmlFor="password" ref="password" className="input-add-group__name">Пароль</label>
                    </div>
                  </div>
                  <div className="input-default">
                    <Input onChange={this.handlerChangePassword} error={this.state.password.error} fluid type="password" ref="passwordR" id="password" name="password" placeholder='' />
                  </div>
                  <div className="input-message">
                    <div className={this.state.password.error ? "input-message__item input-message__item--error" : "input-message__item"}>
                      {this.state.password.message}
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
                    <Input onChange={this.handlerChangePasswordR} error={this.state.passwordR.error} fluid type="password" id="password-r" name="password-r" placeholder='' />
                  </div>
                  <div className="input-message">
                    <div className={this.state.passwordR.error ? "input-message__item input-message__item--error" : "input-message__item"}>
                      {this.state.passwordR.message}
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
