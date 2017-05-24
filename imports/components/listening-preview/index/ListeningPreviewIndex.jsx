/* React libs */
import React, { Component, PropTypes } from 'react';
import { translate } from 'react-i18next';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';

/* Meteor libs */

/* Components */

/* Some functions */
import { Translate } from '../../../functions/functions.js';
import { PaymentPeriod, TypeProperty, TypeDeal, Cities, Countries, ComfortList} from '../../../data/data.js';

/* Semantic UI */


/* Material UI */

/* Other */

class ListeningPreviewIndex extends Component {
  constructor(props) {
    super(props);
    this.toListeningPage = this.toListeningPage.bind(this);
  }
  toListeningPage() {
    FlowRouter.go('/listening/' + this.props.data._id);
  }

  render() {
    const { t } = this.props

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
      let listeningBonuses = this.props.data.listeningTech.bonuses;

      function defineBonusClass() {
        /* Какой бонус есть у объявления? */
        if(listeningBonuses.bonus1) {
          return "listening-preview--bonus1";
        }
        if(listeningBonuses.bonus2) {
          return "listening-preview--bonus2";
        }
        return "";
      }

      return(
        <div onClick={this.toListeningPage} className="listening-preview" style={{backgroundImage: 'url('+listeningMainPhoto+')'}}>
          <div className="listening-preview-header">
            <div className="listening-preview-header__item listening-preview-header__item_headline">
              <div className="listening-preview-headline">
                <div className="listening-preview-headline__text">{listeningHeadline}</div>
                <div className="listening-preview-headline__desc">
                  {t(`cities.${listeningCity}`)}, {t(`countries.${listeningCountry}`)}
                </div>
              </div>
            </div>
            <div className="listening-preview-header__item listening-preview-header__item_price">
              <div className="price">
                <div className="price__text">
                  {listeningPrice}
                  <div className="currency">
                    <svg className="ico-euro" role="img">
                      <use xlinkHref="#ico-euro" />
                    </svg>
                  </div>
                </div>
                <div className="price__desc">{t(`paymentPeriod.${listeningPaymentPeriod}`)}</div>
              </div>
            </div>
          </div>
          <div className="listening-preview-footer">
            <div className="listening-preview-footer__item">
              <div className="listening-preview-params">
                <div className="listening-preview-params__item">
                  <div className="params-icon">{t('filterListing.typeDeal.label')}:</div>
                  <div className="params-text">{t(`typeDeal.${listeningTypeDeal}`)}</div>
                </div>
                <div className="listening-preview-params__item">
                  <div className="params-icon">{t('filterListing.typeProperty.label')}:</div>
                  <div className="params-text">{t(`typeProperty.${listeningPropertyType}`)}</div>
                </div>
                <div className="listening-preview-params__item">
                  <div className="params-icon">{t('filterListing.square.label')}:</div>
                  <div className="params-text">{listeningRatio} m²</div>
                </div>
                <div className="listening-preview-params__item" />
              </div>
            </div>
            <div className="listening-preview-footer__item">
              <div className="listening-preview-more">{t('other.more')}</div>
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

export default translate('common', { wait: true })(ListeningPreviewIndex)
