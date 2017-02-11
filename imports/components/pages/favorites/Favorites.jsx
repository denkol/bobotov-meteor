import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../../api/listenings.js';

import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    // this.saveToHistory({id: this.props.listeningId}); //save to history
  }

  render() {
    let loading = this.props.loading;
    let listneings = this.props.listenings; 
    if(loading) {
      return (
        <div>
          <div className="headline-icon">
            <div className="headline-icon__icon">
              <svg className="ico-love loved" role="img">
                <use xlinkHref="#ico-love"></use>
              </svg>
            </div>
            <div className="headline-icon__text">Избранные объявления:</div>
          </div>
          
            <div className="favoritesList">
              {listneings.map((listening, index) => {
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
      return (<div>Loading</div>);
    }
  }
}

Favorites.propTypes = {};

export default createContainer(({ params }) => {
  const subscription = Meteor.subscribe('listenings.all');
  const loading = subscription.ready();
  const favoritesList = Meteor.user() ? Meteor.user().profile.favoritesList : [];
  const listenings = listeningsSearchByArray(favoritesList);
  
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
}, Favorites);