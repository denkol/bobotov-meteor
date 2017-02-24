import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../../api/listenings.js';
import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';
import { Dimmer, Loader, Message } from 'semantic-ui-react';
import EmptyBanner from '../../empty-banner/EmptyBanner.jsx';

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let loading = this.props.loading;
    let listenings = this.props.listenings; 
    let userId = Meteor.userId();


    let waitingApprove = [];
    let disabled = [];
    let published = [];

    if(loading) {
      
      for(let i = 0; i < listenings.length; i++) {
        // console.log(listenings[i]);
        let listeningStatusCode = listenings[i].listeningTech.statusCode;

        if(listeningStatusCode === 1) {
          published.push(listenings[i]);
        }
        if(listeningStatusCode === 2) {
          waitingApprove.push(listenings[i]);
        }
        if(listeningStatusCode === 3) {
          disabled.push(listenings[i]);
        }
      }

    }
    
    if(!userId) {
      <Message
        warning
        header='Войдите или зарегистрируйтесь'
        content='Список "Мои объявления" доступен только авторизированным пользователям'
      />
    }
    if(loading) {
      if(listenings.length){
        return (
        <div>
          <div className="headline-icon">
            <div className="headline-icon__icon">
              <svg className="ico-receipt" role="img">
                <use xlinkHref="#ico-receipt" />
              </svg>
            </div>
            <div className="headline-icon__text">Мои объявления:</div>
          </div>

          {waitingApprove.length > 0 ?
          <div className="favoritesList">
            <div className="separator">
              <div className="separator__text">Ожидают проверки</div>
            </div>
            {waitingApprove.map((listening, index) => {
              // if(listening.listeningTech.statusCode === 2) {
                return (
                  <div key={"favoritesListItem" + index} className="favoritesList__item">
                    <ListeningPreview listeningData={listening} layout="my"/>
                  </div>
                );
              // }
            })}
          </div> : ""}

          {published.length > 0 ?
          <div className="favoritesList">
            <div className="separator">
              <div className="separator__text">Опубликованные</div>
            </div>
            {published.map((listening, index) => {
              // if(listening.listeningTech.statusCode === 1) {
                return (
                  <div key={"favoritesListItem" + index} className="favoritesList__item">
                    <ListeningPreview listeningData={listening} layout="my"/>
                  </div>
                );
              // }
            })}
          </div> : ""}
          

          {disabled.length > 0 ?
          <div className="favoritesList">
            <div className="separator">
              <div className="separator__text">Отключенные</div>
            </div>
            {disabled.map((listening, index) => {
              // if(listening.listeningTech.statusCode === 3) {
                return (
                  <div key={"favoritesListItem" + index} className="favoritesList__item">
                    <ListeningPreview listeningData={listening} layout="my"/>
                  </div>
                );
              // }
            })}
          </div> : ""}
        </div>
      );
      } else {
        return(
          <div>
          <div className="headline-icon">
            <div className="headline-icon__icon">
              <svg className="ico-receipt" role="img">
                <use xlinkHref="#ico-receipt" />
              </svg>
            </div>
            <div className="headline-icon__text">Мои объявления:</div>
          </div>
          <Message
              header='Пусто!'
              content='Добавьте объявление кликнув на кнопку "Добавить объявление", это бесплатно'/>
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

My.propTypes = {};

export default createContainer(({ params }) => {
  const subscription = Meteor.subscribe('listenings.my');
  const loading = subscription.ready();
  // const listeningsList = Meteor.user() ? Meteor.user().profile.listeningsList : [];
  // const listenings = listeningsSearchByArray(listeningsList);

  const listenings = Listenings.find().fetch();
  // function listeningsSearchByArray(array) {
  //   var cache = [];
  //   if (array) {
  //     array.map(function(err, key) {
  //       var listeningObj = Listenings.find({
  //         _id: array[key]
  //       }).fetch();
  //       cache.push(listeningObj[0]); // listeningObj return Object, we need a first element
  //     });
  //   }
  //   return cache;
  // }

  return {loading, listenings}
}, My);