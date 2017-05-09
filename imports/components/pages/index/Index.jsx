/* React libs */
import React, { Component } from 'react';

/* Meteor libs */
import { createContainer } from 'meteor/react-meteor-data';

/* Components */
import BigSlider from '../../big-slider/BigSlider.jsx';
import PhotoGrid from '../../photo-grid/PhotoGrid.jsx';
import BtnAdd from '../../btn-add/BtnAdd.jsx';
/* Tranlate & Data */

/* Semantic UI */
import { Message } from 'semantic-ui-react';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillUnmount() {
    $('.filter-btn').removeClass('filter-btn--close');
    $('.main-content').removeClass("main-content--slide-to-left");
    $('.filter').removeClass("filter--show");
  }
  openFilter() {
    $('body').css('overflow', 'hidden'); //lock scroll when filter open
    $('.filter-btn').addClass('filter-btn--close'); //switch buttons to red color
    $('#filterMobile').addClass('filter-mobile--open');
  }
  render() {
    return (
      <div className="index-page-wrapper">
        <button onClick={this.openFilter} className="filter-btn filter-btn-mobile">
          <div className="filter-btn__icon" />
        </button>
        <BtnAdd mobile={true} />
        <BigSlider/>
        <PhotoGrid/>
      </div>
    );
  }
}

Index.propTypes = {};