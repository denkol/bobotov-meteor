import React, { Component } from 'react';

export default class VkBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.signVk = this.signVk.bind(this)
  }

  signVk() {
    Meteor.loginWithVk({

    });
  }

  render() {
    return (
      <div onClick={this.signVk} className="simple-btn_vk">
        <div className="simple-btn_vk__icon"/>
        <span>Войти с помощью Вконтакте</span>
      </div>
    );
  }
}