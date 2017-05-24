import React, { Component, PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
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
    Meteor.call('removeFromList', id, 'favorites', (err, res)=> {
      if(err) {console.log(err)}
      if(res) {}
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
      const listeningLink = '/listening/' + this.props.data._id;
      const listeningMainPhoto = this.props.data.listeningPhotos.main ? this.props.data.listeningPhotos.main : "/img/no_photo.svg";
      const listeningHeadline = this.props.data.listeningInfo.headline;
      const listeningAutorName = this.props.data.listeningTech.ownerName;
      const listeningDate = this.props.data.listeningTech.lastChangeDate + "";
      const listeningPrice = this.props.data.listeningInfo.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      const listeningPaymentPeriod = this.props.data.listeningInfo.paymentPeriod;
      const listeningCity = this.props.data.listeningInfo.city;
      const listeningCountry = this.props.data.listeningInfo.country;
      const listeningRatio = this.props.data.listeningInfo.ratio;
      const listeningPropertyType = this.props.data.listeningInfo.typeProperty;
      const listeningTypeDeal = this.props.data.listeningInfo.typeDeal;
      const listeningViews = this.props.data.listeningTech.views;
      return (
        <div>
          <Snackbar open={this.state.snackbar.open} message={this.state.snackbar.message} />
          <div className="listening-preview-simple ">
            <div className="listening-preview-simple__item">
              <div className="listening-preview-simple__photo-block">
                <a href={listeningLink}>
                  <div className="preview-simple-photo" style={{backgroundImage: "url("+listeningMainPhoto+")"}}/>
                </a>
              </div>
              <div className="listening-preview-simple__headline-block">
                <div className="preview-simple-headline">
                  <a href={listeningLink} className="preview-simple-headline__head">{listeningHeadline}</a>
                  <div className="preview-simple-headline__desc">{Translate(Cities, listeningCity)}, {Translate(Countries, listeningCountry)}</div>
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
                  <div className="price__desc">{Translate(PaymentPeriod, listeningPaymentPeriod)}</div>
                </div>
              </div>
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
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}

ListeningPreviewSimple.propTypes = {
  data: React.PropTypes.object
};
