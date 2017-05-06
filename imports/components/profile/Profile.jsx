import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { UserStatuses } from '../../data/data.js';
import { translate } from 'react-i18next';


class Profile extends Component {

  render() {
    const { t } = this.props
    const unknownPhotoUrl = "/img/unknown.jpg";
    let { userPhoto, userName, userDesc} = this.props.data.profile;
    userName = userName ? userName : "Unknown";
    userPhoto = userPhoto ? userPhoto : unknownPhotoUrl;
    userDesc = t(`userStatuses.${userDesc}`);
    return (
      <div onClick={this.props.onClick} className="profile">
        <div className="profile-img" style={{backgroundImage: `url(${userPhoto})`}}></div>
        <div className="flex-clear">
          <div className="profile-name">{userName}</div>
          <div className="profile-desc">{userDesc}</div>
        </div>
        <div className="profile-icon"></div>
      </div>
    );
  }
}

export default translate('common', { wait: true })(Profile)
