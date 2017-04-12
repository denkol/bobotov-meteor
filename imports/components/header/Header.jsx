import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
//Components
import Profile from '../profile/Profile.jsx';
/* Semantic UI */
import { Button, Header, Icon, Modal, Dropdown } from 'semantic-ui-react';

import i18n from '/imports/config/i18n'

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
  }

  openMobileMenu() {
    $('#mobile-menu').addClass('main-menu-wrapper--open');
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

  handleGo(path, e) {
    e.preventDefault();
    this.setState({subMenuOpen: false});
    FlowRouter.go(path);
  }

  closeModal() {
    this.setState({subMenuOpen: false, exitModalOpen: false});
  }

  render() {
    const { user, t } = this.props;
    const ExitModal = () => (
      <Modal trigger={<li className="profile-menu__item">{t('header.logout')}</li>} basic size='small'>
        <Header icon='log out' content={t('modal.title')} />
        <Modal.Content>
          <p>{t('modal.content')}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' onClick={this.closeModal} inverted>
            <Icon name='remove' />
            {t('modal.btnCancel')}
          </Button>
          <Button color='green' onClick={this.logout} inverted>
            <Icon name='checkmark' />
            {t('modal.btnOk')}
          </Button>
        </Modal.Actions>
      </Modal>
    );

    return (
      <header className="layout-header">
        <div className="interface-width">
          <div className="header-content">
            <div className="header-content__item">
              <button onClick={this.openMobileMenu} className="header-toggle">
                <div className="header-toggle__icon">
                </div>
              </button>
              <a className="header-logo" href="/">
                <div className="header-logo__item">
                  <div className="header-logo-img">
                    <img src="/img/logo100x100.png" alt="logo.png" />
                    <div id="glide" className="glide">
                      <div className="glide__shadow"></div>
                    </div>
                  </div>
                </div>
                <div className="header-logo__item">
                  <div className="header-logo-name">bobotov</div>
                  <div className="header-logo-desc">Montenegro</div>
                </div>
              </a>
              <nav className="header-menu">
                <ul>
                  <li className="header-menu__item">
                    <a href="/">{t('header.all')}</a>
                  </li>
                  <li className="header-menu__item">
                    <a href="/?typeDeal=rent_short">{t('header.rent')}</a>
                  </li>
                  <li className="header-menu__item">
                    <a href="/?typeDeal=sale">{t('header.sale')}</a>
                  </li>
                  <li className="header-menu__item">
                    <a href="/?typeDeal=bythesea">{t('header.bythesea')}</a>
                  </li>
                  <li className="header-menu__item">
                    <a href="/?typeDeal=rent_long">{t('header.foralongtime')}</a>
                  </li>
                  <li className="header-menu__item">
                    <a href="?typeDeal=forrelax">{t('header.forrelax')}</a>
                  </li>
                </ul>
                {/*<div className="header-menu__item header-menu__item--active">Объявления о недвижимости</div> */}
              </nav>
            </div>
            <div className="header-content__item">
              <div className="header-controls">
                {user
                  ?
                  <div className="header-controls__item">
                    <Profile onClick={this.openSubmenu} data={user}/>
                    <div className={this.state.subMenuOpen ? "profile-menu-content profile-menu-content--expanded" : "profile-menu-content"}>
                      <ul className="profile-menu">
                        <li onClick={this.handleGo.bind(this, '/panel')} className="profile-menu__item">{t('header.myprofile')}</li>
                        <li onClick={this.handleGo.bind(this, '/mylistenings')} className="profile-menu__item">{t('header.myadvs')}</li>
                        <ExitModal {...this.props} />
                      </ul>
                    </div>
                  </div>
                  :
                  <div className="header-controls__item header-controls__item_sign-buttons">
                    <a href="/signup">
                      <button className="transparent-btn">{t('header.signup')}</button>
                    </a>
                    <a href="/signin">
                      <button className="simple-btn simple-btn_blue">{t('header.signin')}</button>
                    </a>
                  </div>
                }
                {/*<div className="header-controls__item header-controls__item_add">
                  <Dropdown text={t(`common:toggleLng.${i18n.language}`)}>
                    <Dropdown.Menu>
                      <Dropdown.Item text={t('common:toggleLng.ru')} onClick={() => toggleLng('ru')} />
                      <Dropdown.Item text={t('common:toggleLng.en')} onClick={() => toggleLng('en')} />
                    </Dropdown.Menu>
                  </Dropdown>
                </div>*/}
                <div className="header-controls__item header-controls__item_add">
                  <button onClick={this.handleGo.bind(this, '/create')} className="simple-btn simple-btn_add">{t('header.addadv')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

HeaderLayout.propTypes = {

};

export default createContainer(({ params }) => {
  const user = Meteor.user();

  return {
    user
  }
}, translate('nav', { wait: true })(HeaderLayout));
