import React, { Component } from 'react';
import { Listenings } from '../../api/listenings.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ListeningPreview from '../listening-preview/ListeningPreview.jsx';
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

  componentWillUnmount() {
    this.setState({limit: 9});
		this.state.subscription.listenings.stop();
  }

  loadMore() {
    this.setState({limit: this.state.limit + 9});
  }

  render() {
    const query = Session.get('filterQuery');
    const listenings = Listenings.find(query, {limit: this.state.limit}).fetch();
    if (this.state.subscription.listenings.ready()) {
      const listeningsTotal = Listenings.find(query).count();
      const filterData = Session.get('filterData');
      return (
        <div>
          <FilterLabels filterData={filterData}/>
          {listenings.length ? 
            <div>
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
              { 
                (listeningsTotal > listenings.length) && <div className="paginate-wrapper">
                  <div className="paginate">
                    <Button primary onClick={this.loadMore}>Загрузить еще</Button>
                  </div>
                </div>
              }
            </div> : 
            <div className="main-listening-stream">
              <Message
                header='Объявлений не найдено'
                content='Попробуйте смягчить критерии поиска'/>
            </div>}
          </div>);
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