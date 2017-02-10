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
        <div>{listeningHeadline}</div>
      );
    } else {
      return (<div>Loading...</div>);
    }
  }
}

ListeningPreviewSimple.propTypes = {
  data: React.PropTypes.object
};