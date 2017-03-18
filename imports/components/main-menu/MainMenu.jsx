import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  closeMobileMenu() {
    $('#mobile-menu').removeClass('main-menu-wrapper--open');
  }
  render() {
    let user = this.props.user;
    let disabled = user ? "" : "disabled";
    let url = window.location.pathname;
    /* Home Active Class */
    let activeHome = url === "/" ? "main-menu__item--active" : "";

    /* My Active Class */
    let activeMy = url === "/mylistenings" ? "main-menu__item--active" : "";

    /* Favorites Active Class */
    let activeFav = url === "/favorites" ? "main-menu__item--active" : "";

    /* History Active Class */
    let activeHis = url === "/history" ? "main-menu__item--active" : "";

    return (
      <div id="mobile-menu" className="main-menu-wrapper">
        <div className="main-menu">
          <a href="/" onClick={this.closeMobileMenu} className={"main-menu__item " + activeHome}>
            <svg className="ico-home" role="img">
              <use xlinkHref="#ico-home" />
            </svg>
            <span className="main-menu-text">На главную</span>
          </a>
          <a href="/mylistenings" onClick={this.closeMobileMenu} className={"main-menu__item" + " " + disabled + " " + activeMy}>
            <svg className="ico-receipt" role="img">
              <use xlinkHref="#ico-receipt" />
            </svg>
            <span className="main-menu-text">Мои объявления</span>
          </a>
          <a href="/favorites" onClick={this.closeMobileMenu} className={"main-menu__item" + " " + disabled + " " + activeFav}>
            <svg className="ico-love" role="img">
              <use xlinkHref="#ico-love" />
            </svg>
            <span className="main-menu-text">Избранное</span>
          </a>
          <a href="/history" onClick={this.closeMobileMenu} className={"main-menu__item" + " " + disabled + " " + activeHis}>
            <svg className="ico-history" role="img">
              <use xlinkHref="#ico-history" />
            </svg>
            <span className="main-menu-text">История</span>
          </a>
        </div>
        <button onClick={this.closeMobileMenu} className="mobile-menu-close-btn">
          <svg className="mobile-menu-close-btn__icon ico-close" role="img">
            <use xlinkHref="#ico-close" />
          </svg>
        </button>
      </div>
    );
  }
}

MainMenu.propTypes = {};

export default createContainer(({ params }) => {
  const user = Meteor.user();
  return {user}
}, MainMenu);