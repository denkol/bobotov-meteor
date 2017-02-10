import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let data = this.props.data;
    let userPhoto;
    let userName;
    let userDesc;
    if(data) {
      userPhoto = data.profile.userPhoto ? data.profile.userPhoto : "/img/unknown.jpg";
      userName = data.profile.userName ? data.profile.userName : "Unknown";
      userDesc = data.profile.userDesc ? data.profile.userDesc : "Unknown";
      return (
        <div onClick={this.props.onClick} className="profile">
          <div className="profile-img" style={{backgroundImage: 'url('+userPhoto+')'}}></div>
          <div className="flex-clear">
            <div className="profile-name">{userName}</div>
            <div className="profile-desc">{userDesc}</div>
          </div>
          <div className="profile-icon"></div>
        </div>
      );
    }
  }
}

Profile.propTypes = {

};