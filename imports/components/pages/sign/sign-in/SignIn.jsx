import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import FacebookBtn from '../../../btn-facebook/FacebookBtn.jsx';
import VkBtn from '../../../btn-vk/VkBtn.jsx';

/* Semantic UI */
import { Input, Label } from 'semantic-ui-react'


export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        error : false,
        loading: false,
        disabled: false,
        message: ""
      },
      password: {
        error: false,
        loading: false,
        disabled: false,
        message: ""
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let that = this;
    let email = that.refs.email.value.trim();
    let password = that.refs.password.value.trim();
    
    Meteor.loginWithPassword(email, password, function(err) {
      if(err) {
        that.setState({
          error : true, 
          errorMessage : err.reason
        });
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
                      <label htmlFor="login" className="input-add-group__name">E-mail</label>
                    </div>
                  </div>
                  <div className="input-default">
                    <Input fluid size='small' error={this.state.email.error} type="email" name="email" placeholder='example@mail.com' />
                  </div>
                  <div className="input-message">
                    <div className="input-message__item">
                      {this.state.email.message}
                    </div>
                  </div>
                </div>
              </div>
              <div className="login-item">
                <div className="input-wrapper">
                  <div className="input-labels">
                    <div className="input-labels__item">
                      <label htmlFor="login" className="input-add-group__name">Пароль</label>
                    </div>
                  </div>
                  <div className="input-default">
                    <Input fluid size='small' error={this.state.password.error} type="password" name="password" placeholder='' />
                  </div>
                  <div className="input-message">
                    <div className="input-message__item">
                      {this.state.password.message}
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
