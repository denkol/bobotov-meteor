import React, { Component } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '/imports/config/i18n'; // initialized i18next instance

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <div id="app">
          {this.props.page}
        </div>
      </I18nextProvider>
    );
  }
}

App.propTypes = {};
