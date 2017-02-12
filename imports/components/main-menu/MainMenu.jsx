import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let user = this.props.user;
    return (
      <div className="main-menu-wrapper">
        <div className="main-menu">
          <a href="/" className="main-menu__item">
            <svg className="ico-home" role="img">
              <use xlinkHref="#ico-home" />
            </svg>
          </a>
          <a href="/mylistenings" className={user ? "main-menu__item" : "main-menu__item disabled" }>
            <svg className="ico-receipt" role="img">
              <use xlinkHref="#ico-receipt" />
            </svg>
          </a>
          <a href="/favorites" className={user ? "main-menu__item" : "main-menu__item disabled" }>
            <svg className="ico-love" role="img">
              <use xlinkHref="#ico-love" />
            </svg>
          </a>
          <a href="/history" className={user ? "main-menu__item" : "main-menu__item disabled" }>
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

