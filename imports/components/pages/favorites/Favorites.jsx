import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../../api/listenings.js';

import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';
import { Dimmer, Loader, Message } from 'semantic-ui-react';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    window.scrollTo(0, 0); //scroll to top
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
          content='Избранные объявления доступны только авторизированным пользователям'
        />
      );
    }
    if(loading) {
      if(listneings.length > 0) {
        return (
          <div>
            <div className="headline">
              <div className="headline__item">
                <div className="headline-icon">
                  <div className="headline-icon__icon">
                    <svg className="ico-love loved" role="img">
                      <use xlinkHref="#ico-love"></use>
                    </svg>
                  </div>
                  <div className="headline-icon__text">Избранные объявления:</div>
              </div>
            </div>
            </div>
              <div className="favoritesList">
                {listneings.reverse().map((listening, index) => {
                  return (
                    <div key={"favoritesListItem" + index} className="favoritesList__item">
                      <ListeningPreview listeningData={listening} layout="favorites"/>
                    </div>
                  );
                })}
              </div>
          </div>
        );
      } else {
        return(
          <div>
            <div className="headline-icon">
              <div className="headline-icon__icon">
                <svg className="ico-love loved" role="img">
                  <use xlinkHref="#ico-love"></use>
                </svg>
              </div>
              <div className="headline-icon__text">Избранные объявления:</div>
            </div>
            <Message
              header='У вас нет избранных объявлений'
              content='Добавьте какое-нибудь объявление в избранное'/>
          </div>
        );
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

Favorites.propTypes = {};

export default createContainer(({ params }) => {
  const subscription = Meteor.subscribe('listenings.public');
  const loading = subscription.ready();
  const favoritesList = Meteor.user() ? Meteor.user().profile.favoritesList : [];
  const listenings = listeningsSearchByArray(favoritesList);
  
  function listeningsSearchByArray(array) {
    var cache = [];
    if (array) {
      array.map(function(err, key) {
        var listeningObj = Listenings.find({
          _id: array[key]
        }).fetch()[0]; // listeningObj return Object, we need a first element
        if(listeningObj) {
          cache.push(listeningObj); 
        }
      });
    }
    return cache;
  }

  return {loading, listenings}
}, Favorites);