import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

const Profile = props => {
  if(!props.data) {
    return ( <div> Loading... </div>);
  }

  const statuses = [
    {key: "agency", text: "Агенство недвижимости"},
    {key: "user", text: "Пользователь"},
    {key: "realtor", text: "Риэлтор"}
  ];

  let { userPhoto, userName="Unknown", userDesc="user"} = props.data.profile;
  userPhoto = userPhoto ? userPhoto : "/img/unknown.jpg";
  userDesc = statuses.find(el => el.key == userDesc);

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
