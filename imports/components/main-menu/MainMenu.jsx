import React, { Component } from 'react';
import { ActiveRoute } from 'meteor/zimme:active-route'
import classNames from 'classnames'
import { createContainer } from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

console.log(classNames)

export default class MainMenu extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {}
  }
  clickOnMenuItem(e) {
    // var currentItem = $(e.target);
    // var allItems = $('.main-menu__item');

    // if(!currentItem.hasClass('main-menu__item')) {
    //   currentItem = currentItem.parents('.main-menu__item');
    // }

    // allItems.removeClass('main-menu__item--active');
    // currentItem.addClass('main-menu__item--active');
  }
  render() {
    let user = Meteor.user();
    let favoritesLength;
    const disabled = user ? "" : "disabled";

    // const url = window.location.pathname;

    // /* Home Active Class */
    // const activeHome = url === "/" ? "main-menu__item--active" : "";

    // /* My Active Class */
    // const activeMy = url === "/mylistenings" ? "main-menu__item--active" : "";

    // /* Favorites Active Class */
    // const activeFav = url === "/favorites" ? "main-menu__item--active" : "";

    // /* History Active Class */
    // const activeHis = url === "/history" ? "main-menu__item--active" : "";

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
            <span className="main-menu-text">На главную</span>
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
            <span className="main-menu-text">Мои объявления</span>
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
            <span className="main-menu-text">Избранное</span>
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
            <span className="main-menu-text">История</span>
          </a>
        </div>
      </div>
    );
  }
}

MainMenu.propTypes = {};
