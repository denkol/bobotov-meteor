import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../api/listenings.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
//Components
import ListeningPreview from '../listening-preview/ListeningPreview.jsx';
// import Paginate from '../paginate/Paginate.jsx';
import FilterLabels from '../filter-labels/FilterLabels.jsx';

import { Button, Dimmer, Loader } from 'semantic-ui-react';

class PhotoGrid extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      limit: 9
    }
    this.loadMore = this.loadMore.bind(this);
  }
  loadMore() {
    this.setState({
      limit: this.state.limit + 9
    });
  }
  render() {
    let loading = this.props.loading;
    let limit = this.state.limit;
    if(loading) {
      let listenings = Listenings.find({"listeningTech.public" : true}, {sort: {"listeningTech.createdAt" : -1}, limit: limit}).fetch();

      if(Session.get('filterData')) {
        let filterData = Session.get('filterData');
        listenings = Listenings.find({
          "listeningInfo.city" : filterData.city.replace(/\s/g, ''),
          "listeningInfo.typeDeal" : filterData.typeDeal.replace(/\s/g, ''),
          "listeningInfo.typeProperty" : filterData.typeProperty.replace(/\s/g, ''),
          "listeningInfo.paymentPeriod" : filterData.paymentPeriod.replace(/\s/g, '')
        }, {sort: {"listeningTech.createdAt" : -1}}).fetch();
      }
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
            {limit === listenings.length ? <div className="paginate-wrapper">
              <div className="paginate">
                <Button primary onClick={this.loadMore}>Загрузить еще</Button>
              </div>
            </div> : null}

          </div>
        );
      } else {
        return(<div>PhotoGrid is empty</div>);
      }
    } else {
      return(
        <div>
          <Dimmer inverted active>
            <Loader indeterminate>Загрузка...</Loader>
          </Dimmer>
        </div>
      );
    }
  } 
}

PhotoGrid.propTypes = {};

export default createContainer(({ params }) => {
  const listeningsSubscription = Meteor.subscribe('listenings.public');
  const loading = listeningsSubscription.ready();
  return {loading}
}, PhotoGrid);