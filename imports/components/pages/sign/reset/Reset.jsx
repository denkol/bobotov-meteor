/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Helmet } from "react-helmet";

/* Meteor libs */
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';

/* Components */

/* Tranlate & Data */

/* Semantic UI */
import { Form, Input, Button, Message } from 'semantic-ui-react';

/* Other */
import * as actions from '/imports/actions'

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      submitting: false,
      error: false,
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

    formData.token = this.props.token;
    this.resetPassword(formData)
  }

  resetPassword(payload) {
    const { t } = this.props;

    this.setState({ error: false, success: false, submitting: true })
    actions.resetPassword(payload)
      .then(() =>
        this.setState({
          success: t('messages.resetPage.success.passwordBeenChanged'),
          submitting: false
        })
      )
      .catch(message => this.setState({ error: message, submitting: false }))
  }

  render() {
    const { formData, value, error, submitting, success } = this.state;
    const { t } = this.props;

    return (
      <div className="signin">
        <Helmet>
          <title>{t('head:titles.reset')+" "+t('head:titles.app')}</title>
        </Helmet>
        <div className="card card_login">
          <div className="login-form">
            <div className="login-item">
              <h4 className="headline-login">{t('resetPage.headline')}</h4>
            </div>
            <div className="login-item-separator"></div>
            <Form size={'tiny'} onSubmit={this.handleSubmit}>
              <div className="login-item">
                {error &&
                  <Message size='tiny' negative>
                    <Message.Header>{t('messages.negativeHeadline')}</Message.Header>
                    <p>{error}</p>
                  </Message>
                }
                {success &&
                  <Message size='tiny' positive>
                    <Message.Header>{t('messages.positiveHeadline')}</Message.Header>
                    <p>{success} <a href="/">{t('other.toHomeLink')}</a></p>
                  </Message>
                }
              </div>
              <div className="login-item">
                <Form.Input label={t('passwordField.label')} name='password' type="password" required/>
              </div>
              <div className="login-item">
                <Form.Input label={t('repeatPasswordField.label')} name='confirmPassword' type="password" required/>
              </div>
              <div className="login-item">
                <Button primary fluid size="tiny" loading={this.state.submitting}>{t('resetPage.sendBtn')}</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

Reset.propTypes = {
  token: React.PropTypes.string
};

export default translate('common', { wait: true })(Reset)
