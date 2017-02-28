import React, { Component } from 'react';
import Header from './header/Header.jsx';
import Footer from './footer/Footer.jsx';
import MainMenu from './main-menu/MainMenu.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (

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
    );
  }
}

Layout.propTypes = {};