import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';

export default class ListeningPhotos extends Component {
  constructor(props) {
    super(props);
  } 
  handleImageLoad(event) {
    
  }
  render() {
    let images = [];
    
    /* Push first image */
    images.push({
      original : this.props.photos.main,
      thumbnail : this.props.photos.main
    }); 

    this.props.photos.other.map((item, key) => {
      images.push({
        original: item,
        thumbnail: item,
      });
    });

    if(this.props.photos.main) {
      return (
        <div className="listening-photo-wrapper">
          <ImageGallery
            items={images}
            slideInterval={2000}
            onImageLoad={this.handleImageLoad}
            showPlayButton={false} 
            showThumbnails={false}
            showFullscreenButton={false}
            showIndex={true} />
        </div>
      ); 
    } else {
      return (
        <div className="listening-photo-wrapper">
          <div className="listening-photo__item" style={ {backgroundImage: "url(/img/no_photo.svg)", backgroundSize: "50%"} }></div>
        </div>
      );
    }
  }
}