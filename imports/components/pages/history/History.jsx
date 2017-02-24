import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../../api/listenings.js';

import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';
import { Dimmer, Loader, Message } from 'semantic-ui-react';
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let loading = this.props.loading;
    let listneings = this.props.listenings;
    let userId = Meteor.userId();
    if(!userId) {
      return (
        <Message
          warning
          header='Войдите или зарегистрируйтесь'
          content='История просмотров доступна только авторизированным пользователям'
        />
      );
    }
    if(loading) {
      if(listneings.length) {
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
            
              <div className="favoritesList">
                {listneings.map((listening, index) => {
                  return (
                    <div key={"favoritesListItem" + index} className="favoritesList__item">
                      <ListeningPreview listeningData={listening} layout="history"/>
                    </div>
                  );
                })}
              </div>
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
              content='Тут появится объявления которые вы посмотрели'/>
        </div>);
      }
    } else {
      return (
        <Dimmer active inverted>
          <Loader size='medium'>Loading</Loader>
        </Dimmer>
      );
    }
  }
}

History.propTypes = {};

export default createContainer(({ params }) => {
  const subscription = Meteor.subscribe('listenings.public');
  const loading = subscription.ready();
  const historyList = Meteor.user() ? Meteor.user().profile.historyList : [];
  const listenings = listeningsSearchByArray(historyList);
  
  function listeningsSearchByArray(array) {
    var cache = [];
    if (array) {
      array.map(function(err, key) {
        var listeningObj = Listenings.find({
          _id: array[key]
        }).fetch();
        cache.push(listeningObj[0]); // listeningObj return Object, we need a first element
      });
    }
    return cache;
  }

  return {loading, listenings}
}, History);