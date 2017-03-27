//Listenings collection
import { Listenings } from '../imports/api/listenings.js';
//Images collections
import { Photos } from '../imports/api/photos.js';
import { Avatars } from '../imports/api/avatars.js';

import { check } from 'meteor/check';

const LISTENINGS_LIMIT_DEFAULT = 9;

Meteor.publish("listenings.all", function() {
  return Listenings.find({});
});

Meteor.publish("listenings.public", function(query = {}, params = {}) {
    check(query, Object);
    check(params, Object);
    query = _.extend({
        "listeningTech.public" : true
    }, query);
    params = _.extend({
      limit: LISTENINGS_LIMIT_DEFAULT
    }, params);
    return Listenings.find(query, params);
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