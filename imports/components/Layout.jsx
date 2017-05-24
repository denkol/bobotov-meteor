/* React libs */
import React, { Component } from 'react';
import { I18nextProvider } from 'react-i18next';

import { Initializer } from 'react-google-analytics';
const GAInitiailizer = Initializer;


/* Meteor libs */

/* Components */
import Header from './header/Header.jsx';
import Footer from './footer/Footer.jsx';
import MainMenu from './main-menu/MainMenu.jsx';
import Snackbar from './snackbar/Snackbar.jsx';

/* Some functions */
import i18n from '/imports/config/i18n'; // initialized i18next instance

/* Semantic UI */

/* Material UI */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* Other */

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    typeof ga !== 'undefined' && ga('create', 'UA-56444632-5', 'auto');
    typeof ga !== 'undefined' && ga('send', 'pageview');

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
            <GAInitiailizer />
            <Footer />
          </div>
        </MuiThemeProvider>
      </I18nextProvider>
    );
  }
}

Layout.propTypes = {};
