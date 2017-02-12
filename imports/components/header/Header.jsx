import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import FacebookProvider, { Like } from 'react-facebook';
import { FlowRouter } from 'meteor/kadira:flow-router';
//Components
import Profile from '../profile/Profile.jsx';

/* Semantic UI */
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class HeaderLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuOpen: false,
      exitModalOpen: false
    }
    this.openSubmenu = this.openSubmenu.bind(this);
    this.logout = this.logout.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toCreate = this.toCreate.bind(this);
    this.toPanel = this.toPanel.bind(this);
  }

  componentDidMount() {
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.8&appId=695731333928670";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  }
  openSubmenu(e) {
    var container = $('.profile-menu')
    if (!container.is(e.target) // if the target of the click isn't the container...
      && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        this.setState({
          subMenuOpen: false
        });
    }
    this.setState({
      subMenuOpen: !this.state.subMenuOpen
    });
    
  }
  logout() {
    this.setState({subMenuOpen: false});
    Meteor.logout();
    FlowRouter.go('/');
  }
  toPanel() {
    FlowRouter.go('/panel');
  }
  toCreate() {
    FlowRouter.go('/create');
  }
  closeModal() {
    this.setState({subMenuOpen: false, exitModalOpen: false});
  }
  render() {  
    let user = this.props.user;
    const ModalBasicExample = () => (
      <Modal trigger={<li className="profile-menu__item">Выйти</li>} basic size='small'>
        <Header content='Выход из аккаунта' />
        <Modal.Content>
          <p>Вы действительно хотите выйти?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' onClick={this.closeModal} inverted>
            <Icon name='remove' /> Нет
          </Button>
          <Button color='green' onClick={this.logout} inverted>
            <Icon name='checkmark' /> Да
          </Button>
        </Modal.Actions>
      </Modal>
    );

    return (
      <header className="layout-header">
        <div className="interface-width">
          <div className="header-content">
            <div className="header-content__item">
              <a className="header-logo" href="/">
                <div className="header-logo__item">
                  <div className="header-logo-img"><img src="/img/logo100x100.png" alt="logo.png" /></div>
                </div>
                <div className="header-logo__item">
                  <div className="header-logo-name">bobotov</div>
                  <div className="header-logo-desc">Montenegro</div>
                </div>
              </a>
              <div className="header-menu">
                <div>
                  <div className="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="standard" data-action="recommend" data-size="small" data-show-faces="false" data-share="false"></div>
                </div>
                {/*<div className="header-menu__item header-menu__item--active">Объявления о недвижимости</div> */}
              </div>
            </div>
            <div className="header-content__item">
              <div className="header-controls">
                {user
                  ? 
                  <div className="header-controls__item">
                    <Profile onClick={this.openSubmenu} data={user}/>
                    <div className={this.state.subMenuOpen ? "profile-menu-content profile-menu-content--expanded" : "profile-menu-content"}>
                      <ul className="profile-menu">
                        <li onClick={this.toPanel} className="profile-menu__item">Панель управления</li>
                        <ModalBasicExample />
                      </ul>
                    </div>
                  </div>
                  :
                  <div className="header-controls__item">
                    <a href="/signin">
                      <button className="simple-btn simple-btn_blue">Войти</button>
                    </a>
                  </div>
                }
                <div className="header-controls__item">
                  <button onClick={this.toCreate} className="simple-btn simple-btn_add">Добавить объявление</button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </header>
    );
  }
}

export default createContainer(({ params }) => {
  const user = Meteor.user();

  return {user}
}, HeaderLayout);


HeaderLayout.propTypes = {};


