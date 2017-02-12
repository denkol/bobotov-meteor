import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Message, Input, Dropdown } from 'semantic-ui-react';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    // this.saveToHistory({id: this.props.listeningId}); //save to history
  }

  render() {
    let currentUser = this.props.currentUser;
    if(this.props.currentUser && Meteor.userId()) {
      const userPhoto = currentUser.profile.userPhoto;
      const userName = currentUser.profile.userName;
      const userDesc = currentUser.profile.userDesc;
      const languages = [
        {key: 'SR', value: 'SR', text: 'Сербский'},
        {key: 'RU', value: 'RU', text: 'Русский'},
        {key: 'EN', value: 'EN', text: 'Английский'},
      ];
      return (
        <div>
          <div className="panel-wrapper">
            <div className="panel-header">
              <div className="panel-header-balance">
                <div className="panel-header-balance__top">
                  <div className="balance-icon">
                    <svg className="ico-card" role="img">
                      <use xlinkHref="#ico-card" />
                    </svg>
                  </div>
                  <div className="balance-text">
                    <div className="balance-text__text">На счету: </div>
                    <div className="balance-text__sum">12
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
            </div>
            <div className="panel-photo">
              <div className="panel-photo__item" style={{backgroundImage: "url("+userPhoto+")"}}/>
              <div className="panel-photo__control">
                <div className="panel-photo-add">Загрузить</div>
                <div className="panel-photo-remove">Удалить</div>
              </div>
            </div>
            <div className="panel-body">
              <div className="panel-body-content">
                <div className="panel-body-menu">
                  <div className="panel-body-menu__item panel-body-menu__item--active">Общая информация</div>
                  <div className="panel-body-menu__item">История платежей</div>
                </div>
                <div className="panel-body-menucontent">
                  <div className="panel-headline">
                    <div className="panel-headline__headline">{userName}</div>
                    <div className="panel-headline__desc">{userDesc}</div>
                  </div>
                  <div className="panel-inputs">
                    
                  </div>
                  <div className="panel-controls">
                    <div className="panel-controls__item">
                      <button className="simple-btn simple-btn_blue">Сохранить</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Message info>
          <Message.Header>У вас еще нет профиля на Bobotov?</Message.Header>
          <p>Создайте его нажав на кнопку в верхней части экрана</p>
        </Message>
      );
    }
  }
}

Panel.propTypes = {};

export default createContainer(({ params }) => {
  const currentUser = Meteor.user();
  return {currentUser}
}, Panel);