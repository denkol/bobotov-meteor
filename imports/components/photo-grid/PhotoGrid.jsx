import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//Components
import ListeningPreview from '../listening-preview/ListeningPreview.jsx';

import { Dimmer, Loader } from 'semantic-ui-react'

export default class PhotoGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let listenings = this.props.listenings.reverse();
    return (
      <div className="photo-grid">
        {listenings.map((listening, index) => {
          return (
            <div key={"photo-grid-" + index} className="photo-grid__item"> 
              <ListeningPreview 
                key={index}  
                listeningData={listening} 
                layout="index"
              />
            </div>
          );
        })}
      </div>
    );
  } 
}

PhotoGrid.propTypes = {};