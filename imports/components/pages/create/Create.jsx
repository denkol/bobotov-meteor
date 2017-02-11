import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//Components
import Header from '../../header/Header.jsx';
import Footer from '../../footer/Footer.jsx';
import MainMenu from '../../main-menu/MainMenu.jsx';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    // this.saveToHistory({id: this.props.listeningId}); //save to history
  }

  render() {

    if(this.props.loading) {
      return (
        <div>
          
              <div className="headline-icon">
                <div className="headline-icon__icon">
                  
                </div>
                <div className="headline-icon__text">Новое объявление</div>
              </div>
            </div>
      );
    } else {
      return (<div>Loading</div>);
    }
  }
}

Create.propTypes = {};

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
}, Create);