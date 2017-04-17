/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Meteor libs */
import { ActiveRoute } from 'meteor/zimme:active-route'
import { createContainer } from 'meteor/react-meteor-data';
/* Components */

/* Some functions */

/* Semantic UI */

/* Material UI */

/* Other */
import classNames from 'classnames';

class MainMenu extends TrackerReact(Component) {

  constructor(props) {
    super(props);
    this.state = {}
  }

  clickOnMenuItem(e) {}
  render() {
    let user = Meteor.user();
    let favoritesLength;
    const disabled = user ? "" : "disabled";
    const { t } = this.props;

    return (
      <div className="main-menu-wrapper">
        <div className="main-menu">
          <a
            href="/"
            onClick={this.clickOnMenuItem}
            className={classNames('main-menu__item', {
              'main-menu__item--active': ActiveRoute.name('Home')
            })}
          >
            <svg className="ico-home" role="img">
              <use xlinkHref="#ico-home" />
            </svg>
            <span className="main-menu-text">{t('main.home')}</span>
          </a>
          <a
            href="/mylistenings"
            onClick={this.clickOnMenuItem}
            className={classNames('main-menu__item', {
              disabled: !user,
              'main-menu__item--active': ActiveRoute.name('mylistenings')
            })}
          >
            <svg className="ico-receipt" role="img">
              <use xlinkHref="#ico-receipt" />
            </svg>
            <span className="main-menu-text">{t('main.advs')}</span>
          </a>
          <a
            href="/favorites"
            onClick={this.clickOnMenuItem}
            className={classNames('main-menu__item', {
              disabled: !user,
              'main-menu__item--active': ActiveRoute.name('favorites')
            })}
          >
            <svg className="ico-love" id="love-menu-item" role="img">
              <use xlinkHref="#ico-love" />
            </svg>
            <span className="main-menu-text">{t('main.favorite')}</span>
          </a>
          <a
            href="/history"
            onClick={this.clickOnMenuItem}
            className={classNames('main-menu__item', {
              disabled: !user,
              'main-menu__item--active': ActiveRoute.name('history')
            })}
          >
            <svg className="ico-history" role="img">
              <use xlinkHref="#ico-history" />
            </svg>
            <span className="main-menu-text">{t('main.history')}</span>
          </a>
        </div>
      </div>
    );
  }
}

MainMenu.propTypes = {};

export default translate('nav', { wait: true })(MainMenu)