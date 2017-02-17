import React, { Component } from 'react';
import Header from './header/Header.jsx';
import Footer from './footer/Footer.jsx';
import MainMenu from './main-menu/MainMenu.jsx';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div id="app">
        <Header />
        <div className="interface-width">
          <div className="main-content">
            <MainMenu />
            {this.props.content}
          </div>
          {this.props.additionalContent}
        </div>
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {};