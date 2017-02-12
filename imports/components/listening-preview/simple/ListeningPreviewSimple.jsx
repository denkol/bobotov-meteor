import React, { Component, PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class ListeningPreviewSimple extends Component {
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
      return (
        <div className="listening-preview-simple">
          <div className="listening-preview-simple__photo-block">
            <div className="preview-simple-photo" />
          </div>
          <div className="listening-preview-simple__headline-block">
            <div className="preview-simple-headline">
              <a href={listeningLink} className="preview-simple-headline__head">{listeningHeadline}</a>
              <div className="preview-simple-headline__desc">{listeningCity}, {listeningCountry}</div>
            </div>
          </div>
          <div className="listening-preview-simple__items-block">
            <div className="preview-simple-items">
              <div className="preview-simple-items__item">d</div>
              <div className="preview-simple-items__item">d</div>
              <div className="preview-simple-items__item">d</div>
            </div>
          </div>
          <div className="listening-preview-simple__price-block">
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
          </div>
          <div className="listening-preview-simple__control-block">
            <div className="remove-icon">
              <div className="remove-icon__icon">
                <svg className="ico-remove" role="img">
                  <use xlinkHref="#ico-remove" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div>Loading...</div>);
    }
  }
}

ListeningPreviewSimple.propTypes = {
  data: React.PropTypes.object
};