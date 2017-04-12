import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
//Components
import BigSlider from '../../big-slider/BigSlider.jsx';
import PhotoGrid from '../../photo-grid/PhotoGrid.jsx';
import TopFilterDemo from '../../TopFilterDemo/TopFilterDemo.jsx';

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

  handleGo(path, e) {
    e.preventDefault();
    FlowRouter.go(path);
  }
  openFilter() {
    $('body').css('overflow', 'hidden'); //lock scroll when filter open
    $('.filter-btn').addClass('filter-btn--close'); //switch buttons to red color
    $('#filterMobile').addClass('filter-mobile--open');
  }
  render() {
    return (
      <div>
        <button onClick={this.openFilter} className="filter-btn filter-btn-mobile">
          <div className="filter-btn__icon" />
        </button>
        <button onClick={this.handleGo.bind(this, '/create')} className="simple-btn simple-btn_add simple-btn_add--mobile">Добавить объявление</button>
        <BigSlider/>
        <PhotoGrid/>
      </div>
    );
  }
}

Index.propTypes = {};