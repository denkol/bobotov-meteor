/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';
/* Meteor libs */
/* Components */
/* Tranlate & Data */
/* Semantic UI */

class BtnAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  handleGo(path, e) {
    e.preventDefault();
    FlowRouter.go(path);
  }
  render() {
    const { t, mobile } = this.props;
    const className = mobile ? "simple-btn simple-btn_add simple-btn_add--mobile" : "simple-btn simple-btn_add";
    
    return (
      <button onClick={this.handleGo.bind(this, '/create')} className={className} >
        {t('header.addadv')}
      </button>
    );
  }
}

BtnAdd.propTypes = {};

export default translate('nav', { wait: true }) (BtnAdd);