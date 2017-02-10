import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="main-menu-wrapper">
        <div className="main-menu">
          <a href="/" className="main-menu__item">
            <svg className="ico-home" role="img">
              <use xlinkHref="#ico-home" />
            </svg>
          </a>
          <a href="#" className="main-menu__item">
            <svg className="ico-receipt" role="img">
              <use xlinkHref="#ico-receipt" />
            </svg>
          </a>
          <a href="#" className="main-menu__item">
            <svg className="ico-love" role="img">
              <use xlinkHref="#ico-love" />
            </svg>
          </a>
          <a href="#" className="main-menu__item">
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