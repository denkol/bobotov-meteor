import React, { Component, PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Checkbox, Button, Modal, Icon} from 'semantic-ui-react';

import Snackbar from '../../snackbar/Snackbar.jsx';


export default class ListeningPreviewMy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar : {
        open: false,
        message: "",
      },
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
          snackbar: {
            open: true,
            message: "Произошла ошибка, повторите попытку позже"
          },
          modalOpen: false
        });
      }
      if(res) {
        this.setState({
          snackbar: {
            open: true,
            message: "Объявление удалено"
          },
          modalOpen: false
        });
      }
    });
  }
  publishTrigger(event, data) {
    let message = data.checked ? "Объявление включено" : "Объявление выключено"
    let statusCode = data.checked ? 1 : 3;
    let publicNow = data.checked;
    let listeningId = this.props.data._id;
  
    
    

    Meteor.call('listeningChangeStatus', statusCode, listeningId, (err, res) => {
      if(err) {
        console.log(err)
      };
      if(res) {
        this.setState({
          snackbar: {
            open: publicNow,
            message: message
          },
          listening: {
            public: publicNow
          }
        });
      };
    });
  }
  render() {
    console.log(this.state)
    if(this.props.data) {
      let listeningLink = '/listening/' + this.props.data._id;
      let listeningEditLink = '/edit/' + this.props.data._id;
      let listeningMainPhoto = this.props.data.listeningPhotos.main ? this.props.data.listeningPhotos.main : "/img/no_photo.svg";
      let listeningHeadline = this.props.data.listeningInfo.headline;
      let listeningPrice = this.props.data.listeningInfo.price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      let listeningPaymentPeriod = this.props.data.listeningInfo.paymentPeriod;
      let listeningCity = this.props.data.listeningInfo.city;
      let listeningCountry = this.props.data.listeningInfo.country;
      let listeningViews = this.props.data.listeningTech.views;
      let listeningPublic = this.props.data.listeningTech.public;
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
            <div className="preview-simple-items">
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
                <Checkbox label="Включить" checked={listeningPublic} toggle onChange={this.publishTrigger}/>
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
                <h3>Удалить объявление "{listeningHeadline}" ?</h3>
              </Modal.Content>
              <Modal.Actions>
                <Button color='red' onClick={this.modalClose} inverted>
                  <Icon name='checkmark' /> Нет, оставить
                </Button>
                <Button color='green' onClick={this.remove} inverted>
                  <Icon name='checkmark' /> Да, удалить
                </Button>
              </Modal.Actions>
            </Modal>
            
          </div>

        </div>
      );
    } else {
      return (<div>Nothing</div>);
    }
  }
}

ListeningPreviewMy.propTypes = {
  data: React.PropTypes.object
};