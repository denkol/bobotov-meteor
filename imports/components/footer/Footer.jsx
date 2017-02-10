import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <footer className="footer">
        <div className="interface-width">
          <div className="footer-menu">
            <a href="#" className="footer-menu__item">О компании</a>
            <a href="#" className="footer-menu__item">Контакты</a>
            <a href="#" className="footer-menu__item">Поддержка</a>
            <a href="#" className="footer-menu__item">Реклама</a>
          </div>
          <div className="footer-copyright">Copyright © {moment().format('YYYY')} bobotov Inc. All rights reserved.</div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {};