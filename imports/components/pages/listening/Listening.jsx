import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../../api/listenings.js';

//Components
import Header from '../../header/Header.jsx';
import Footer from '../../footer/Footer.jsx';
import MainMenu from '../../main-menu/MainMenu.jsx';

import FavoriteBtn from '../../btn-favorite/FavoriteBtn.jsx';

class Listening extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
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
      
      for(var value in listeningComfortList) { 
        if (listeningComfortList.hasOwnProperty(value)) {
          comfortItems.push(listeningComfortList[value]); 
        }
      }

      const listeningLastChange = data.listening.listeningTech.lastChangeDate + "";
      const listeningDesc = data.listening.listeningInfo.desc;
      const listeningComfortList = data.listening.listeningInfo.comfortList;
      const listeningViews = data.listening.listeningTech.views;
      const listeningHeadline = data.listening.listeningInfo.headline;
      const listeningPrice = data.listening.listeningInfo.price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      const listeningPeriod = data.listening.listeningInfo.paymentPeriod;
      const listeningsPhotos = data.listening.listeningPhotos;
      const listeningContacts = data.listening.listeningContacts;
      const listeningOptions = {
        city : data.listening.listeningInfo.city,
        ratio : data.listening.listeningInfo.ratio,
        typeProperty : data.listening.listeningInfo.typeProperty,
        typeDeal : data.listening.listeningInfo.typeDeal
      }
      if(loading) {
        return (
         <div>
            <Header />
            <div className="interface-width">
              <div className="main-content">
                <MainMenu />
                <div className="listening-photo-wrapper">
                  <div className="listening-photo-wrapper__item">
                    <img src="/img/test.jpg" />
                  </div>
                </div>
                <div className="listening-info">
                  <div className="listening-info-header">
                    <div className="listening-info-header__item">
                      <h1 className="large-headline">{listeningHeadline}</h1>
                      <p className="medium-parag">Будва, Черногория</p>
                    </div>
                    <div className="listening-info-header__item">
                      <div className="price">
                        <div className="price__text">
                          <div className="currency">
                            <svg className="ico-euro" role="img">
                              <use xlinkHref="#ico-euro" />
                            </svg>
                          </div>{listeningPrice}
                        </div>
                        <div className="price__desc">{listeningPeriod}</div>
                      </div>
                    </div>
                  </div>
                  <div className="listening-info-profile">
                    <div className="profile">
                      <div className="profile-img"><img src="/img/profile.jpeg" alt /></div>
                      <div className="flex-clear">
                        <div className="profile-name">Montenegro</div>
                        <div className="profile-desc">Агенство</div>
                      </div>
                    </div>
                  </div>
                  <div className="listening-info-block listening-info-block--inline">
                    <h2 className="medium-headline">Общая информация</h2>
                    <div className="listening-info-block__item">
                      <div className="listening-info-param"><span className="listening-info-param__item">Тип предложения: </span><span className="listening-info-param__item">Аренда</span></div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="listening-info-param"><span className="listening-info-param__item">Срок: </span><span className="listening-info-param__item">До сезона</span></div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="listening-info-param"><span className="listening-info-param__item">Тип недвижимости: </span><span className="listening-info-param__item">Аппартаменты</span></div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="listening-info-param"><span className="listening-info-param__item">Площадь: </span><span className="listening-info-param__item">120 m²</span></div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="listening-info-param"><span className="listening-info-param__item">Кол-во спален: </span><span className="listening-info-param__item">3</span></div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="listening-info-param"><span className="listening-info-param__item">Кол-во санузлов: </span><span className="listening-info-param__item">2</span></div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="listening-info-param"><span className="listening-info-param__item">Спальных мест: </span><span className="listening-info-param__item">8</span></div>
                    </div>
                  </div>
                  <div className="listening-info-block listening-info-block--inline">
                    <h2 className="medium-headline">Удобства:</h2>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Холодильник</div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Плита</div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Чайник</div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Утюг</div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Фен</div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Холодильник</div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Плита</div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Чайник</div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Утюг</div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Фен</div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Плита</div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Чайник</div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Утюг</div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="comfort-label">Фен</div>
                    </div>
                  </div>
                  <div className="listening-info-block">
                    <h2 className="medium-headline">Описание хозяина:</h2>
                    <div className="listening-info-block__item">
                      <p className="large-parag">Сдается в Баре на лето отдельный милый домик с прилегающей зеленой территорией (цитрусовые деревья, парковка, уличная мебель). Структура дома: коридор, санузел, гостиная с зоной кухни, 2 спальни ( в одной двуспальная кровать, в другой 2 односпальные). Предоставляется вся техника, кабельное тв, интернет, постельное, посуда. Расположение: центр города, частный сектор в р-не рынка, до моря 15 мин по тенистым улицам, рынок и супермаркеты в 5 минутах). При аренде на весь июнь (21-30 дней) цена 800 е СО всеми расходами (исключая туристический налог), при аренде на август 950 е также СО всеми включенными расходами.</p>
                    </div>
                  </div>
                  <div className="listening-info-block">
                    <h2 className="medium-headline">Контакты</h2>
                    <div className="listening-info-block__item">
                      <div className="listening-info-contacts">
                        <div className="listening-info-contacts__item">Телефон: </div>
                        <div className="listening-info-contacts__item">+7 (999) 455-455-32</div>
                      </div>
                    </div>
                    <div className="listening-info-block__item">
                      <div className="listening-info-contacts"><span className="listening-info-contacts__item">Facebook: </span><span className="listening-info-contacts__item"><a href="#">http://facebook.com/dsad/dasds </a></span></div>
                    </div>
                  </div>
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
            </div>
            <Footer />
         </div>
      );
      }else {
        return <div>Loading...</div>
      }
    } else {
      return <div>loading</div>
    }
    
  }
}

Listening.propTypes = {};


export default createContainer(({ listeningId }) => {
  const id = listeningId;
  const listening = Listenings.findOne({_id: listeningId});
  const ownerId = listening ? listening.listeningTech.ownerId : "";
  const listeningSubs = Meteor.subscribe('listenings.all');
  const userSubs = Meteor.subscribe('users.all');
  const loading = listeningSubs.ready() && userSubs.ready();
  /* Defining owner */
  let owner = listening ? Meteor.users.findOne({_id: listening.listeningTech.ownerId}) : {};
  
  Meteor.call('usersGetOne', ownerId, ()=> {
    
  })
  
  const user = Meteor.user() ? Meteor.user() : {};
  const favoritesList = Meteor.user() ? Meteor.user().profile.favoritesList : [];
  const isFavorite = checkerFavorite(favoritesList, id);
  console.log(favoritesList, isFavorite)
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
  
  return { listeningId, owner, loading, listening, user, isFavorite };

}, Listening);

Listening.propTypes = {
  loading: React.PropTypes.bool,
  listening: React.PropTypes.object,
  owner : React.PropTypes.object,
  user : React.PropTypes.object,
  isFavorite : React.PropTypes.bool
};