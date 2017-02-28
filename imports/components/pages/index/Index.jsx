import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
        <ReactCSSTransitionGroup transitionName = "page"
           transitionAppear = {true} transitionAppearTimeout = {0}
           transitionEnter = {false} transitionLeave = {false}>
        <BigSlider/>
        <PhotoGrid/>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Index.propTypes = {};