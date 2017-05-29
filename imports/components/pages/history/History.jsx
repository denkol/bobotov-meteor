/* React libs */
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { translate } from 'react-i18next';
import { Helmet } from "react-helmet";

/* Meteor libs */

/* Components */
import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';
import BtnLoadMore from '../../btn-loadmore/BtnLoadMore.jsx';
import Loading from '../../loading/Loading.jsx';

/* Some functions */
import { Listenings } from '../../../api/listenings.js';

/* Semantic UI */
import { Message, Button } from 'semantic-ui-react';

/* Material UI */

/* Other */

const limit = 9;

class History extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      limit: limit,
      subscription: {
         listenings: Meteor.subscribe('listenings.public')
      }
    };
    this.loadMore = this.loadMore.bind(this);
    this.removeHistory = this.removeHistory.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0); //scroll to top
  }

  removeHistory(event) {
    event.preventDefault();
    Meteor.call('removeAllHistory', (err, res) => {
      if(err) {console.log(err)}
    })
  }

  componentWillUnmount() {
    this.setState({limit: limit});
    this.state.subscription.listenings.stop();
  }

  loadMore() {
    this.setState({limit: this.state.limit + limit});
  }

  render() {
    const { t } = this.props;
    const user = Meteor.user();
    const historyList = user ? user.profile.historyList : [];
    const query = { _id: { $in: historyList } };
    const listenings = historyList.slice(0, this.state.limit).map(listeningId => Listenings.findOne(listeningId))
    const listeningsTotal = Listenings.find(query).count() || 0;

    const Head = () => (
      <Helmet>
        <title>{t('head:titles.history')+" "+t('head:titles.app')}</title>
      </Helmet>
    );

    const MessageEmpty = () => (
      <Message
        header={t('messages:listeningsEmpty.headline')}
        content={t('messages:listeningsEmpty.desc')} />
    );

    const MessageNeedLogin = () => (
      <Message info
        header={t('messages:needLogin.headline')}
        content={t('messages:needLogin.desc')} />
    );

    const HistoryHeadline = () => {
      return (
        <div className="headline">
          <div className="headline__item">
            <div className="headline-icon">
              <div className="headline-icon__icon">
                <svg className="ico-history" role="img">
                  <use xlinkHref="#ico-history"></use>
                </svg>
              </div>
              <div className="headline-icon__text">{t('historyPage.headline')}:</div>
            </div>
          </div>
          <div className="headline__item">
            <a href="/history" className="history-clear-btn" onClick={this.removeHistory}>{t('historyPage.clearHistoryBtn')}</a>
          </div>
        </div>
      );
    };

    if(!user) {
      return (
        <div>
          <Head/>
          <MessageNeedLogin />
        </div>
      );
    };

    if(this.state.subscription.listenings.ready()) {
      if(listeningsTotal) {
        return (
          <div className="historyPage">
            <Head />
            <HistoryHeadline />
            <div className="photo-grid">
              {listenings.map((listening, index) => {
                if(listening) {
                  return (
                    <a href={"/listening/" + listening._id} key={"photo-grid-" + index} className="photo-grid__item">
                      <ListeningPreview key={index} listeningData={listening} layout="index" />
                    </a>
                  );
                }
              })}
            </div>
            { (listeningsTotal > listenings.length) && <div className="paginate-wrapper">
              <div className="paginate">
                <BtnLoadMore onClick={this.loadMore}/>
              </div>
            </div> }
          </div>
        );
      } else {
        return (
          <div>
            <Head />
            <HistoryHeadline />
            <MessageEmpty/>
          </div>
        );
      }
    } else {
      return (
        <Loading />
      );
    }
  }
}

History.propTypes = {};

export default translate('common', { wait: true })(History);