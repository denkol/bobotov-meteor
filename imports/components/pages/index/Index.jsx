import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
//Components
import BigSlider from '../../big-slider/BigSlider.jsx';
import FilterLabels from '../../filter-labels/FilterLabels.jsx';
import Filter from '../../filter/Filter.jsx';
import PhotoGrid from '../../photo-grid/PhotoGrid.jsx';

import Header from '../../header/Header.jsx';
import Footer from '../../footer/Footer.jsx';
import MainMenu from '../../main-menu/MainMenu.jsx';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
       <div>
          <Header />
          <div className="interface-width">
            <div className="main-content">
              <MainMenu />
              <div className="headline-icon headline-icon--hot">
                <div className="headline-icon__icon">
                  <svg className="ico-hot" role="img">
                    <use xlinkHref="#ico-hot"></use>
                  </svg>
                </div>
                <div className="headline-icon__text">Горячие предложения:</div>
              </div>
              <BigSlider />
              <FilterLabels />
              <PhotoGrid />
            </div>
            <Filter />
          </div>
          <Footer />
       </div>
    );
  }
}

Index.propTypes = {};