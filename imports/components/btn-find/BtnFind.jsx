/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';
/* Meteor libs */
/* Components */
/* Tranlate & Data */
/* Semantic UI */

class BtnFind extends Component {
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
    const className = mobile ? "simple-btn simple-btn_find simple-btn_find--mobile" : "simple-btn simple-btn_find";
    
    return (
      <button onClick={this.handleGo.bind(this, '/ifind')} className={className} >
        Ищу жилье!
      </button>
    );
  }
}

BtnFind.propTypes = {};

export default translate('nav', { wait: true }) (BtnFind);