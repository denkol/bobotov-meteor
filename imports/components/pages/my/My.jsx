/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';

/* Meteor libs */
import { createContainer } from 'meteor/react-meteor-data';

/* Components */
import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';
import EmptyBanner from '../../empty-banner/EmptyBanner.jsx';
import Loading from '../../loading/Loading.jsx';

/* Some functions */
import { Listenings } from '../../../api/listenings.js';

/* Semantic UI */
import { Message } from 'semantic-ui-react';

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    window.scrollTo(0, 0); //scroll to top
  }
  sortListeningByStatusCode(listenings) {
    let sortedListenings = {
      published: [],
      waitingApprove: [],
      disabled: []
    }
    
    for(let i = 0; i < listenings.length; i++) {
      let listeningStatusCode = listenings[i].listeningTech.statusCode;

      if(listeningStatusCode === 1) {
        sortedListenings.published.push(listenings[i]);
      }
      if(listeningStatusCode === 2) {
        sortedListenings.waitingApprove.push(listenings[i]);
      }
      if(listeningStatusCode === 3) {
        sortedListenings.disabled.push(listenings[i]);
      }
    }

    return sortedListenings;
  }
  render() {
    const { t, loading, listenings } = this.props;
    const userId = Meteor.userId();
    const sortedListenings = this.sortListeningByStatusCode(listenings);

    const Headline = () => (
      <div className="headline">
        <div className="headline__item">
          <div className="headline-icon">
            <div className="headline-icon__icon">
              <svg className="ico-receipt" role="img">
                <use xlinkHref="#ico-receipt" />
              </svg>
            </div>
            <div className="headline-icon__text">{t('myPage.headline')}</div>
          </div>
        </div>
      </div>
    );
    
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
          <Headline />
          {sortedListenings.waitingApprove.length > 0 ?
          <div className="favoritesList">
            <div className="separator">
              <div className="separator__text">{t('myPage.wait')}</div>
            </div>
            {sortedListenings.waitingApprove.map((listening, index) => {
              return (
                <div key={"favoritesListItem" + index} className="favoritesList__item">
                  <ListeningPreview listeningData={listening} layout="my"/>
                </div>
              );
            })}
          </div> : ""}

          {sortedListenings.published.length > 0 ?
          <div className="favoritesList">
            <div className="separator">
              <div className="separator__text">{t('myPage.public')}</div>
            </div>
            {sortedListenings.published.map((listening, index) => {
              return (
                <div key={"favoritesListItem" + index} className="favoritesList__item">
                  <ListeningPreview listeningData={listening} layout="my"/>
                </div>
              );
            })}
          </div> : ""}
          

          {sortedListenings.disabled.length > 0 ?
          <div className="favoritesList">
            <div className="separator">
              <div className="separator__text">{t('myPage.disabled')}</div>
            </div>
            {sortedListenings.disabled.map((listening, index) => {
              return (
                <div key={"favoritesListItem" + index} className="favoritesList__item">
                  <ListeningPreview listeningData={listening} layout="my"/>
                </div>
              );
            })}
          </div> : ""}
        </div>
      );
      } else {
        return(
          <div>
            <Message header='Пусто!' content='Добавьте объявление кликнув на кнопку "Добавить объявление", это бесплатно'/>
          </div>
        );
      }
    } else {
      return (
        <Loading />
      );
    }
  }
}

My.propTypes = {};

export default createContainer(({ params }) => {
  const subscription = Meteor.subscribe('listenings.my');
  const loading = subscription.ready();
  const ownerId = Meteor.userId();
  const listenings = Listenings.find({"listeningTech.ownerId" : ownerId} ).fetch();

  return {loading, listenings}
}, translate('common', { wait: true })(My));