import React, { Component } from 'react';
import { I18nextProvider } from 'react-i18next';
import Header from './header/Header.jsx';
import Footer from './footer/Footer.jsx';
import MainMenu from './main-menu/MainMenu.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import i18n from '/imports/config/i18n'; // initialized i18next instance

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <MuiThemeProvider>
          <div id="app">
            <Header />
            <div className="interface-width">
              <MainMenu />
              <div className="main-content">
                {this.props.content}
              </div>
              {this.props.additionalContent}
            </div>
            <Footer />
          </div>
        </MuiThemeProvider>
      </I18nextProvider>
    );
  }
}

Layout.propTypes = {};
