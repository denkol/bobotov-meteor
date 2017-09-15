import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Listenings } from '../../api/listenings.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ListeningPreview from '../listening-preview/ListeningPreview.jsx';
import FilterLabels from '../filter-labels/FilterLabels.jsx';
import { Button, Message, Loader, Dimmer } from 'semantic-ui-react';

import Loading from '../loading/Loading.jsx';

import BtnLoadMore from '../btn-loadmore/BtnLoadMore.jsx';

class PhotoGrid extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    const limit = FlowRouter.getQueryParam('limit') || Session.get('indexLimit') || 18
    this.state = {
      limit: limit,
      subscription: {
        listenings: Meteor.subscribe('listenings.public', {})
      }
    }

    this.loadMore = this.loadMore.bind(this);
    this.listeningClick = this.listeningClick.bind(this);
  }

  componentDidMount() {
    const scrollY = Session.get('index_scroll_position')
    if (scrollY > 0) {
      window.scrollTo( 0, scrollY )
    }
  }

  componentWillMount() {
    const { limit } = this.state
    Session.setDefault('indexLimit', limit);
  }

  componentWillUnmount() {
    const { limit } = this.state
    this.setState({limit: limit});
    this.state.subscription.listenings.stop();
  }

  loadMore() {
    Session.set('indexLimit', this.state.limit * 2)
    this.setState({limit: this.state.limit * 2});
  }

  listeningClick(event, url) {
    /* Scroll position then user click on the listening */
    const ScrollPosition = event.pageY //event.target.scrollTop;
    Session.set('index_scroll_position', ScrollPosition);
    FlowRouter.go(url);
  }

  render() {
    const { t } = this.props;
    const query = Session.get('filterQuery');

    const listenings = Listenings.find(_.omit(query, 'limit'), {
      limit: Number(this.state.limit),
      sort: {"listeningTech.createdAt": -1}
    }).fetch();

    const isFilter = Session.get('filterQuery');

    const MessageNoListenings = () => (
      <Message
        header={t('messages:noListenings.headline')}
        content={t('messages:noListenings.desc')} />
    );
    
    const MessageFilterNotFound = () => (
      <Message
        header={t('messages:noListeningsFilter.headline')}
        content={t('messages:noListeningsFilter.desc')} />
    );

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
                    <a
                      onClick={event => {
                        this.listeningClick(event, "/listening/" + listening._id)
                      }}
                      id={listening._id}
                      key={"photo-grid-" + index}
                      className="photo-grid__item"
                    >
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
              {isFilter ? <MessageFilterNotFound /> : <MessageNoListenings />}
            </div>
          }
          </div>);
    } else {
      return(
        <Loading />
      );
    }
    return <span />
  }
}

PhotoGrid.propTypes = {};

export default translate('common', { wait: true })(PhotoGrid)