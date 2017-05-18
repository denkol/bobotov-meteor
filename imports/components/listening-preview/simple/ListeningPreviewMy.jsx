import React, { Component, PropTypes } from 'react';
import { translate } from 'react-i18next';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Checkbox, Button, Modal, Icon} from 'semantic-ui-react';
import { Translate } from '../../../functions/functions.js';
import { PaymentPeriod, TypeProperty, TypeDeal, Cities, Countries, ComfortList} from '../../../data/data.js';

// import Snackbar from '../../snackbar/Snackbar.jsx';


class ListeningPreviewMy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // snackbar : {
      //   open: false,
      //   message: "",
      // },
      modalOpen: false,
      listening: {
        public: this.props.data.listeningTech.public
      }
    }
    this.publishTrigger = this.publishTrigger.bind(this);
    this.toListeningPage = this.toListeningPage.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
  }
  toListeningPage() {
    FlowRouter.go('/listening/' + this.props.data._id);
  }
  modalOpen() {
    this.setState({
      modalOpen: true,
    })
  }
  modalClose() {
    this.setState({
      modalOpen: false,
    })
  }
  edit() {
    let listeningId = this.props.data._id;
    FlowRouter.go('/edit/' + listeningId);
  }
  remove() {
    let id = this.props.data._id;
    Meteor.call('listeningRemove', id, (err, res) => {
      if(err) {
        this.setState({
          modalOpen: false
        });
      }
      if(res) {
        this.setState({
          modalOpen: false
        });
      }
    });
  }
  publishTrigger(event, data) {
    // let message = data.checked ? "Объявление включено" : "Объявление выключено"
    let publicNow = data.checked;
    let listeningId = this.props.data._id;

    Meteor.call('listeningChangeStatus', listeningId, (err, res) => {
      if(err) {
        console.log(err)
      };
      if(res) {
        this.setState({
          // snackbar: {
          //   open: publicNow,
          //   message: message
          // },
          listening: {
            public: publicNow
          }
        });
      };
    });
  }
  render() {
    const { t } = this.props;
    if(this.props.data) {
      const listeningLink = '/listening/' + this.props.data._id;
      const listeningEditLink = '/edit/' + this.props.data._id;
      const listeningMainPhoto = this.props.data.listeningPhotos.main ? this.props.data.listeningPhotos.main : "/img/no_photo.svg";
      const listeningHeadline = this.props.data.listeningInfo.headline;
      const listeningCity = this.props.data.listeningInfo.city;
      const listeningCountry = this.props.data.listeningInfo.country;
      const listeningViews = this.props.data.listeningTech.views;
      const listeningFavoritesCount = this.props.data.listeningTech.favoritesCount;
      const listeningPublic = this.props.data.listeningTech.public;
      const listeningStatusCode = this.props.data.listeningTech.statusCode;
      
      const CheckboxEnableDisable = () => (
        <Checkbox 
          checked={listeningPublic} 
          toggle 
          onChange={this.publishTrigger}
          disabled={listeningStatusCode === 2 ? true : false}
        />
      );

      const DeleteModal = () => (
        <Modal 
          trigger = {
            <div className="remove-icon" onClick={this.modalOpen}>
              <div className="remove-icon__icon">
                <svg className="ico-remove" role="img">
                  <use xlinkHref="#ico-remove" />
                </svg>
              </div>
            </div>
          }
          open={this.state.modalOpen}
          onClose={this.modalClose}
          basic
          size='small'
        >
          <Modal.Content>
            <h3>{t("modals:modalDeleteListening.content")} "{listeningHeadline}" ?</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={this.modalClose} inverted>
              <Icon name='close' /> {t("modals:modalDeleteListening.btnCancel")}
            </Button>
            <Button color='green' onClick={this.remove} inverted>
              <Icon name='checkmark' /> {t("modals:modalDeleteListening.btnOk")}
            </Button>
          </Modal.Actions>
        </Modal>
      );
      return (
        <div>
          <div className="listening-preview-simple">
            <div className="listening-preview-simple__item listening-preview-simple__item_name">
              <div className="listening-preview-simple__photo-block">
                <a href={listeningLink}>
                  <div className="preview-simple-photo" style={{backgroundImage: "url("+listeningMainPhoto+")"}}/>
                </a>
              </div>
              <div className="listening-preview-simple__headline-block">
                <div className="preview-simple-headline">
                  <a href={listeningLink} className="preview-simple-headline__head">{listeningHeadline}</a>
                  <div className="preview-simple-headline__desc">{t(`cities.${listeningCity}`)}, {t(`countries.${listeningCountry}`)}</div>
                </div>
              </div>
            </div>
            <div className="listening-preview-simple__item listening-preview-simple__item_controls">
              <div className="listening-preview-simple__items-block">
                <div className="preview-simple-items">
                  <div className="preview-simple-items__item">
                    <div className="views">
                      <div className="views__item">
                        <svg className="ico-love" role="img">
                          <use xlinkHref="#ico-love" />
                        </svg>
                      </div>
                      <div className="views__item">
                        <span>{listeningFavoritesCount}</span>
                      </div>
                    </div>
                  </div>
                  <div className="preview-simple-items__item">
                    <div className="views">
                      <div className="views__item">
                        <svg className="ico-eye" role="img">
                          <use xlinkHref="#ico-eye" />
                        </svg>
                      </div>
                      <div className="views__item">
                        <span>{listeningViews}</span>
                      </div>
                    </div>
                  </div>
                  <div className="preview-simple-items__item">
                    <CheckboxEnableDisable/>
                  </div>
                  <div className="preview-simple-items__item preview-simple-items__item_edit-icon" onClick={this.edit} >
                   <svg className="ico-edit" role="img">
                      <use xlinkHref="#ico-edit" />
                    </svg>
                  </div>
                </div>
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
                <DeleteModal />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}

ListeningPreviewMy.propTypes = {
  data: React.PropTypes.object
};

export default translate('common', { wait: true })(ListeningPreviewMy)