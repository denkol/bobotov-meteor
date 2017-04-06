import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  clickOnMenuItem(e) {
    var currentItem = $(e.target);
    var allItems = $('.main-menu__item');

    if(!currentItem.hasClass('main-menu__item')) {
      currentItem = currentItem.parents('.main-menu__item');
    }

    allItems.removeClass('main-menu__item--active');
    currentItem.addClass('main-menu__item--active');
  }
  render() { 
    //let user = this.props.user;
    const { user } = this.props;
    const disabled = user ? "" : "disabled";
    const url = window.location.pathname;
    /* Home Active Class */
    const activeHome = url === "/" ? "main-menu__item--active" : "";

    /* My Active Class */
    const activeMy = url === "/mylistenings" ? "main-menu__item--active" : "";

    /* Favorites Active Class */
    const activeFav = url === "/favorites" ? "main-menu__item--active" : "";

    /* History Active Class */
    const activeHis = url === "/history" ? "main-menu__item--active" : "";

    return (
      <div className="main-menu-wrapper">
        <div className="main-menu">
          <a href="/" onClick={this.clickOnMenuItem} className={"main-menu__item " + activeHome}>
            <svg className="ico-home" role="img">
              <use xlinkHref="#ico-home" />
            </svg>
            <span className="main-menu-text">На главную</span>
          </a>
          <a href="/mylistenings" onClick={this.clickOnMenuItem} className={"main-menu__item " + disabled + " " + activeMy}>
            <svg className="ico-receipt" role="img">
              <use xlinkHref="#ico-receipt" />
            </svg>
            <span className="main-menu-text">Мои объявления</span>
          </a>
          <a href="/favorites" onClick={this.clickOnMenuItem} className={"main-menu__item " + disabled + " " + activeFav}>
            <svg className="ico-love" role="img">
              <use xlinkHref="#ico-love" />
            </svg>
            <span className="main-menu-text">Избранное</span>
          </a>
          <a href="/history" onClick={this.clickOnMenuItem} className={"main-menu__item " + disabled + " " + activeHis}>
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

export default createContainer(({ params }) => {
  const user = Meteor.user();
  return {user}
}, MainMenu);