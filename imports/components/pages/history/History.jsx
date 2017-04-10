import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Listenings } from '../../../api/listenings.js';
import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';
import { Dimmer, Loader, Message, Button } from 'semantic-ui-react';

export default class History extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = { 
      limit: 2,
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
    this.setState({limit: 2});
    this.state.subscription.listenings.stop();
  }
  loadMore() {
    this.setState({limit: this.state.limit + 2});
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
                <div className="headline-icon__text">История:</div>
              </div>
            </div>

              <div className="headline__item">
                <a className="history-clear-btn" onClick={this.removeHistory}>Очистить историю</a>
              </div>
            </div>

              <div className="favoritesList">
                {listenings.reverse().map((listening, index) => {
                  return (
                    <div key={"favoritesListItem" + index} className="favoritesList__item">
                      <ListeningPreview listeningData={listening} layout="history"/>
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
        return (
          <div>
            <div className="headline-icon">
              <div className="headline-icon__icon">
                <svg className="ico-history" role="img">
                  <use xlinkHref="#ico-history"></use>
                </svg>
              </div>
              <div className="headline-icon__text">История:</div>
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