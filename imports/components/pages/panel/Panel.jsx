/* React libs */
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { translate } from 'react-i18next';
import { Helmet } from "react-helmet";

/* Meteor libs */
import { createContainer } from 'meteor/react-meteor-data';
import { Random } from 'meteor/random';

/* Components */
import PanelPhoto from '../../panel-photo/PanelPhoto.jsx';

/* Tranlate & Data */
import { UserStatuses } from '../../../data/data.js';
import { Translate } from '../../../functions/functions.js';

/* Semantic UI */
import { Dimmer, Loader, Form, Message, Input, Dropdown, Select, Button } from 'semantic-ui-react';

/* Other */
import Snackbar from 'material-ui/Snackbar';



class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validation: {
        username: '',
        message: ''
      },
      snackbar: {
        open: false,
        message: ""
      }
    }
    this.snackbarClose = this.snackbarClose.bind(this);
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

  userStatuses() {
    const { t } = this.props
    return UserStatuses.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`userStatuses.${value}`)
    }))
  }

  handleSubmit(e, { formData }) {
    e.preventDefault();
    
    const { t } = this.props;
    
    const userName = formData.userName.trim();
    const userDesc = formData.userDesc;
    const userPhoto = Session.get('avatar-uploaded') ? Session.get('avatar-uploaded') : Meteor.user().profile.userPhoto;
    const data = { userName, userDesc, userPhoto };
    


    
    const validation = {
      username: '',
      message: ''
    };

    this.setState({ validation });
    

    if (userName.length < 3) {
      this.setState({
        snackbar: {
          open: true,
          message: t('messages:dinamiclyErrors.userNameLength')
        }
      });
      validation.username = true;
      return this.Check(validation);
    }

    Meteor.call('userUpdate', data, (err, res) => {
      const { validation } = this.state;
      this.setState({
        snackbar: {
          open: true,
          message: t('messages:dinamiclyErrors.dataSaved')
        }
      });

      if(err) {
        validation.message = err.message;
        return this.Check(validation);
      }
    });
  }
  snackbarClose() {
    this.setState({
      snackbar: {
        open: false,
        message: ""
      }
    })
  }
  render() {
    const { t, currentUser } = this.props;
    const userId = Meteor.userId();
    const { username, message } = this.state.validation;
    
    if(!userId) {
      return (
        <Message info
          header={t('messages:needLogin.headline')} 
          content={t('messages:needLogin.desc')} />
      );
    }

    if(currentUser) {
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
          <Helmet>
            <title>{t('head:titles.panel')+" "+t('head:titles.app')}</title>
          </Helmet>
          <Snackbar
            open={this.state.snackbar.open}
            message={this.state.snackbar.message}
            autoHideDuration={4000}
            onRequestClose={this.snackbarClose}
          />
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
                    <div className="panel-headline">
                      <div className="panel-headline__headline">
                      </div>
                      <div className="panel-headline__desc"></div>
                    </div>
                    <div className="panel-inputs">
                      <div className="panel-inputs__item">
                        <Form.Input label={t('panel.name.label')} name="userName" placeholder={t('panel.name.placeholder')} defaultValue={userName} error={Boolean(username)} required />
                      </div>
                      <div className="panel-inputs__item">
                        <Form.Select label={t('panel.status.label')} name='userDesc' options={this.userStatuses()} defaultValue={userDesc} required />
                      </div>
                    </div>
                    <div className="panel-controls">
                      <div className="panel-controls__item">
                        <Button type="submit" primary>{t('panel.saveBtn')}</Button>
                      </div>
                      <div className="panel-controls__item">{t('panel.helpMessage')}</div>
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
}, translate('common', { wait: true })(Panel));