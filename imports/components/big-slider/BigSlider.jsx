import React, { Component } from 'react';
import Slider from 'react-slick';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../api/listenings.js';

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
      slidesToScroll: 1
    };
    let loading = this.props.loading;
    let listenings = this.props.listenings;
    if(loading) {
      return (
      <Slider className="slider" ref={c => this.slider = c } {...sliderSettings}>
        {listenings.map((listening, index) => {
            return (
              <div className="slider__item">
                <ListeningPreview                   
                  listeningData={listening} 
                  layout="index" 
                  loading={true}
                />
              </div>
            );    
          })}
      </Slider>
    );
    } else {
      return <div>Loading</div>
    }
    
  }
}


export default createContainer(({ params }) => {
  const listeningsBigSubscription = Meteor.subscribe('listenings.all');
  const listenings = Listenings.find({}).fetch(); //RETURN ARRAY
  const loading = listeningsBigSubscription.ready();

  return {listenings, loading}
}, BigSlider);

BigSlider.propTypes = {};