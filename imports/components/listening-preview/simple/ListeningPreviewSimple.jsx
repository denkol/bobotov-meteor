import React, { Component, PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Translate } from '../../../functions/functions.js';
import { PaymentPeriod, TypeProperty, TypeDeal, Cities, Countries, ComfortList} from '../../../data/data.js';

import { Checkbox, Button } from 'semantic-ui-react';
import Snackbar from '../../snackbar/Snackbar.jsx';

export default class ListeningPreviewSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar : {
        open: false,
        message: "",
      }
    }
    this.publishTrigger = this.publishTrigger.bind(this);
    this.toListeningPage = this.toListeningPage.bind(this);
    this.remove = this.remove.bind(this);
  }
  toListeningPage() {
    FlowRouter.go('/listening/' + this.props.data._id);
  }
  edit() {
    console.log('Edit clicked')
  }
  remove() {
    let id = this.props.data._id;
    let list = this.props.layout;
    Meteor.call('removeFromList', id, list, (err, res)=> {
      if(err) {console.log(err)}
      if(res) {
        console.log('listening removed from Favorite');
      }
    });
  }
  publishTrigger(event, data) {
    let message = data.checked ? "Объявление включено" : "Объявление выключено"
    this.setState({
      snackbar: {
        open: true,
        message: message
      }
    })
  }
  render() {
    if(this.props.data) {
      let listeningLink = '/listening/' + this.props.data._id;
      let listeningMainPhoto = this.props.data.listeningPhotos.main ? this.props.data.listeningPhotos.main : "/img/no_photo.svg";
      let listeningHeadline = this.props.data.listeningInfo.headline;
      let listeningAutorName = this.props.data.listeningTech.ownerName;
      let listeningDate = this.props.data.listeningTech.lastChangeDate + "";
      let listeningPrice = this.props.data.listeningInfo.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      let listeningPaymentPeriod = this.props.data.listeningInfo.paymentPeriod;
      let listeningCity = this.props.data.listeningInfo.city;
      let listeningCountry = this.props.data.listeningInfo.country;
      let listeningRatio = this.props.data.listeningInfo.ratio;
      let listeningPropertyType = this.props.data.listeningInfo.typeProperty;
      let listeningTypeDeal = this.props.data.listeningInfo.typeDeal;
      let listeningViews = this.props.data.listeningTech.views;
      return (
        <div className="listening-preview-simple">
          <Snackbar open={this.state.snackbar.open} message={this.state.snackbar.message} />
          <div className="listening-preview-simple__photo-block">
            <a href={listeningLink}>
              <div className="preview-simple-photo" style={{backgroundImage: "url("+listeningMainPhoto+")"}}/>
            </a>
          </div>
          <div className="listening-preview-simple__headline-block">
            <div className="preview-simple-headline">
              <a href={listeningLink} className="preview-simple-headline__head">{listeningHeadline}</a>
              <div className="preview-simple-headline__desc">{listeningCity}, {listeningCountry}</div>
            </div>
          </div>
          <div className="listening-preview-simple__items-block">
          </div> 
          {/*<div className="listening-preview-simple__price-block">
            <div className="price">
              <div className="price__text">
                {listeningPrice}
                <div className="currency">
                  <svg className="ico-euro" role="img">
                    <use xlinkHref="#ico-euro" />
                  </svg>
                </div>
              </div>
              <div className="price__desc">{listeningPaymentPeriod}</div>
            </div>
          </div>*/}
          {this.props.layout !== "history" ? <div className="listening-preview-simple__control-block">
            <div className="remove-icon" onClick={this.remove}>
              <div className="remove-icon__icon">
                <svg className="ico-remove" role="img">
                  <use xlinkHref="#ico-remove" />
                </svg>
              </div>
            </div>
          </div> : null}

        </div>
      );
    } else {
      return ( 
        <div className="listening-preview-simple" style={{pointerEvents: "none"}}>
          <div className="listening-preview-simple__photo-block">
            <a>
              <div className="preview-simple-photo"/>
            </a>
          </div>
          <div className="listening-preview-simple__headline-block">
            <div className="preview-simple-headline">
              <a className="preview-simple-headline__head">Объявление недоступно</a>
              <div className="preview-simple-headline__desc"></div>
            </div>
          </div>
          <div className="listening-preview-simple__items-block">
          </div> 
          {/*<div className="listening-preview-simple__price-block">
            <div className="price">
              <div className="price__text">
                {listeningPrice}
                <div className="currency">
                  <svg className="ico-euro" role="img">
                    <use xlinkHref="#ico-euro" />
                  </svg>
                </div>
              </div>
              <div className="price__desc">{listeningPaymentPeriod}</div>
            </div>
          </div>*/}
          <div className="listening-preview-simple__control-block">
            <div className="remove-icon" onClick={this.remove}>
              <div className="remove-icon__icon">
                <svg className="ico-remove" role="img">
                  <use xlinkHref="#ico-remove" />
                </svg>
              </div>
            </div>
          </div>
        </div>);
    }
  }
}

ListeningPreviewSimple.propTypes = {
  data: React.PropTypes.object
};