/* React libs */
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { translate } from 'react-i18next';
/* Meteor libs */

/* Components */
import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';
import BtnLoadMore from '../../btn-loadmore/BtnLoadMore.jsx';
import Loading from '../../loading/Loading.jsx';

/* Some functions */
import { Listenings } from '../../../api/listenings.js';

/* Semantic UI */
import { Button, Message } from 'semantic-ui-react';

/* Material UI */

/* Other */

const limit = 9;

class Favorites extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      limit: limit,
      subscription: {
         listenings: Meteor.subscribe('listenings.public', {})
      }
    };
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0); //scroll to top
  }

  componentWillUnmount() {
    this.setState({limit: limit});
    this.state.subscription.listenings.stop();
  }

  loadMore() {
    this.setState({limit: this.state.limit + limit});
  }

  render() {
    const { t } = this.props;
    const user = Meteor.user();
    const favouritesList = user.profile.favoritesList;
    const query = { _id: { $in: favouritesList } };
    const listenings = Listenings.find(query, {limit: this.state.limit}).fetch();
    const Headline = () => (
      <div className="headline">
        <div className="headline__item">
          <div className="headline-icon">
            <div className="headline-icon__icon">
              <svg className="ico-love loved" role="img">
                <use xlinkHref="#ico-love"></use>
              </svg>
            </div>
            <div className="headline-icon__text">{t('favoritesPage.headline')}:</div>
          </div>
        </div>
      </div>
    );

    if(!user) {
      return (
        <Message 
          warning
          header='Войдите или зарегистрируйтесь'
          content='Избранные объявления доступны только авторизированным пользователям'
        />
      );
    }
    
    if(this.state.subscription.listenings.ready()) {
      if(listenings.length) {
        const listeningsTotal = Listenings.find(query).count() || 0;
        return (
          <div>
            <Headline />
            <div className="photo-grid">
              {listenings.map((listening, index) => {
                return (
                  <a href={"/listening/" + listening._id} key={"favouritesListItem" + index} className="photo-grid__item">
                    <ListeningPreview listeningData={listening} layout="index" />
                  </a>
                );
              })}
            </div>
              {(listeningsTotal > listenings.length) && <div className="paginate-wrapper">
                <div className="paginate">
                  <BtnLoadMore onClick={this.loadMore}/>
                </div>
              </div>}
          </div>
        );
      } else {
        return(
          <div>
            <Headline />
            <Message header='У вас нет избранных объявлений' content='Добавьте какое-нибудь объявление в избранное'/>
          </div>
        );
      }
    } else {
      return (
        <Loading />
      );
    }
  }
}

Favorites.propTypes = {};

export default translate('common', { wait: true })(Favorites);