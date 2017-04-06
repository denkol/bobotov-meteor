import React, { Component } from 'react';

function animateLoveMenu() {
  $('#love-menu-item').addClass('favorites-menu-animation');
  setTimeout(function() {
    $('#love-menu-item').removeClass('favorites-menu-animation');
  }, 500);
}

export default class FavoriteBtn extends Component {
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
    var sendData = {listeningId : this.props.listeningId, state : this.state.isFavorite};
    Meteor.call('listeningAddToFavorite', sendData, (err, res) => {
      if(err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
    
    if(this.state.isFavorite == false) {
      animateLoveMenu(); //only when add to favorites
    }
  }
  render() {
    return (
      <div className={Meteor.userId() ? "favorite-btn" : "favorite-btn disabled"} onClick={this.handleFavoriteBtn}>
        <div className={this.state.isFavorite ? "favorite-btn__icon favorite-btn__icon--active" : "favorite-btn__icon"}>
          <svg className="ico-love" role="img">
            <use xlinkHref="#ico-love" />
          </svg>
        </div>
        <div className="favorite-btn__text">{this.state.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}</div>
      </div>
    );
  }
}

FavoriteBtn.propTypes = {

};