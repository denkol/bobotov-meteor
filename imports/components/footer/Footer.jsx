import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import FooterAbout from './pages/FooterAbout.jsx';

import { Dropdown, Flag } from 'semantic-ui-react';

import { translate } from 'react-i18next';
import i18n from '/imports/config/i18n';

const toggleLng = lng => i18n.changeLanguage(lng)

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { t } = this.props;
    return (
      <footer className="footer">
        <div className="interface-width">
          <div className="footer-content">
            <div className="footer-content__item">
              <div className="footer-menu">
                <a href="/about" className="footer-menu__item">{t('footer.about')}</a>
                <a href="/contacts" className="footer-menu__item">{t('footer.contacts')}</a>
                <a href="/support" className="footer-menu__item">{t('footer.support')}</a>
                <a href="/contacts" className="footer-menu__item">{t('footer.contacts')}</a>
              </div>
              <div className="footer-copyright">Copyright © {moment().format('YYYY')} bobotov D.O.O All rights reserved.</div>
            </div>
            <div className="footer-content__item">
              <div className="footer-select-lang">
                <div className="footer-select-lang__item">
                  <Flag name='rs'/>
                </div>
                <div className="footer-select-lang__item" >
                  <Flag name='ru' onClick={() => toggleLng('ru')} />
                </div>
                <div className="footer-select-lang__item" >
                  <Flag name='gb' onClick={() => toggleLng('en')}/>
                </div>
                <div className="footer-select-lang__item" >
                  <Flag name='de'/>
                </div>
              </div>
              <div className="footer-copyright">
                <span>{t('footer.connectWithUs')} </span><a href="mailto:hello@bobotov.me">hello@bobotov.me</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {};

export default translate('nav', { wait: true })(Footer)