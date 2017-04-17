/* React libs */
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Meteor libs */

/* Components */
import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';

/* Some functions */
import { Listenings } from '../../../api/listenings.js';

/* Semantic UI */
import { Dimmer, Loader, Message, Button } from 'semantic-ui-react';

/* Material UI */

/* Other */

const limit = 9;
export default class History extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = { 
      limit: limit,
      subscription: {
         listenings: Meteor.subscribe('listenings.public', {})
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
      if(res) {
        alert("История удалена");
      }
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
    const user = Meteor.user();
    if(!user) {
      return (
        <Message
          warning
          header='Войдите или зарегистрируйтесь'
          content='История просмотров доступна только авторизированным пользователям'
        />
      );
    }
    const historyList = user.profile.historyList;
    const query = { _id: { $in: historyList } };
    const listenings = Listenings.find(query, {limit: this.state.limit}).fetch();
    if(this.state.subscription.listenings.ready()) {
      if(listenings.length) {
        const listeningsTotal = Listenings.find(query).count() || 0;
        return (
          <div>
            <div className="headline">
              <div className="headline__item">
                <div className="headline-icon">
                  <div className="headline-icon__icon">
                    <svg className="ico-history" role="img">
                      <use xlinkHref="#ico-history"></use>
                    </svg>
                  </div>
                  <div className="headline-icon__text">История просмотров:</div>
                </div>
              </div>
              <div className="headline__item">
                <a className="history-clear-btn" onClick={this.removeHistory}>Очистить историю</a>
              </div>
            </div>
              <div className="photo-grid">
                {listenings.map((listening, index) => {
                  return (
                    <a href={"/listening/" + listening._id} key={"photo-grid-" + index} className="photo-grid__item">
                      <ListeningPreview key={index} listeningData={listening} layout="index" />
                    </a>
                  );
                })}
              </div>
              { (listeningsTotal > listenings.length) && <div className="paginate-wrapper">
                <div className="paginate">
                  <Button primary onClick={this.loadMore}>Загрузить еще</Button>
                </div>
              </div> }
          </div>
        );
      } else {
        return (
          <div>
            <div className="headline-icon">
              <div className="headline-icon__icon">
                <svg className="ico-history" role="img">
                  <use xlinkHref="#ico-history"></use>
                </svg>
              </div>
              <div className="headline-icon__text">Просмотренные объявления:</div>
            </div>
            <Message
              header='История ваших просмортров пуста'
              content='Объявления которые вы посмотрели'/>
        </div>);
      }
    } else {
      return (
        <Dimmer active inverted>
          <Loader size='medium'>Загрузка...</Loader>
        </Dimmer>
      );
    }
  }
}

History.propTypes = {};

/*export default createContainer(({ params }) => {
  const subscription = Meteor.subscribe('listenings.public', {}, {limit: Session.get('pageLimit')});
  const loading = subscription.ready();
  const historyList = Meteor.user() ? Meteor.user().profile.historyList : [];
  const listenings = listeningsSearchByArray(historyList);

  function listeningsSearchByArray(array) {
    var cache = [];
    if (array) {
      array.map(function(err, key) {
        var listeningObj = Listenings.find({
          _id: array[key]
        }).fetch()[0];
        if(listeningObj) {
          cache.push(listeningObj);
        }
      });
    }
    return cache;
  }

  return {loading, listenings}
}, History);*/