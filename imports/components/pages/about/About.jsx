/* React libs */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';

/* Meteor libs */
/* Components */
/* Some functions */
import { Listenings } from '../../../api/listenings.js';
/* Semantic UI */
import { Dimmer, Loader, Message, Button } from 'semantic-ui-react';
/* Material UI */
/* Other */

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { t } = this.props;

    return (
      <div>
        <Helmet>
          <title>{t('head:titles.about')+" "+t('head:titles.app')}</title>
        </Helmet>
        <div className="about-header">
          <div className="about-header-img"></div>  
        </div>
        <div className="about-body">
          <div className="about-block" id="about">
            <div className="about-block__headline">
              <h1>{t('about.headline')}</h1>
            </div>
            <div className="about-block__text">
              <p>{t('about.desc')}</p>
            </div>
          </div>
          <div className="about-block" id="contacts">
            <div className="about-block__headline">
              <h1>{t('contacts.headline')}</h1>
            </div>
            <div className="about-block__text">
              <p>{t('contacts.email')}: <a href="mailto:hello@bobotov.me">hello@bobotov.me</a></p>
              <p>{t('contacts.phone')}: +3215654785</p>
            </div>
          </div>
          <div className="about-block" id="support">
            <div className="about-block__headline">
              <h1>{t('support.headline')}</h1>
            </div>
            <div className="about-block__text">
              <p>{t('support.desc')}: <a href="mailto:hello@bobotov.me">hello@bobotov.me</a></p>
            </div>
          </div>
          <div className="about-block" id="advert">
            <div className="about-block__headline">
              <h1>{t('advert.headline')}</h1>
            </div>
            <div className="about-block__text">
              <p>{t('advert.desc')} <a href="mailto:hello@bobotov.me">hello@bobotov.me</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

About.propTypes = {};

export default translate('about', { wait: true })(About)