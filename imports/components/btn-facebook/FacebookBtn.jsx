import React, { Component } from 'react';
import { translate } from 'react-i18next';

class FacebookBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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
    const { t } = this.props;

    return (
      <div onClick={this.signFacebook} className="simple-btn_fb">
        <div className="simple-btn_fb__icon"/>
        <span>{t('facebookBtn.text')}</span>
      </div>
    );
  }
}

export default translate('common', { wait: true })(FacebookBtn)