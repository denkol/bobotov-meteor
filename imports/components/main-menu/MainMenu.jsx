import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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
      <div className="main-menu-wrapper">
        <div className="main-menu">
          <a href="/" className={"main-menu__item " + activeHome}>
            <svg className="ico-home" role="img">
              <use xlinkHref="#ico-home" />
            </svg>
          </a>
          <a href="/mylistenings" className={"main-menu__item" + " " + disabled + " " + activeMy}>
            <svg className="ico-receipt" role="img">
              <use xlinkHref="#ico-receipt" />
            </svg>
          </a>
          <a href="/favorites" className={"main-menu__item" + " " + disabled + " " + activeFav}>
            <svg className="ico-love" role="img">
              <use xlinkHref="#ico-love" />
            </svg>
          </a>
          <a href="/history" className={"main-menu__item" + " " + disabled + " " + activeHis}>
            <svg className="ico-history" role="img">
              <use xlinkHref="#ico-history" />
            </svg>
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