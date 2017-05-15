/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Helmet } from "react-helmet";

/* Meteor libs */
import { FlowRouter } from 'meteor/kadira:flow-router';

/* Components */
import FacebookBtn from '../../../btn-facebook/FacebookBtn.jsx';

/* Some functions */
import { isValidEmail } from "/imports/functions/validation.js";

/* Semantic UI */
import { Form, Input, Message, Icon, Button } from 'semantic-ui-react';

class SignUp extends Component {
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
  
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).trim();
  }

  handleSubmit(e, {formData}) {
    const { t } = this.props;

    e.preventDefault();
    const validation = {
      email: false,
      password: false,
      username: false,
      message: false
    };
    this.setState({ validation });

    const username = this.capitalizeFirstLetter(formData.name);
    const email = formData.email;
    const password = formData.password.trim();
    const passwordR = formData.passwordR.trim();
    const message = t('messages:dinamiclyErrors.formError');

    if (username.length < 3) {
      validation.message = message;
      validation.username = t('messages:dinamiclyErrors.userNameLength');
      this.setState({ validation });
    }
    if (!isValidEmail(email)) {
    	validation.message = message;
      validation.email = t('messages:dinamiclyErrors.invalidEmail'); 
      this.setState({ validation });
    }
    if (!password || !passwordR) {
    	validation.message = message;
      validation.password = t('messages:dinamiclyErrors.emptyPassword');
      this.setState({ validation });
    }
    if (!!password && !!passwordR && password !== passwordR) {
    	validation.message = message;
      validation.password = t('messages:dinamiclyErrors.passwordsNotMatch');
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
        if(err.error === 403) {
          validation.message = t('messages:dinamiclyErrors.emailAlreadyExists');
        }
        return this.setState({ validation });
      } else {
        Meteor.call("userCreate", userInfo, (err, res) => {
          if(err) {
            validation.message = err.reason;
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
    const { t } = this.props;

    return (
      <div className="signup">
        <Helmet>
          <title>{t('head:titles.signUp')+" "+t('head:titles.app')}</title>
        </Helmet>
        <div className="card card_login">
          <div className="login-form">
              <div className="login-item"> 
                <div className="headline-login">{t('signUpPage.headline')}</div>
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
                    {username || email || password ?
                      <Message.List>
                      {username ?  <Message.Item>{username}</Message.Item> : null}
                      {email ?  <Message.Item>{email}</Message.Item> : null}
                      {password ? <Message.Item>{password}</Message.Item> : null}
                      </Message.List>
                    : null }
                  </Message>
                : null}
                </div>
                <div className="login-item">
                  <Form.Input label={t('nameField.label')} name='name' type="text" placeholder={t('nameField.placeholder')} error={username ? true : false}/>
                </div>
                <div className="login-item">
                  <Form.Input label='E-mail:' name='email' type="email" placeholder='example@mail.com' error={email ? true : false}/>
                </div>
                <div className="login-item">
                  <Form.Input label={t('passwordField.label')} name='password' type="password" placeholder={t('passwordField.placeholder')} error={password ? true : false}/>
                </div>
                <div className="login-item">
                  <Form.Input label={t('repeatPasswordField.label')} name='passwordR' type="password" placeholder={t('repeatPasswordField.label')} error={password ? true : false}/>
                </div>
                <div className="login-item">
                  <Button primary fluid size="tiny">{t('signUpPage.enterBtn')}</Button>
                </div>
              </Form>
              <div className="login-item login-item-forgot"> 
                <p>{t('signUpPage.licenseLink.text')}</p><a className="link-default" href="#">{t('signUpPage.licenseLink.link')}</a>
              </div>
          </div>
        </div>
        <div className="login-item-forgot login-item-forgot_center">
          {t('signUpPage.enterLink.text')} <a className="link-default" href="/signin">{t('signUpPage.enterLink.link')}</a>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {};

export default translate('common', { wait: true })(SignUp)