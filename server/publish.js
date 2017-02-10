//Listenings collection
import {Listenings} from '../imports/api/listenings.js';

//Images collections
// import {Avatars} from '../imports/api/images/avatarsImages.js';
import {Photos} from '../imports/api/photos.js';

Meteor.publish("listenings.all", function() {
  return Listenings.find({});
});

Meteor.publish("listenings.grid", function() {
  return Listenings.find({"listeningTech.bonuses.bonus1" : "false"});
});

Meteor.publish("listenings.bigslider", function() {
  return Listenings.find({"listeningTech.bonuses.bonus1" : "true"});
});

Meteor.publish("listenings.public", function() {
  return Listenings.find({"listeningTech.public" : "true"});
});

Meteor.publish('users.all', function (authorId) {
  return Meteor.users.find({});
});

Meteor.publish('owner', function (authorId) {
  var returnedObj = Meteor.users.find({ _id : authorId });
  delete returnedObj.services;
  delete returnedObj.profile.historyList;
  delete returnedObj.profile.favoritesList;
  return returnedObj;
});

// Meteor.publish('avatars.public', function () {
//   return Avatars.find().cursor;
// });

Meteor.publish('photos.public', function () {
  return Photos.find().cursor;
});