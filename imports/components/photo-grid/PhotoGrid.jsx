import React, { Component } from 'react';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../api/listenings.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
//Components
import ListeningPreview from '../listening-preview/ListeningPreview.jsx';
// import Paginate from '../paginate/Paginate.jsx';
import FilterLabels from '../filter-labels/FilterLabels.jsx';

import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';

export default class PhotoGrid extends TrackerReact(Component) {
  constructor(props) {
    super(props);

    this.state = {
      limit: 9,
      subscription: {
          listenings: Meteor.subscribe('listenings.public', {})
      }
    }

    this.loadMore = this.loadMore.bind(this);
  }

  listenings() {
    return Listenings
      .find({}, {limit: this.state.limit})
      .fetch();
  }

  componentWillUnmount() {
    this.setState({limit: 9});
		this.state.subscription.listenings.stop();
  }

  loadMore() {
    this.setState({limit: this.state.limit + 9});
  }

  render() {
    let listenings = this.listenings();
    if (this.state.subscription.listenings.ready()) {

      let listeningsTotal = Counts.get('listenings-public-count') || 0;
      /*
      if(Session.get('filterData')) {
        let filterData = Session.get('filterData');
        // listenings = Listenings.find({
        //   "listeningInfo.city" : filterData.city.replace(/\s/g, ''),
        //   "listeningInfo.typeDeal" : filterData.typeDeal.replace(/\s/g, ''),
        //   "listeningInfo.typeProperty" : filterData.typeProperty.replace(/\s/g, ''),
        //   "listeningInfo.paymentPeriod" : filterData.paymentPeriod.replace(/\s/g, '')
        // }).fetch();
        listenings = Listenings.find({}).fetch();
      }*/
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
            { (listeningsTotal > listenings.length) && <div className="paginate-wrapper">
                <div className="paginate">
                  <Button primary onClick={this.loadMore}>Загрузить еще</Button>
                </div>
              </div>
            }
          </div>
        );
      } else {
        return(
          <div>
            <Message
              header='Объявлений не найдено'
              content='Попробуйте смягчить критерии поиска'/>
          </div>
        );
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

// export default createContainer(({ params }) => {
//   const listeningsSubscription = Meteor.subscribe('listenings.public', {}, {limit: Session.get('pageLimit')});
//   const loading = listeningsSubscription.ready();
//   const listenings = Listenings.find({}, {sort:{"listeningTech.createdAt": -1}}).fetch();
//   return {loading, listenings}
// }, PhotoGrid);