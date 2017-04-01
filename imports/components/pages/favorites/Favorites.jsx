import React, { Component } from 'react';
//import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../../api/listenings.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';

export default class Favorites extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = { 
      limit: 2,
      subscription: {
         listenings: Meteor.subscribe('listenings.public', {})
      } 
    };
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0); //scroll to top
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
          content='Избранные объявления доступны только авторизированным пользователям'
        />
      );
    }
    const favouritesList = user.profile.favoritesList;
    const query = { _id: { $in: favouritesList } };
    const listenings = Listenings.find(query, {limit: this.state.limit} ).fetch();
    if(this.state.subscription.listenings.ready()) {
      console.log(listenings.length, favouritesList);
      if(listenings.length) {
        const listeningsTotal = Listenings.find(query).count() || 0;
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
                {listenings.map((listening, index) => {
                  return (
                    <div key={"favouritesListItem" + index} className="favoritesList__item">
                      <ListeningPreview listeningData={listening} layout="favorites"/>
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
