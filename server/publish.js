//Listenings collection
import { Listenings } from '../imports/api/listenings.js';
//Images collections
import { Photos } from '../imports/api/photos.js';
import { Avatars } from '../imports/api/avatars.js';

Meteor.publish("listenings.all", function() {
  return Listenings.find({});
});

Meteor.publish("listenings.public", function() {
  return Listenings.find({"listeningTech.public" : "true"});
});

Meteor.publish("user", function (userId) {
  // Make sure userId is a string.
  // check(userId, String);
  // console.log(userId)
  // Publish a single user - make sure only allowed fields are sent.
  return Meteor.users.find(userId, { fields: {'profile.userName': 1, 'profile.userDesc': 1, 'profile.userPhoto': 1} });
})

Meteor.publish('owner', function (authorId) {
  var returnedObj = Meteor.users.find({ _id : authorId });
  delete returnedObj.services;
  delete returnedObj.profile.historyList;
  delete returnedObj.profile.favoritesList;
  return returnedObj;
});

Meteor.publish('photos.public', function () {
  return Photos.find().cursor;
});

Meteor.publish('avatars.public', function () {
  return Avatars.find().cursor;
});