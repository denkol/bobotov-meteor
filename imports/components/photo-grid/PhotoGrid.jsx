import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../api/listenings.js';

//Components
import ListeningPreview from '../listening-preview/ListeningPreview.jsx';

import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

class PhotoGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let loading = this.props.loading;
    let listenings = this.props.listenings;

    if(loading) {
      return (
        <div className="photo-grid">
          {listenings.map((listening, index) => {
            return (<div key={"photo-grid-" + index} className="photo-grid__item"> 
                      <ListeningPreview 
                        key={index}  
                        listeningData={listening} 
                        layout="index" 
                        loading={true}
                      />
                    </div>);
          })}
        </div>
      );
    } else {
     return (<div className="photo-grid">
       
        <Loader indeterminate>Preparing Files</Loader>
      
     </div> );
    }
  }
}

export default createContainer(({ params }) => {
  const listeningsSubscription = Meteor.subscribe('listenings.all');
  const listenings = Listenings.find({}).fetch(); //RETURN ARRAY
  const loading = listeningsSubscription.ready();

  return {listenings, loading}
}, PhotoGrid);

PhotoGrid.propTypes = {};