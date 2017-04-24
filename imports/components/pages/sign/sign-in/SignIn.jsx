/* React libs */
import React, { Component } from 'react';

/* Meteor libs */
import { FlowRouter } from 'meteor/kadira:flow-router';

/* Components */
import FacebookBtn from '../../../btn-facebook/FacebookBtn.jsx';
import VkBtn from '../../../btn-vk/VkBtn.jsx';

/* Some funtctions */
import { isValidEmail } from "/imports/functions/validation.js";

/* Semantic UI */
import { Form, Input, Message, Button } from 'semantic-ui-react';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation: {
        email: false,
        password: false,
        message: false
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, { formData }) {
    e.preventDefault();
    const validation = {
      email: false,
      password: false,
      message: false
    };
    this.setState({ validation });
    const email = formData.email;
    const password = formData.password;
    
    const message = "Возможные ошибки:";
    if (!isValidEmail(email)) {
    	validation.message = message;
      validation.email = "Введите корректный адрес!";
      this.setState({ validation });
    }
    if (!password) {
    	validation.message = message;
      validation.password = "Введите пароль!";
      this.setState({ validation });
    }
    if (validation.message) return;

    Meteor.loginWithPassword(email, password, (err) => {
      const { validation } = this.state;
      if(err) {
        validation.message = err.message;
        return this.setState({ validation });
      }
      var isVerificated = Meteor.user().emails[0].verified;
      if (!isVerificated) {
        FlowRouter.go('Home');
      } else {
        validation.message = "Аккаунт не верифицирован, на почту которую вы указывали при регистрици отправлено письмо";
        return this.setState({ validation });
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
                {message ? 
                  <Message size='tiny'>
                    <Message.Header>{message}</Message.Header>
                    <Message.List>
                    {email ?  <Message.Item>{email}</Message.Item> : null}
                    {password ? <Message.Item>{password}</Message.Item> : null}
                    </Message.List>
                  </Message>
                : null}
              </div>
              <div className="login-item">
                <Form.Input label='E-mail:' name='email' type="email" placeholder='example@mail.com' error={email ? true : false} />
              </div>
              <div className="login-item">
                <Form.Input label='Пароль:' name='password' type="password" placeholder='Ваш пароль' error={password ? true : false} />
              </div>
              <div className="login-item">
                <Button primary fluid size="tiny">Войти</Button>
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
