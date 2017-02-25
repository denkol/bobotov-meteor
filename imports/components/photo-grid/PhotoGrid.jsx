import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../api/listenings.js';
//Components
import ListeningPreview from '../listening-preview/ListeningPreview.jsx';
import Paginate from '../paginate/Paginate.jsx';
import FilterLabels from '../filter-labels/FilterLabels.jsx';

import { Dimmer, Loader } from 'semantic-ui-react'

class PhotoGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let listenings = this.props.listenings;
    let loading = this.props.loading;
    if(loading) {
      if(listenings.length) {
        return (
          <div>
            <FilterLabels />
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
            <Paginate />
          </div>
        );
      } else {
        return(<div>PhotoGrid is empty</div>);
      }
    } else {
      return(<div>PhotoGrid Loading</div>);
    }
  } 
}

PhotoGrid.propTypes = {};

export default createContainer(({ params }) => {
  const listeningsSubscription = Meteor.subscribe('listenings.public');
  const loading = listeningsSubscription.ready();
  const listenings = Listenings.find({"listeningTech.public": true}).fetch();
  return {loading, listenings}
}, PhotoGrid);