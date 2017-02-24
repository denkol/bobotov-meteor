import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Dimmer, Loader, Form, Message, Input, Dropdown, Select, Button } from 'semantic-ui-react';
import PanelPhoto from '../../panel-photo/PanelPhoto.jsx';

const statuses = [
  { key: 'ag', value: 'agency', text: 'Агенство недвижимости' },
  { key: 'us', value: 'user', text: 'Пользователь'},
  { key: 'm',  value: 'realtor', text: 'Риэлтор'},
];

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
      },
      usernameInput: {
        editing: false
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // this.saveToHistory({id: this.props.listeningId}); //save to history
  }
  componentWillUnmount() {
    delete Session.keys['avatar-uploaded']
    delete Session.keys['avatar-allready']
  }
  handleSubmit(e, { formData }) {
    e.preventDefault();
    let userName = formData.userName.trim() + "";
    let userDesc = formData.userDesc.trim() + "";
    let userPhoto = Session.get('avatar-uploaded') ? Session.get('avatar-uploaded') : Meteor.user().profile.userPhoto;
    let data = {
      userName: userName,
      userDesc: userDesc,
      userPhoto: userPhoto,
    }
    console.log(data)
    if(formData) {
      Meteor.call('userUpdate', data, (err, res) => {
        if(err) {console.log(err)}
        else {
          console.log(res)
        }
      });
    }
  }
  render() {
    const { formData, value } = this.state;
    let currentUser = this.props.currentUser;
    
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
      return (
        <div>
          <div className="panel-wrapper">
            <div className="panel-header">
              {/*<div className="panel-header-balance">
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
              </div>*/}
            </div>
            <PanelPhoto photoUrl={userPhoto} />
            <div className="panel-body">
              <div className="panel-body-content">
                <div className="panel-body-menu">
                  <div className="panel-body-menu__item panel-body-menu__item--active">Общая информация</div>
                  {/*<div className="panel-body-menu__item">История платежей</div>*/}
                </div>
                <Form onSubmit={this.handleSubmit}>
                  <div className="panel-body-menucontent">
                    <div className="panel-headline">
                      <div className="panel-headline__headline">
                      </div>
                      <div className="panel-headline__desc"></div>
                    </div>
                    <div className="panel-inputs">
                      <div className="panel-inputs__item">
                        <Form.Input label="Ваше имя" name="userName" placeholder='Введите ваше имя' defaultValue={userName} required />
                      </div>
                      <div className="panel-inputs__item">
                        <Form.Select label='Ваш статус' name='userDesc' options={statuses} defaultValue={userDesc} required placeholder='Выберите статус' />
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
  return {currentUser}
}, Panel);