import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

/* Semantic UI */
import { Form, Input } from 'semantic-ui-react';

export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e, { formData }) {
    e.preventDefault()
    this.setState({ formData });
  }
  render() {
    const { formData, value } = this.state;
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
                <Form.Input label='Новый пароль' name='reset' type="password" error={this.state.emailInput.error} />
              </div>
              <div className="login-item">
                <Form.Input label='Повторите пароль' name='reset-repeat' type="password" error={this.state.emailInput.error} />
              </div>
              <div className="login-item">
                <button type='submit' className="simple-btn simple-btn_blue">Изменить пароль</button>
              </div>
            </Form>
            <div className="login-item login-item-forgot"><a className="link-default" href="#">Не пришло письмо?</a></div>
          </div>
        </div>
      </div>
    );
  }
}

Reset.propTypes = {};
