import React, { Component } from 'react';
import Slider from 'react-slick';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../api/listenings.js';

import { Dimmer, Loader } from 'semantic-ui-react';
//Components
import ListeningPreview from '../listening-preview/ListeningPreview.jsx';

export default class BigSlider extends Component {
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
    let bonusesListening = [];
    if(listenings) {
      for(let i = 0; i < listenings.length; i++) {
        let bonus3 = listenings[i].listeningTech.bonuses.bonus3;
        if(bonus3) {
          bonusesListening.push(listenings[i]);
        } 
      }
    }
    
    
    if(bonusesListening.length > 0) {
      console.log(bonusesListening)
      return (
        <div>
          <div className="headline-icon headline-icon--hot">
            <div className="headline-icon__icon">
              <svg className="ico-hot" role="img">
                <use xlinkHref="#ico-hot"></use>
              </svg>
            </div>
            <div className="headline-icon__text">Горячие предложения:</div>
          </div>
          <Slider className="slider" ref={c => this.slider = c } {...sliderSettings}>
            {bonusesListening.map((listening, index) => {
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
      return (<div></div>);
    }
  }
}