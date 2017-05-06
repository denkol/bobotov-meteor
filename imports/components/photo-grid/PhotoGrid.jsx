import React, { Component } from 'react';
import { Listenings } from '../../api/listenings.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ListeningPreview from '../listening-preview/ListeningPreview.jsx';
import FilterLabels from '../filter-labels/FilterLabels.jsx';
import { Button, Message, Loader, Dimmer } from 'semantic-ui-react';
import LoaderLayout from '../loader-layout/LoaderLayout.jsx';
import BtnLoadMore from '../btn-loadmore/BtnLoadMore.jsx';

const limit = 18;

export default class PhotoGrid extends TrackerReact(Component) {
  constructor(props) {
    super(props);

    this.state = {
      limit: limit,
      subscription: {
        listenings: Meteor.subscribe('listenings.public', {})
      }
    }

    this.loadMore = this.loadMore.bind(this);
  }
  componentWillMount() {
    Session.setDefault('indexLimit', limit);
  }
  componentWillUnmount() {
    this.setState({limit: limit});
    this.state.subscription.listenings.stop();
  }

  loadMore() {
    Session.set('indexLimit', this.state.limit * 2)
    this.setState({limit: this.state.limit * 2});
  }

  render() {

    const query = Session.get('filterQuery');
    // const query = window.location.pathname;
    const listenings = Listenings.find(query, {limit: this.state.limit, sort: {"listeningTech.createdAt": -1} }).fetch();
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
                    <a href={"/listening/" + listening._id} key={"photo-grid-" + index} className="photo-grid__item">
                      <ListeningPreview
                        key={index}
                        listeningData={listening}
                        layout="index"
                      />
                    </a>
                  );
                })}
              </div>
              {
                (listeningsTotal > listenings.length) && <div className="paginate-wrapper">
                  <div className="paginate">
                    <BtnLoadMore onClick={this.loadMore}/>
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
          <Dimmer active inverted>
            <Loader>Загрузка...</Loader>
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
