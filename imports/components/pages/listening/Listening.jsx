import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../../api/listenings.js';
import { Translate } from '../../../functions/functions.js';
import { PaymentPeriod, TypeProperty, TypeDeal, Cities, Countries, ComfortList} from '../../../data/data.js';
//Components
import Profile from '../../profile/Profile.jsx';
import FavoriteBtn from '../../btn-favorite/FavoriteBtn.jsx';
import ListeningPhotos from './ListeningPhotos.jsx';
import ListeningOptions from './ListeningOptions.jsx';
import ListeningComfort from './ListeningComfort.jsx';
import ListeningContacts from './ListeningContacts.jsx';

/* Semantic UI */
import { Message, Dimmer, Loader } from 'semantic-ui-react';

class Listening extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.saveToHistory({id: this.props.listeningId}); //save to history
  }
  
  /* Save to history */
  saveToHistory(args) {
    Meteor.call("listeningSaveToHistory", args);
  }

  render() {
    let loading = this.props.loading;
    let data = {
      loading : this.props.loading,
      listening : this.props.listening,
      owner : this.props.owner,
      listeningId : this.props.listeningId
    }
    if(loading) {
      if(data.listening) {
        let listeningAutorName;
        let listeningAutorDesc;
        let listeningAutorPhoto;
        let comfortItems = [];

        if(data.owner) {
          listeningAutorPhoto = data.owner.profile.userPhoto;
          listeningAutorName = data.owner.profile.username;
          listeningAutorDesc = data.owner.profile.userType;  
        }

        const listeningLastChange = data.listening.listeningTech.lastChangeDate + "";
        const listeningDesc = data.listening.listeningInfo.desc;
        const listeningViews = data.listening.listeningTech.views;
        const listeningHeadline = data.listening.listeningInfo.headline;
        const listeningPrice = data.listening.listeningInfo.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        const listeningPeriod = data.listening.listeningInfo.paymentPeriod;
        const listeningsPhotos = data.listening.listeningPhotos;
        const listeningCountry = data.listening.listeningInfo.country;
        const listeningCity = data.listening.listeningInfo.city;
        const listeningRatio = data.listening.listeningInfo.ratio;
        const listeningComfortList = data.listening.listeningInfo.comfortList;
        const listeningType = data.listening.listeningInfo.comfortList;
        const listeningPublic = data.listening.listeningTech.public;

        const listeningContacts = [
          { contactKey: "Телефон", contactValue: "+7 (999) 899-898-32"},
          { contactKey: "Телефон", contactValue: "+7 (999) 899-898-32"},
          { contactKey: "Телефон", contactValue: "+7 (999) 899-898-32"},
        ];
        const listeningOptions = [
          { optionName: "Страна", optionValue: Translate(Countries, listeningCountry)},
          { optionName: "Город", optionValue: Translate(Cities, listeningCity)},
          { optionName: "Тип недвижимости", optionValue: listeningRatio },
          { optionName: "Тип предлжения", optionValue: listeningRatio },
          { optionName: "Площадь", optionValue: listeningRatio },
          { optionName: "Этаж", optionValue: listeningRatio },
          { optionName: "Спален", optionValue: listeningRatio },
          { optionName: "Ванных комнат", optionValue: listeningRatio },
        ];
      
        console.log(data.owner)
        if(listeningPublic == false && data.owner._id !== Meteor.userId()) {
          return (
            <Message warning>
              <Message.Header>Автор выключил это объявление</Message.Header>
              <p>Оно будет доступно по этому адресу когда автор его снова включит</p>
            </Message>
          );
        }
        return (
          <div>
            {!listeningPublic ?
              <Message warning>
                <Message.Header>Это объявление выключено</Message.Header>
                <p>Только вы можете просматривать это объявление</p>
              </Message>
            : null}
            <ListeningPhotos photos={listeningsPhotos}/>
            <div className="listening-info">
              <div className="listening-info-header">
                <div className="listening-info-header__item">
                  <h1 className="large-headline">{listeningHeadline}</h1>
                  <p className="medium-parag">Последнее изменение: {listeningLastChange}, Просмотров: {listeningViews}</p>
                </div>
                <div className="listening-info-header__item">
                  <div className="price">
                    <div className="price__text">
                      {listeningPrice}
                      <div className="currency">
                        <svg className="ico-euro" role="img">
                          <use xlinkHref="#ico-euro" />
                        </svg>
                      </div>
                    </div>
                    <div className="price__desc">{Translate(PaymentPeriod, listeningPeriod)}</div>
                  </div>
                </div>
              </div>
              <div className="listening-info-profile">
                <Profile data={data.owner}/>
              </div>
              <ListeningOptions options={listeningOptions} />
              <ListeningComfort comforts={listeningComfortList} />
              <div className="listening-info-block">
                <h2 className="medium-headline">Описание автора</h2>
                <div className="listening-info-block__item">
                  <p className="large-parag">{listeningDesc}</p>
                </div>
              </div>
              <ListeningContacts contacts={listeningContacts} />
              <div className="listening-info-footer">
                <div className="listening-info-footer__item">
                  <FavoriteBtn listeningId={this.props.listeningId} isFavorite={this.props.isFavorite}/>
                </div>
                <div className="listening-info-footer__item">
                  <div className="share">
                    <div className="share__item share__item_text">Поделиться:</div><a className="share__item share__item_fb" href="#" /><a className="share__item share__item_vk" href="#" /><a className="share__item share__item_twitter" href="#" /><a className="share__item share__item_gplus" href="#" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <Message warning>
            <Message.Header>Ошибка!</Message.Header>
            <p>Что то пошло не так...</p>
          </Message>
        );
      }
    } else {
      return (
        <div>
          <Dimmer inverted active>
            <Loader indeterminate>Preparing Files</Loader>
          </Dimmer>
         </div>
      );
    }
  }
}

Listening.propTypes = {};

export default createContainer(({ listeningId }) => {
  const id = listeningId;
  const listening = Listenings.findOne({_id: listeningId});
  const ownerId = listening ? listening.listeningTech.ownerId : "";
  const listeningSubs = Meteor.subscribe('listenings.all');
  const userSubs = Meteor.subscribe('user', ownerId);
  const loading = listeningSubs.ready() && userSubs.ready();
  const owner = Meteor.users.find({_id: ownerId}).fetch()[0];
  

  const favoritesList = Meteor.user() ? Meteor.user().profile.favoritesList : [];
  const isFavorite = checkerFavorite(favoritesList, id);
  function checkerFavorite(e, curId) {
    if(e && curId) {
      for(var i = 0; i < e.length; i++) {
        if(e[i] == curId) {
          return true
        }
      }
    }
    return false;
  }
  
  return { listeningId, loading, owner, listening, isFavorite };

}, Listening);

Listening.propTypes = {
  loading: React.PropTypes.bool,
  listening: React.PropTypes.object,
  owner : React.PropTypes.object,
  isFavorite : React.PropTypes.bool
};