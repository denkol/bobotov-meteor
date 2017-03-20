import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../../api/listenings.js';
import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';
import { Dimmer, Loader, Message, Button } from 'semantic-ui-react';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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
  render() {
    let loading = this.props.loading;
    
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
      let listneings = this.props.listenings;
      if(listneings.length) {
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
                <Button className="history-clear-btn" onClick={this.removeHistory}>Очистить историю</Button>
              </div>
            </div>
            
              <div className="favoritesList">
                {listneings.reverse().map((listening, index) => {
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
              content='Объявления которые вы посмотрели'/>
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
        }).fetch()[0];
        if(listeningObj) {
          cache.push(listeningObj); 
        }
      });
    }
    return cache;
  }

  return {loading, listenings}
}, History);