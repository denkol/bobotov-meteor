import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//Components
import BigSlider from '../../big-slider/BigSlider.jsx';
import PhotoGrid from '../../photo-grid/PhotoGrid.jsx';
import { Loader, Dimmer, Message } from 'semantic-ui-react';

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
  render() {
    return (
      <div>
        <BigSlider/>
        <PhotoGrid/>
      </div>
    );
  }
}

Index.propTypes = {};