import React, { Component, PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Translate } from '../../../functions/functions.js';
import { PaymentPeriod, TypeProperty, TypeDeal, Cities, Countries, ComfortList} from '../../../data/data.js';

export default class ListeningPreviewIndex extends Component {
  constructor(props) {
    super(props);
    this.toListeningPage = this.toListeningPage.bind(this);
  }
  toListeningPage() {
    FlowRouter.go('/listening/' + this.props.data._id);
  }
  translate(array, key) {
    if(array && key) {
      var returnText = "";
      for(var i = 0; i < array.length; i++) {
        var arrayValue = array[i].value;
        var arrayText = array[i].text;
        if(key === arrayValue) {
          returnText = arrayText;
        }
      }
      if(returnText) {
        return returnText;
      } else {
        return key;
      }
    } else {
      return false;
    }
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
      return(
        <div onClick={this.toListeningPage} className="listening-preview" style={{backgroundImage: 'url('+listeningMainPhoto+')'}}>
          <div className="listening-preview-header">
            <div className="listening-preview-header__item">
              <div className="listening-preview-headline">
                <div className="listening-preview-headline__text">{listeningHeadline}</div>
                <div className="listening-preview-headline__desc">{Translate(Cities, listeningCity)}, {Translate(Countries, listeningCountry)}</div>
              </div>
            </div>
            <div className="listening-preview-header__item">
              <div className="price">
                <div className="price__text">
                  {listeningPrice}
                  <div className="currency">
                    <svg className="ico-euro" role="img">
                      <use xlinkHref="#ico-euro" />
                    </svg>
                  </div>
                </div>
                <div className="price__desc">{ Translate(PaymentPeriod, listeningPaymentPeriod) }</div>
              </div>
            </div>
          </div>
          <div className="listening-preview-footer">
            <div className="listening-preview-footer__item">
              <div className="listening-preview-params">
                <div className="listening-preview-params__item"> 
                  <div className="params-icon">Тип предложения:</div>
                  <div className="params-text">{ Translate(TypeDeal, listeningTypeDeal) }</div>
                </div>
                <div className="listening-preview-params__item">
                  <div className="params-icon">Тип недвижимости:</div>
                  <div className="params-text">{ Translate(TypeProperty, listeningPropertyType) }</div>
                </div>
                <div className="listening-preview-params__item">
                  <div className="params-icon">Площадь:</div>
                  <div className="params-text">{listeningRatio} m²</div>
                </div>
                <div className="listening-preview-params__item" />
              </div>
            </div>
            <div className="listening-preview-footer__item">
              <div className="listening-preview-more">Подробнее</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div>Loading...</div>);
    }
  }
}

ListeningPreviewIndex.propTypes = {
  data: React.PropTypes.object
};