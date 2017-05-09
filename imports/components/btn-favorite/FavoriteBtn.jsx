import React, { Component } from 'react';
import { translate } from 'react-i18next';

function animateLoveMenu() {
  $('#love-menu-item').addClass('favorites-menu-animation');
  setTimeout(function() {
    $('#love-menu-item').removeClass('favorites-menu-animation');
  }, 500);
}

class FavoriteBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.isFavorite
    }
    this.handleFavoriteBtn = this.handleFavoriteBtn.bind(this);
  }

  handleFavoriteBtn() {
    this.setState({ //Toggle state
      isFavorite : !this.state.isFavorite
    });
    var that = this;
    var sendData = {
      listeningId : this.props.listeningId, 
      state : this.state.isFavorite
    };

    Meteor.call('listeningAddToFavorite', sendData, (err, res) => {
      if(err) {
        console.log(err);
      }
    });
    
    if(this.state.isFavorite == false) {
      animateLoveMenu(); //only when add to favorites
    }
  }
  render() {
    const { t } = this.props;
    const favoritesStatus = this.state.isFavorite;
    const favoritesText = favoritesStatus ? t('listening.favoritesBtn.remove') : t('listening.favoritesBtn.add');
    const user = Meteor.userId();

    return (
      <div className={user ? "favorite-btn" : "favorite-btn disabled"} onClick={this.handleFavoriteBtn}>
        <div className={favoritesStatus ? "favorite-btn__icon favorite-btn__icon--active" : "favorite-btn__icon"}>
          <svg className="ico-love" role="img">
            <use xlinkHref="#ico-love" />
          </svg>
        </div>
        <div className="favorite-btn__text">{favoritesText}</div>
      </div>
    );
  }
}

FavoriteBtn.propTypes = {
  isFavorite: React.PropTypes.bool,
  listeningId: React.PropTypes.string
};

export default translate('common', { wait: true }) (FavoriteBtn);