import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import FacebookBtn from '../../../btn-facebook/FacebookBtn.jsx';
import VkBtn from '../../../btn-vk/VkBtn.jsx';

/* Semantic UI */
import { Input } from 'semantic-ui-react'

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: "",
        error: false
      },
      password: {
        value: "",
        error: false
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlerChangeEmail = this.handlerChangeEmail.bind(this);
    this.handlerChangePassword = this.handlerChangePassword.bind(this);
  }
  validateEmail(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }
  validatePassword(value) {
    return true;
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
  handleSubmit(event) {
    event.preventDefault();

    let emailValue = this.state.email.value.trim();
    let passwordValue = this.state.password.value.trim();
    
    Meteor.loginWithPassword(emailValue, passwordValue, function(err) {
      if(err) {
        console.log(err);
      }
      var isVerificated = Meteor.user().emails[0].verified;
      if (!isVerificated) {
        FlowRouter.go('Home');
      } else {
        alert("Аккаунт не верифицирован, на почту которую вы указывали при регистрици отправлено письмо");
      }
    });  
  }
  render() {
    return (
      <div className="signin">
        <div className="card card_login">
          <div className="login-form">
            <form method="post" onSubmit={this.handleSubmit}>
              <div className="login-item"> 
                <h4 className="headline-login">Войти</h4>
              </div>
              <div className="login-item">
                <FacebookBtn />
                <VkBtn />
              </div>
              <div className="login-item-separator">
                <div className="login-item-separator__text">или</div>
              </div>
              <div className="login-item">
                <div className="input-wrapper">
                  <div className="input-labels">
                    <div className="input-labels__item">
                      <label htmlFor="email" className="input-add-group__name">Email</label>
                    </div>
                  </div>
                  <div className="input-default">
                    <Input onChange={this.handlerChangeEmail} error={this.state.email.error} fluid type="email" id="email" name="email" placeholder='example@mail.com' />
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
                      <label htmlFor="password" className="input-add-group__name">Пароль</label>
                    </div>
                  </div>
                  <div className="input-default">
                    <Input onChange={this.handlerChangePassword} error={this.state.password.error} fluid type="password" id="password" name="password" placeholder='Ваш пароль' />
                  </div>
                  <div className="input-message">
                    <div className={this.state.password.error ? "input-message__item input-message__item--error" : "input-message__item"}>
                    </div>
                  </div>
                </div>
              </div>
              <div className="login-item">
                <button ref="submitBtn" type="submit" className="simple-btn simple-btn_blue">Войти</button>
              </div>
              <div className="login-item login-item-forgot"> <a className="link-default" href="#">Забыли пароль </a>или <a className="link-default" href="#">не пришло письмо?</a></div>
            </form>
          </div>
        </div>
        <div className="login-item-forgot login-item-forgot_center"><a className="link-default" href="/signup">Зарегистрируйте</a> новый аккаунт</div>
      </div>
    );
  }
}

SignIn.propTypes = {
  // layout: React.PropTypes.string,
};
