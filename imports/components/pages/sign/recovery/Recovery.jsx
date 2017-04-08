import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

/* Semantic UI */
import { Form, Input } from 'semantic-ui-react';

export default class Recovery extends Component {
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
              <h4 className="headline-login">Восстановление пароля</h4>
            </div>
            <div className="login-item-separator"></div>
            <Form size={'tiny'} onSubmit={this.handleSubmit}>
              <div className="login-item">
                <Form.Input label='E-mail:' name='email' type="email" placeholder='example@mail.com' error={this.state.emailInput.error} />
              </div>
              <div className="login-item">
                <button type='submit' className="simple-btn simple-btn_blue">Отправить письмо</button>
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
