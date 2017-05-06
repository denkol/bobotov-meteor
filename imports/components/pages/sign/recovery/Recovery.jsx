/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';

/* Meteor libs */
import { FlowRouter } from 'meteor/kadira:flow-router';

/* Components */

/* Tranlate & Data */

/* Semantic UI */
import { Form, Input, Message, Button } from 'semantic-ui-react';

/* Other */
import * as actions from '/imports/actions'

class Recovery extends Component {
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

    this.forgotPassword(formData)
  }
  validateEmail(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  forgotPassword(payload) {
    const { t } = this.props;

    this.setState({ error: false, success: false, submitting: true })
    actions.forgotPassword(payload)
      .then(() =>
        this.setState({
          success: `${t('messages.recoveryPage.success.beforeEmail')} ${payload.email} ${t('messages.recoveryPage.success.afterEmail')}`,
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
        <div className="card card_login">
          <div className="login-form">
            <div className="login-item">
              <h4 className="headline-login">{t('recoveryPage.headline')}</h4>
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
                    <p>{success}</p>
                  </Message>
                }
              </div>
              <div className="login-item">
                <Form.Input label='E-mail:' name='email' type="email" placeholder='example@mail.com' error={this.state.emailInput.error} required/>
              </div>
              <div className="login-item">
                <Button primary fluid size="tiny" loading={this.state.submitting}>{t('recoveryPage.sendBtn')}</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

Recovery.propTypes = {};
export default translate('common', { wait: true })(Recovery)