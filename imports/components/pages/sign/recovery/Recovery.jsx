/* React libs */
import React, { Component } from 'react';

/* Meteor libs */
import { FlowRouter } from 'meteor/kadira:flow-router';

/* Components */

/* Tranlate & Data */

/* Semantic UI */
import { Form, Input, Message, Button } from 'semantic-ui-react';

import * as actions from '/imports/actions'

console.log(actions)

export default class Recovery extends Component {
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
    this.setState({ error: false, success: false, submitting: true })
    actions.forgotPassword(payload)
      .then(() =>
        this.setState({
          success: `На адрес ${payload.email} было отправлено письмо с инструкциями по восстановлению пароля`,
          submitting: false
        })
      )
      .catch(message => this.setState({ error: message, submitting: false }))
  }

  render() {
    const { formData, value, error, submitting, success } = this.state;

    return (
      <div className="signin">
        <div className="card card_login">
          <div className="login-form">
            <div className="login-item">
              <h4 className="headline-login">Восстановление пароля</h4>
            </div>
            <div className="login-item-separator"></div>
            <Form size={'tiny'} onSubmit={this.handleSubmit}>
              <div className="login-item">
                {error &&
                  <Message size='tiny' negative>
                    <Message.Header>Ошибка!</Message.Header>
                    <p>{error}</p>
                  </Message>
                }
                {success &&
                  <Message size='tiny' positive>
                    <Message.Header>Успех!</Message.Header>
                    <p>{success}</p>
                  </Message>
                }
              </div>
              <div className="login-item">
                <Form.Input label='E-mail:' name='email' type="email" placeholder='example@mail.com' error={this.state.emailInput.error} />
              </div>
              <div className="login-item">
                <Button primary fluid size="tiny" loading={this.state.submitting}>Отправить письмо</Button>
              </div>
            </Form>
            <div className="login-item login-item-forgot"><a className="link-default" href="#">Не пришло письмо?</a></div>
          </div>
        </div>
      </div>
    );
  }
}

Recovery.propTypes = {};
