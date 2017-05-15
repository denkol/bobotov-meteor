/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';
/* Meteor libs */
import { createContainer } from 'meteor/react-meteor-data';

/* Components */

/* Some functions */
import i18n from '/imports/config/i18n';

/* Semantic UI */
import { Dropdown, Flag } from 'semantic-ui-react';

/* Material UI */
import Dialog from 'material-ui/Dialog';

/* Other */


/* Global vars */
const toggleLng = lng => i18n.changeLanguage(lng)

/* Component code */
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                <a href="/about#contacts" className="footer-menu__item">{t('footer.contacts')}</a>
                <a href="/about#support" className="footer-menu__item">{t('footer.support')}</a>
                <a href="/about#advert" className="footer-menu__item">{t('footer.advert')}</a>
              </div>
              <div className="footer-copyright">Copyright © {moment().format('YYYY')} {t('common:appName')} - {t('footer.copyrightText')}.</div>
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