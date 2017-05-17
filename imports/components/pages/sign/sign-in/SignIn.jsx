/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Helmet } from "react-helmet";

/* Meteor libs */
import { FlowRouter } from 'meteor/kadira:flow-router';

/* Components */
import FacebookBtn from '../../../btn-facebook/FacebookBtn.jsx';
import VkBtn from '../../../btn-vk/VkBtn.jsx';

/* Some funtctions */
import { isValidEmail } from "/imports/functions/validation.js";

/* Semantic UI */
import { Form, Input, Message, Button } from 'semantic-ui-react';

class SignIn extends Component {
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
    const { t } = this.props;
    const validation = {
      email: false,
      password: false,
      message: false
    };
    this.setState({ validation });
    const email = formData.email;
    const password = formData.password;
    
    const message = t('messages:dinamiclyErrors.formError');
    if (!isValidEmail(email)) {
    	validation.message = message;
      validation.email = t('messages:dinamiclyErrors.invalidEmail'); 
      this.setState({ validation });
    }
    if (!password) {
    	validation.message = message;
      validation.password = t('messages:dinamiclyErrors.emptyPassword');
      this.setState({ validation });
    }
    if (validation.message) return;

    Meteor.loginWithPassword(email, password, (err) => {
      const { validation } = this.state;
      if(err) {
        if(err.error === 403) {
          /* "User not found" or "Incorrect password" */
          validation.message = t('messages:dinamiclyErrors.incorrectPassword');
        }
        return this.setState({ validation });
      }
      FlowRouter.go('Home', {msg: "Добро пожаловать!"});

      // var isVerificated = Meteor.user().emails[0].verified;
      // if (!isVerificated) {
      //   FlowRouter.go('Home');
      // } else {
      //   validation.message = "Аккаунт не верифицирован, на почту которую вы указывали при регистрици отправлено письмо";
      //   return this.setState({ validation });
      // }
    });
  }

  render() {
    const { t } = this.props;
    const { email, password, message } = this.state.validation;

    return (
      <div className="signin">
        <Helmet>
          <title>{t('head:titles.signIn')+" "+t('head:titles.app')}</title>
        </Helmet>
        <div className="card card_login">
          <div className="login-form">
            <div className="login-item"> 
              <h4 className="headline-login">{t('signInPage.headline')}</h4>
            </div>
            <div className="login-item">
              <FacebookBtn />
            </div>
            <div className="login-item-separator">
              <div className="login-item-separator__text">{t('other.or')}</div>
            </div>
            <Form size={'tiny'} onSubmit={this.handleSubmit}>
              <div className="login-item">
                {message ? 
                  <Message size='tiny'>
                    <Message.Header>{message}</Message.Header>
                    {email || password ?
                      <Message.List>
                      {email ?  <Message.Item>{email}</Message.Item> : null}
                      {password ? <Message.Item>{password}</Message.Item> : null}
                      </Message.List>
                    : null}
                  </Message>
                : null}
              </div>
              <div className="login-item">
                <Form.Input label='E-mail:' name='email' type="email" placeholder='example@mail.com' error={email ? true : false} />
              </div>
              <div className="login-item">
                <Form.Input label={t('passwordField.label')} name='password' type="password" placeholder={t('passwordField.placeholder')} error={password ? true : false} />
              </div>
              <div className="login-item">
                <Button primary fluid size="tiny">{t('signInPage.enterBtn')}</Button>
              </div>
            </Form>
            <div className="login-item login-item-forgot"> <a className="link-default" href="/recovery">{t('other.forgotPassword')}</a></div>
          </div>
        </div>
        <div className="login-item-forgot login-item-forgot_center"><a className="link-default" href="/signup">{t('signInPage.newAccountLink.link')}</a> {t('signInPage.newAccountLink.text')}</div>
      </div>
    );
  }
}

SignIn.propTypes = {};

export default translate('common', { wait: true })(SignIn)