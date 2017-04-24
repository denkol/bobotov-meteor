/* React libs */
import React, { Component } from 'react';

/* Meteor libs */
import { FlowRouter } from 'meteor/kadira:flow-router';

/* Components */

/* Tranlate & Data */

/* Semantic UI */
import { Form, Input, Button, Message } from 'semantic-ui-react';

import * as actions from '/imports/actions'

export default class Reset extends Component {
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
    console.log(payload)
    this.setState({ error: false, success: false, submitting: true })
    actions.resetPassword(payload)
      .then(() =>
        this.setState({
          success: `Пароль изменен`,
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
              <h4 className="headline-login">Сброс пароля</h4>
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
                <Form.Input label='Новый пароль' name='password' type="password" />
              </div>
              <div className="login-item">
                <Form.Input label='Повторите пароль' name='confirmPassword' type="password"/>
              </div>
              <div className="login-item">
                <Button primary fluid size="tiny" loading={this.state.submitting}>Изменить пароль</Button>
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
