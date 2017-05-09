/* React libs */
import React, { Component } from 'react';
import Slider from 'react-slick';
import { translate } from 'react-i18next';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
/* Meteor libs */
import { createContainer } from 'meteor/react-meteor-data';
/* Components */
import ListeningPreview from '../listening-preview/ListeningPreview.jsx';
/* Some functions */
import { Listenings } from '../../api/listenings.js';
/* Semantic UI */
/* Material UI */
/* Other */
import { _ } from 'lodash';
import classNames from 'classnames';

class BigSlider extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        listenings: Meteor.subscribe('listenings.bigslider')
      }
    }
  }

  listenings() {
    return Listenings.find(
      {"listeningTech.bonuses.bonus3": true}, 
      {sort: {"listeningTech.createdAt": -1}}).fetch();
  }

  componentWillUnmount() {
    this.state.subscription.listenings.stop();
  }

  render() {
    const { t } = this.props;
    const BigSliderHeadline = (props) => {
      return (
        <div className="headline">
          <div className="headline__item">
            <div className="headline-icon headline-icon--hot">
              <div className="headline-icon__icon">
                <svg className="ico-hot" role="img">
                  <use xlinkHref="#ico-hot"></use>
                </svg>
              </div>
              <div className="headline-icon__text">{t('indexPage.headlineHot')}:</div>
            </div>
          </div>
        </div>
      );
    };

    var sliderSettings = {
      autoplay: true,
      dots: false,
      infinite: true,
      speed: 500,
      draggable: false,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      slidesToShow: 1,
      arrows: false,
      slidesToScroll: 1
    };
    let listenings = this.listenings();

    if(this.state.subscription.listenings.ready()) {
      if(listenings.length) {
        return (
          <div>
            <BigSliderHeadline />
            <Slider className="slider" ref={c => this.slider = c } {...sliderSettings}>
              {listenings.map((listening, index) => {
              return (
                <div key={"bigSlide-" + index} className="slider__item">
                  <ListeningPreview
                    listeningData={listening}
                    layout="index"
                    loading={true}
                  />
                </div>);
              })}
            </Slider>
          </div>
        );
      } else {
        //if empty
        return (<div></div>);
      }
    } else {
      //loading
      return (
        <div>
          <BigSliderHeadline />
        </div>
      );
    }
  }
}

export default translate('common', { wait: true })(BigSlider)