import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { UserStatuses } from '../../data/data.js';

const Profile = props => {
  if(!props.data) {
    return (
      <div onClick={props.onClick} className="profile">
        <div className="profile-img" style={{backgroundImage: 'url("/img/unknown.jpg")'}}></div>
        <div className="flex-clear">
          <div className="profile-name">Unknown</div>
          <div className="profile-desc">Unknown</div>
        </div>
        <div className="profile-icon"></div>
      </div>
    );
  }
  
  let { userPhoto, userName="Unknown", userDesc="user"} = props.data.profile;
  userPhoto = userPhoto ? userPhoto : "/img/unknown.jpg";
  userDesc = UserStatuses.find(el => el.value == userDesc);
  return (
    <div onClick={props.onClick} className="profile">
      <div className="profile-img" style={{backgroundImage: `url(${userPhoto})`}}></div>
      <div className="flex-clear">
        <div className="profile-name">{userName}</div>
        <div className="profile-desc">{userDesc.text}</div>
      </div>
      <div className="profile-icon"></div>
    </div>
  );
}

export default Profile;
