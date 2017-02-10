//Listenings collection
import { Listenings } from '../imports/api/listenings.js';
//Images collections
import { Photos } from '../imports/api/photos.js';

Meteor.publish("listenings.all", function() {
  return Listenings.find({});
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

Meteor.publish('photos.public', function () {
  return Photos.find().cursor;
});