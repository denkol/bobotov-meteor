import React, { Component } from 'react';
import Slider from 'react-slick';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../api/listenings.js';

import { Dimmer, Loader } from 'semantic-ui-react';
//Components
import ListeningPreview from '../listening-preview/ListeningPreview.jsx';

class BigSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
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
    
    let listenings = this.props.listenings;
    let loading = this.props.loading;
    
    if(loading) {
      if(listenings.length) {
        return (
          <div>
            <div className="headline">
              <div className="headline__item">
                <div className="headline-icon headline-icon--hot">
                  <div className="headline-icon__icon">
                    <svg className="ico-hot" role="img">
                      <use xlinkHref="#ico-hot"></use>
                    </svg>
                  </div>
                  <div className="headline-icon__text">Горячие предложения:</div>
                </div>
              </div>
            </div>
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
        <Dimmer inverted active>
          <Loader indeterminate>Preparing Files</Loader>
        </Dimmer>
      );
    }
  }
}

export default createContainer(({ params }) => {
  const listeningsSubscription = Meteor.subscribe('listenings.public');
  const loading = true;
  const listenings = Listenings.find({"listeningTech.bonuses.bonus3": true}).fetch();
  return {loading, listenings}
}, BigSlider);