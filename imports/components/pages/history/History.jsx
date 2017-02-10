import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../../api/listenings.js';

//Components
import Header from '../../header/Header.jsx';
import Footer from '../../footer/Footer.jsx';
import MainMenu from '../../main-menu/MainMenu.jsx';

import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';

class History extends Component {
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
          <Header />
          <div className="interface-width">
            <div className="main-content">
              <MainMenu />
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
                        <ListeningPreview listeningData={listening} layout="favorites"/>
                      </div>
                    );
                  })}
                </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else {
      return (<div>Loading</div>);
    }
  }
}

History.propTypes = {};

export default createContainer(({ params }) => {
  const subscription = Meteor.subscribe('listenings.all');
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