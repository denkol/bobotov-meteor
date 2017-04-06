import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {isValidEmail, isValidPassword} from "/imports/functions/validation.js";
import FacebookBtn from '../../../btn-facebook/FacebookBtn.jsx';
import VkBtn from '../../../btn-vk/VkBtn.jsx';

/* Semantic UI */
import { Form, Input, Message } from 'semantic-ui-react';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation: {
        email: '',
        password: '',
        message: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  Check(validation) {
    this.setState({validation: Object.assign(this.state.validation, validation)});
  }
    
  validationError() {
    const { email, password, message } = this.state.validation;
    if (email) {
      return email;
    } else if (password) {
      return password;
    } else if (message) {
      return message;
    };
  }
  
  handleSubmit(e, { formData }) {
    e.preventDefault();
    const validation = {
      email: '',
      password: '',
      message: ''
    };
    this.setState({ validation });
    const email = formData.email;
    const password = formData.password;
    
    if (!isValidEmail(email)) {
      validation.email = "Введите корректный адрес!";
      return this.Check(validation);
    }
    if (!isValidPassword(password, 6)) {
      validation.password = "Введите более надёжный пароль!";
      return this.Check(validation);
    }

    Meteor.loginWithPassword(email, password, (err) => {
    	const { validation } = this.state;
      if(err) {
        validation.message = err.message;
        return this.Check(validation);
      }
      var isVerificated = Meteor.user().emails[0].verified;
      if (!isVerificated) {
        FlowRouter.go('Home');
      } else {
        validation.message = "Аккаунт не верифицирован, на почту которую вы указывали при регистрици отправлено письмо";
        return this.Check(validation);
      }
    });
  }

  render() {
    const { email, password, message } = this.state.validation;
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
                	{this.validationError() ? 
                  	<Message size='tiny' negative>
                     	<Message.Header>{this.validationError()}</Message.Header>
                  	</Message>
    				 	: null}
              </div>
              <div className="login-item">
                <Form.Input label='E-mail:' name='email' type="email" placeholder='example@mail.com' error={email} />
              </div>
              <div className="login-item">
                <Form.Input label='Пароль:' name='password' type="password" placeholder='Ваш пароль' error={password} />
              </div>
              <div className="login-item">
                <button type='submit' className="simple-btn simple-btn_blue">Войти</button>
              </div>
            </Form>
            <div className="login-item login-item-forgot"> <a className="link-default" href="#">Забыли пароль </a>или <a className="link-default" href="#">не пришло письмо?</a></div>
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
