import React, { Component } from 'react';

import SignIn from './sign-in/SignIn.jsx';
import SignUp from './sign-up/SignUp.jsx';

export default class Sign extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.renderLayout = this.renderLayout.bind(this);
  }
  renderLayout() {
    // $('body').css("background-color", "#f9f9f9")
    let layout = this.props.layout;
    if(layout === "in") {
      return (
        <SignIn />
      );
    } else if(layout === "up") {
      return (
        <SignUp />
      );
    }
  }
  render() {
    return (
      <div className="center-wrapper sign-wrapper"> 
        <div className="center">
          <div className="login-logo">
            <div className="logo-img">
              <a href="/">
                <img src="/img/logo.png" alt="logo.png" />
              </a>
            </div>
          </div>
          {this.renderLayout()}
        </div>
      </div>
    );
  }
}

Sign.propTypes = {
  layout: React.PropTypes.string,
};