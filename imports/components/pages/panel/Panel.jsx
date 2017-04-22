/* React libs */
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/* Meteor libs */
import { createContainer } from 'meteor/react-meteor-data';

/* Components */
import PanelPhoto from '../../panel-photo/PanelPhoto.jsx';

/* Tranlate & Data */
import { UserStatuses } from '../../../data/data.js';
import { Translate } from '../../../functions/functions.js';

/* Semantic UI */
import { Dimmer, Loader, Form, Message, Input, Dropdown, Select, Button } from 'semantic-ui-react';

/* Other */
  //paste here


class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation: {
        username: '',
        message: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0); //scroll to top
  }
  componentWillUnmount() {
    Session.clear()
  }
  
  Check(validation) {
    this.setState({validation: Object.assign(this.state.validation, validation)});
  } 
  
  validationError() {
    const { username, message } = this.state.validation;
    if (username) {
      return username;
    } else if (message) {
      return message;
    };
  } 

  handleSubmit(e, { formData }) {
    e.preventDefault();
    const validation = {
      username: '',
      message: ''
    };
    this.setState({ validation });
    const userName = formData.userName.trim();
    const userDesc = formData.userDesc;
    const userPhoto = Session.get('avatar-uploaded') ? Session.get('avatar-uploaded') : Meteor.user().profile.userPhoto;
    
    if (userName.length < 3) {
      validation.username = "Имя пользователя слишком короткое!";
      return this.Check(validation);
    }
    
    const data = { userName, userDesc, userPhoto };

    Meteor.call('userUpdate', data, (err, res) => {
      const { validation } = this.state;
      if(err) {
        validation.message = err.message;
        return this.Check(validation);
      }
    });
  }
  
  render() {
    const { username, message } = this.state.validation;
    const currentUser = this.props.currentUser;
    
    if(!Meteor.userId()) {
      return (
        <Message info>
          <Message.Header>У вас еще нет профиля на Bobotov?</Message.Header>
          <p>Создайте его нажав на кнопку в верхней части экрана</p>
        </Message>
      );
    }

    if(this.props.currentUser) {
      const userPhoto = currentUser.profile.userPhoto ? currentUser.profile.userPhoto : '/img/unknown.jpg';
      const userName = currentUser.profile.userName;
      const userDesc = currentUser.profile.userDesc;

      const BalanceLayout = () => (
        <div className="panel-header-balance">
          <div className="panel-header-balance__top">
            <div className="balance-icon">
              <svg className="ico-card" role="img">
                <use xlinkHref="#ico-card" />
              </svg>
            </div>
           <div className="balance-text">
              <div className="balance-text__text">На счету: </div>
              <div className="balance-text__sum"> 12
                <svg className="ico-euro" role="img">
                  <use xlinkHref="#ico-euro" />
                </svg>
              </div>
            </div>
          </div>
          <div className="panel-header-balance__bottom">
            <div className="balance-up">Пополнить</div>
          </div>
        </div>
      );

      const PanelBodyMenu = () => (
        <div className="panel-body-menu">
          <a href="/panel" className="panel-body-menu__item panel-body-menu__item--active" title="Общая информация">Общая информация</a>
          <div className="panel-body-menu__item">История платежей</div>
        </div>
      );
      
      return (
        <div>
          <div className="panel-wrapper">
            <div className="panel-header">
              {/*<BalanceLayout />*/}
            </div>
            <PanelPhoto photoUrl={userPhoto} />
            <div className="panel-body">
              <div className="panel-body-content">
                {/*<PanelBodyMenu />*/}
                <Form onSubmit={this.handleSubmit}>
                  <div className="panel-body-menucontent">
                    <div className="login-item">
                      {this.validationError() ? 
                      <Message size='tiny' negative>
                        <Message.Header>{this.validationError()}</Message.Header>
                      </Message> : null}
                    </div>
                    <div className="panel-headline">
                      <div className="panel-headline__headline">
                      </div>
                      <div className="panel-headline__desc"></div>
                    </div>
                    <div className="panel-inputs">
                      <div className="panel-inputs__item">
                        <Form.Input label="Ваше имя" name="userName" placeholder='Введите ваше имя' defaultValue={userName} error={Boolean(username)} required />
                      </div>
                      <div className="panel-inputs__item">
                        <Form.Select label='Ваш статус' name='userDesc' options={UserStatuses} defaultValue={userDesc} required />
                      </div>
                    </div>
                    <div className="panel-controls">
                      <div className="panel-controls__item">
                        <Button type="submit" primary>Сохранить</Button>
                      </div>
                      <div className="panel-controls__item">Чтобы применить изменения нажмите эту кнопку</div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="panel-wrapper">
            <Dimmer active inverted>
              <Loader inverted content='Загрузка' />
            </Dimmer>
          </div>
        </div>
      );
    }
  }
}

Panel.propTypes = {};

export default createContainer(({ params }) => {
  const currentUser = Meteor.user();
  return {currentUser};
}, Panel);