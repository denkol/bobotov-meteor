import React, { Component } from 'react';

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
        console.log(res)
      }
    });
  }
  render() {
    return (
      <div className="favorite-btn favorite-btn--active" onClick={this.handleFavoriteBtn}>
        <div className={this.state.isFavorite ? "favorite-btn__icon favorite-btn__icon--active" : "favorite-btn__icon"}>
          <svg className="ico-love" role="img">
            <use xlinkHref="#ico-love" />
          </svg>
        </div>
        <div className="favorite-btn__text">{this.state.isFavorite ? "В избранном" : "Добавить в избранное"}</div>
      </div>
    );
  }
}

FavoriteBtn.propTypes = {

};