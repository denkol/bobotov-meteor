import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import FacebookBtn from '../../../btn-facebook/FacebookBtn.jsx';
import VkBtn from '../../../btn-vk/VkBtn.jsx';

/* Semantic UI */
import { Form, Input } from 'semantic-ui-react';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      emailInput: {
        error: false,
        errorText: ""
      },
      passInput: {
        error: false,
        errorText: ""
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, { value }) {
    this.setState({ value });
  }
  handleSubmit(e, { formData }) {
    e.preventDefault()
    this.setState({ formData });
    
    let email = formData.email + "";
    let password = formData.password + "";

    Meteor.loginWithPassword(email, password, function(err) {
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
  validateEmail(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }
  render() {
    const { formData, value } = this.state;
    return (
      <div className="signin">
        <div className="card card_login">
          <div className="login-form">
            <div className="login-item"> 
              <h4 className="headline-login">Войти</h4>
            </div>
            <div className="login-item">
              <FacebookBtn />
            </div>
            <div className="login-item-separator">
              <div className="login-item-separator__text">или</div>
            </div>
            <Form size={'tiny'} onSubmit={this.handleSubmit}>
              <div className="login-item">
                <Form.Input label='E-mail:' name='email' type="email" placeholder='example@mail.com' error={this.state.emailInput.error} />
              </div>
              <div className="login-item">
                <Form.Input label='Пароль:' name='password' type="password" placeholder='Ваш пароль' error={this.state.passInput.error} />
              </div>
              <div className="login-item">
                <button type='submit' className="simple-btn simple-btn_blue">Войти</button>
              </div>
            </Form>
            <div className="login-item login-item-forgot"> <a className="link-default" href="/recovery">Забыли пароль </a>или <a className="link-default" href="#">не пришло письмо?</a></div>
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
