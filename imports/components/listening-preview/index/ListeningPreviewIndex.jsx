import React, { Component, PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class ListeningPreviewIndex extends Component {
  constructor(props) {
    super(props);
    this.toListeningPage = this.toListeningPage.bind(this);
  }
  toListeningPage() {
    FlowRouter.go('/listening/' + this.props.data._id);
  }
  render() {
    if(this.props.data) {
      let listeningLink = '/listening/' + this.props.data._id;
      let listeningMainPhoto = this.props.data.listeningPhotos.main ? this.props.data.listeningPhotos.main : "/img/no_photo.svg";
      let listeningHeadline = this.props.data.listeningInfo.headline;
      let listeningAutorName = this.props.data.listeningTech.ownerName;
      let listeningDate = this.props.data.listeningTech.lastChangeDate + "";
      let listeningPrice = this.props.data.listeningInfo.price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
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
                <div className="listening-preview-headline__desc">{listeningCity}, {listeningCountry}</div>
              </div>
            </div>
            <div className="listening-preview-header__item">
              <div className="price">
                <div className="price__text">
                  <div className="currency">
                    <svg className="ico-euro" role="img">
                      <use xlinkHref="#ico-euro" />
                    </svg>
                  </div>{listeningPrice}
                </div>
                <div className="price__desc">В месяц</div>
              </div>
            </div>
          </div>
          <div className="listening-preview-footer">
            <div className="listening-preview-footer__item">
              <div className="listening-preview-params">
                <div className="listening-preview-params__item"> 
                  <div className="params-icon">Тип предложения:</div>
                  <div className="params-text">Аренда</div>
                </div>
                <div className="listening-preview-params__item">
                  <div className="params-icon">Срок:</div>
                  <div className="params-text">На год</div>
                </div>
                <div className="listening-preview-params__item">
                  <div className="params-icon">Тип недвижимости:</div>
                  <div className="params-text">Аппартаменты</div>
                </div>
                <div className="listening-preview-params__item">
                  <div className="params-icon">Площадь:</div>
                  <div className="params-text">32 кв.м</div>
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