import React, { Component } from 'react';

export default class FacebookBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    this.signFacebook = this.signFacebook.bind(this)
  }

  signFacebook() {
    Meteor.loginWithFacebook({
      requestPermissions: ['public_profile']
    }, (err) => {
      if (err) {
        // handle error
      } else {
        Meteor.call("facebookSign", (err, res) => {
          FlowRouter.go('Home');
        });
      }
    });
  }

  render() {
    return (
      <div onClick={this.signFacebook} className="simple-btn_fb">
        <div className="simple-btn_fb__icon"/>
        <span>Войти с помощью Facebook</span>
      </div>
    );
  }
}