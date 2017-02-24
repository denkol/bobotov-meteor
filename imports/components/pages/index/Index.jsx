import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../../api/listenings.js';

//Components
import BigSlider from '../../big-slider/BigSlider.jsx';
import FilterLabels from '../../filter-labels/FilterLabels.jsx';
import PhotoGrid from '../../photo-grid/PhotoGrid.jsx';
import { Loader, Dimmer, Message } from 'semantic-ui-react';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillUnmount() {
    $('.filter-btn').removeClass('filter-btn--close');
    $('.main-content').removeClass("main-content--slide-to-left");
    $('.filter').removeClass("filter--show");
  }
  render() {
    let loading = this.props.loading;
    let listenings = Session.get('listenings.public');
    function findBonusListeninging(listenings) {
      let bonusListenings = [];
      for(let i = 0; i < listenings.length; i++) {
        if(listenings[i].listeningTech.bonuses.bonus3 === true) {
          bonusListenings.push(listenings[i]);
        }
      }
      return bonusListenings;
    }
    
    let bonusListenings = [];
    if(loading) {
      bonusListenings = findBonusListeninging(listenings);
    }
    
    if(loading) {
      if(listenings.length > 0) {
        return (
         <div>
            <BigSlider listenings={listenings}/>
            <FilterLabels />
            <PhotoGrid listenings={listenings}/>
          </div>
        );
      } else {
        if(bonusListenings.length > 0) {
          return(
            <div>
              <BigSlider listenings={listenings}/>
              <Message
                header='Пусто!'
                content='Объявлений по вашему запросу не найдено, попробуйте смягчить критерии поиска.'
              />
            </div>
          );
        } else {
          return(
            <div>
              <Message
                header='Пусто!'
                content='Объявлений по вашему запросу не найдено, попробуйте смягчить критерии поиска.'
              />
            </div>
          );
        }
      }
    } else {
      return(
        <div>
          <Dimmer active inverted>
            <Loader size='medium'>Loading</Loader>
          </Dimmer>
        </div>
      );
    }
  }
}

Index.propTypes = {};

export default createContainer(({ params }) => {
  const listeningsSubscription = Meteor.subscribe('listenings.public');
  const listenings = Listenings.find({}).fetch(); //RETURN ARRAY
  const loading = listeningsSubscription.ready();
  if(loading) {
    Session.set('listenings.public', listenings);
  }
  return {loading}
}, Index);