//Listenings collection
import { Listenings } from '../imports/api/listenings.js';
//Images collections
import { Photos } from '../imports/api/photos.js';
import { Avatars } from '../imports/api/avatars.js';

Meteor.publish("listenings.all", function() {
  return Listenings.find({});
});

Meteor.publish("listenings.public", function() {
  return Listenings.find({"listeningTech.public" : true}, {sort: {"listeningTech.createdAt" : -1}});
});

Meteor.publish("listenings.my", function() {
  return Listenings.find({"listeningTech.ownerId" : this.userId});
});

Meteor.publish("user", function (userId) {
  new SimpleSchema({
    userId: {type: String}
  }).validate({userId});

  return Meteor.users.find(userId, { fields: {'profile.userName': 1, 'profile.userDesc': 1, 'profile.userPhoto': 1} } );
})

Meteor.publish('photos.public', function () {
  return Photos.find().cursor;
});

Meteor.publish('avatars.public', function () {
  return Avatars.find().cursor;
});