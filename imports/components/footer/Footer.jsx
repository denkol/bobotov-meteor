import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import FooterAbout from './pages/FooterAbout.jsx';

import { Dropdown, Flag } from 'semantic-ui-react';

import i18n from '/imports/config/i18n'

const toggleLng = lng => i18n.changeLanguage(lng)

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <footer className="footer">
        <div className="interface-width">
          <div className="footer-content">
            <div className="footer-content__item">
              <div className="footer-menu">
                <a href="/about" className="footer-menu__item">О проекте</a>
                <a href="/contacts" className="footer-menu__item">Контакты</a>
                <a href="/support" className="footer-menu__item">Поддержка</a>
                <a href="/contacts" className="footer-menu__item">Реклама</a>
              </div>
              <div className="footer-copyright">Copyright © {moment().format('YYYY')} bobotov All rights reserved.</div>
            </div>
            <div className="footer-content__item">
              <div className="footer-select-lang">
                <div className="footer-select-lang__item">
                  <Flag name='rs' />
                </div>
                <div className="footer-select-lang__item" >
                  <Flag name='ru' onClick={() => toggleLng('ru')} />
                </div>
                <div className="footer-select-lang__item" >
                  <Flag name='gb' onClick={() => toggleLng('en')}/>
                </div>
                <div className="footer-select-lang__item" >
                  <Flag name='de' onClick={() => toggleLng('en')}/>
                </div>
              </div>
              <div className="footer-copyright">
                <span>Свяжитесь с нами </span><a href="mailto:hello@bobotov.me">hello@bobotov.me</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {};