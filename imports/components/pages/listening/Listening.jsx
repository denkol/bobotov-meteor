/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Helmet } from "react-helmet";
import i18n from '/imports/config/i18n';

/* Meteor libs */
import { createContainer } from 'meteor/react-meteor-data';

/* Components */
import Profile from '../../profile/Profile.jsx';
import FavoriteBtn from '../../btn-favorite/FavoriteBtn.jsx';
import PrintBtn from '../../btn-print/PrintBtn.jsx';
import ListeningPhotos from './ListeningPhotos.jsx';
import ListeningOptions from './ListeningOptions.jsx';
import ListeningComfort from './ListeningComfort.jsx';
import ListeningContacts from './ListeningContacts.jsx';
import ListeningMap from './ListeningMap.jsx';
import Loading from '../../loading/Loading.jsx';

/* Tranlate & Data */
import { Listenings } from '../../../api/listenings.js';
import { Translate } from '../../../functions/functions.js';
import { PaymentPeriod, TypeProperty, TypeDeal, Cities, Countries, ComfortList} from '../../../data/data.js';

/* Semantic UI */
import { Message, Dimmer, Loader, Button, Icon, Breadcrumb } from 'semantic-ui-react';

/* Other */
import * as actions from '/imports/actions';

class Listening extends Component {
  constructor(props) {
    super(props);

    this.handleGo = this.handleGo.bind(this)

    this.state = {}
  }
  componentDidMount() {
    this.saveToHistory({id: this.props.listeningId}); //save to history
  }

  saveToHistory(args) {
    Meteor.call("listeningSaveToHistory", args);
  }

  handleGo(event, path, data, query) {
    event.preventDefault();
    this.setState({subMenuOpen: false});
    FlowRouter.go(path, data, query);
  }
  ok(id) {
    const master = Meteor.user().profile.master;
    if(master) {
      Meteor.call('listeningApprove', id, (err, res) => {
        if(err) {console.log(err)}
      });
    }
  }
  render() {
    const { loading, t } = this.props;
    const data = {
      loading : this.props.loading,
      listening : this.props.listening,
      owner : this.props.owner,
      listeningId : this.props.listeningId
    }
    const BackBtn = () => (
      <Button
        onClick={event =>
          this.handleGo(event, '/', {}, actions.filterToQuery([
            ...Session.get('filterData'),
            { limit: Session.get('indexLimit') || 18 }
          ]))
        }
        size="small"
        content={t('listening.backBtn')}
        icon='left arrow'
        labelPosition='left' />
    );

    const ApproveBtn = () => (
      <Button
        onClick={this.ok.bind(this, data.listeningId)}
        size="small"
        content="Ok"
        inverted color='green'
      />
    );

    const MessageError = () => (
      <Message warning>
        <Message.Header>{t('messages:justError.headline')}</Message.Header>
          <p>{t('messages:justError.desc')}</p>
      </Message>
    );

    const MessageListeningPrivate = () => (
      <Message warning>
        <Message.Header>{t('messages:listeningPrivate.headline')}</Message.Header>
        <p>{t('messages:listeningPrivate.desc')}</p>
      </Message>
    );

    const MessageOwnerListeningPrivate = () => (
      <Message info>
        <Message.Header>{t('messages:ownerListeningPrivate.headline')}</Message.Header>
        <p>{t('messages:ownerListeningPrivate.desc')}</p>
      </Message>
    );

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

        const master = Meteor.user() ? Meteor.user().profile.master : "";
        /* Reverse "rs" to "sr" for moment (sorry) */
        const currentLang = i18n.language == "rs" ? "sr" : i18n.language;
        const listeningLastChange = moment(data.listening.listeningTech.lastChangeDate).locale(currentLang).format('LL');
        const listeningDesc = data.listening.listeningInfo.desc;
        const listeningViews = data.listening.listeningTech.views;
        const listeningHeadline = data.listening.listeningInfo.headline;
        const listeningPrice = data.listening.listeningInfo.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        const listeningPeriod = data.listening.listeningInfo.paymentPeriod;
        const listeningsPhotos = data.listening.listeningPhotos;
        const listeningCountry = data.listening.listeningInfo.country;
        const listeningCity = data.listening.listeningInfo.city;
        const listeningFloor = data.listening.listeningInfo.floor;
        const listeningBedrooms = data.listening.listeningInfo.bedrooms;
        const listeningBathrooms = data.listening.listeningInfo.bathrooms;
        const listeningRatio = data.listening.listeningInfo.ratio;
        const listeningComfortList = data.listening.listeningInfo.comfortList;
        const listeningType = data.listening.listeningInfo.comfortList;
        const listeningPublic = data.listening.listeningTech.public;
        const listeningContacts = data.listening.listeningContacts;
        const listeningTypeDeal = data.listening.listeningInfo.typeDeal;
        const listeningTypeProperty = data.listening.listeningInfo.typeProperty;
        const listeningStatusCode = data.listening.listeningTech.statusCode;
        const listeningOptions = [
          { optionName: t('createListing.country.label'), optionValue: t('countries.' + listeningCountry) },
          { optionName: t('createListing.city.label'), optionValue: t('cities.' + listeningCity) },
          { optionName: t('createListing.typeProperty.label'), optionValue: t('typeProperty.' + listeningTypeProperty) },
          { optionName: t('createListing.typeDeal.label'), optionValue: t('typeDeal.' + listeningTypeDeal)},
          { optionName: t('createListing.square.label'), optionValue: listeningRatio + " m²" },
          { optionName: t('createListing.floor.label'), optionValue: listeningFloor },
          { optionName: t('createListing.bedrooms.label'), optionValue: listeningBedrooms },
          { optionName: t('createListing.bathrooms.label'), optionValue: listeningBathrooms },
        ];
        if(listeningPublic == false
            && data.owner._id !== Meteor.userId()
            && !master) {
          /* If listening hidden by autor */
          return (
            <MessageListeningPrivate/>
          );
        };

        return (
          <div>
            <Helmet>
              <title>{listeningHeadline+" "+t('head:titles.app')}</title>
            </Helmet>
            <div className="listening-breadcrumbs">
              <div className="listening-breadcrumbs__item">
                <BackBtn />
                {master && listeningStatusCode == 2 ? <ApproveBtn /> : null}
              </div>
            </div>
            {!listeningPublic ?
              <MessageOwnerListeningPrivate/>
            : null}
            <div className="listening-media">
              <div className="listening-media__item">
                <ListeningPhotos photos={listeningsPhotos}/>
              </div>
            </div>
            <div className="listening-info">
              <div className="listening-info-header">
                <div className="listening-info-header__item listening-info-header__item_headline">
                  <h1 className="large-headline">{listeningHeadline}</h1>
                  <div className="listening-subinfo">
                    <div className="listening-subinfo__item">
                      <div className="listening-subinfo-icon">
                        <svg className="ico-event" role="img">
                          <use xlinkHref="#ico-event" />
                        </svg>
                      </div>
                      <div className="listening-subinfo-text">{listeningLastChange}</div>
                    </div>
                    <div className="listening-subinfo__item">
                      <div className="listening-subinfo-icon">
                        <svg className="ico-eye" role="img">
                          <use xlinkHref="#ico-eye" />
                        </svg>
                      </div>
                      <div className="listening-subinfo-text">{listeningViews}</div>
                    </div>
                  </div>
                </div>
                <div className="listening-info-header__item listening-info-header__item_price">
                  <div className="price">
                    <div className="price__text">
                      {listeningPrice}
                      <div className="currency">
                        <svg className="ico-euro" role="img">
                          <use xlinkHref="#ico-euro" />
                        </svg>
                      </div>
                    </div>
                    <div className="price__desc">{t('paymentPeriod.' + listeningPeriod)}</div>
                  </div>
                </div>
              </div>
              <div className="listening-info-profile">
                <Profile data={data.owner}/>
              </div>
              <ListeningOptions options={listeningOptions} />
              <ListeningComfort comforts={listeningComfortList} />
              {listeningDesc ? <div className="listening-info-block">
                <h2 className="medium-headline">{t('listening.desc')}</h2>
                <div className="listening-info-block__item">
                  <p className="large-parag">{listeningDesc}</p>
                </div>
              </div> : null}
              <ListeningContacts contacts={listeningContacts} />
              <div className="listening-info-footer">
                <div className="listening-info-footer__item">
                  <div className="listening-info-actions">
                    <div className="listening-info-actions__item">
                      <FavoriteBtn listeningId={this.props.listeningId} isFavorite={this.props.isFavorite}/>
                    </div>
                    <div className="listening-info-actions__item">
                      <PrintBtn />
                    </div>
                  </div>
                </div>
                <div className="listening-info-footer__item">
                  {/*<div className="share">
                    <div className="share__item share__item_text">Поделиться:</div>
                    <a className="share__item share__item_fb" href={
                      "https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer"
                    } target="_blank" />
                    <a className="share__item share__item_vk" href={
                      "http://vk.com/share.php?url="+window.location.href +
                      "&image="+listeningsPhotos.main +
                      "&title="+listeningHeadline +
                      "&description=" + listeningDesc
                    } target="_blank" />
                    <a className="share__item share__item_twitter" href={
                      "https://twitter.com/intent/tweet" +
                      "?text="+listeningHeadline+
                      "&hashtags=montenegro,bobotov" +
                      "&url=" + window.location.href
                    } target="_blank" />
                    <a className="share__item share__item_gplus" href={
                      "https://plus.google.com/share?url="+window.location.href
                    } target="_blank" />
                  </div>*/}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <MessageError/>
        );
      }
    } else {
      return (
        <Loading />
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

}, translate('common', { wait: true }) (Listening) );

Listening.propTypes = {
  loading: React.PropTypes.bool,
  listening: React.PropTypes.object,
  owner : React.PropTypes.object,
  isFavorite : React.PropTypes.bool
};
