/* Collections */
import { Listenings } from '../imports/api/listenings.js';
import { Photos } from '../imports/api/photos.js';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { check } from 'meteor/check';

const LISTENINGS_LIMIT_DEFAULT = 18;

Meteor.publish("listenings.all", function() {
  Counts.publish(this, 'listenings-all-count', Listenings.find({}), { noReady: true });
  return Listenings.find({});
});

Meteor.publish("listenings.bigslider", function() {
  return Listenings.find(
      {
        "listeningTech": {
          "public" : true,
          "bonuses.bonus3": true
        }
      },
      {sort: {"listeningTech.createdAt": -1}}
    );
});

Meteor.publish("listenings.needVerify", function() {
  return Listenings.find(
      {
        "listeningTech": {
          "statusCode": 2
        }
      },
      {sort: {"listeningTech.createdAt": -1}}
    );
});

Meteor.publish("listenings.public", function(query = {}, params = {}) {
    check(query, Object);
    check(params, Object);
    query = _.extend({
        "listeningTech.public" : true
    }, query);
    params = _.extend({
      // limit: LISTENINGS_LIMIT_DEFAULT
    }, params);
    Counts.publish(this, 'listenings-public-count', Listenings.find(query));
    return Listenings.find(query, params);
});

Meteor.publish("listenings.my", function() {
  return Listenings.find({"listeningTech.ownerId" : this.userId});
});

Meteor.publish("listenings.favorites", function() {
  const user = Meteor.users.findOne(this.userId)
  if (!user) {
    return this.ready()
  }
  const favouritesList = user ? user.profile.favoritesList : [];
  const selector = { _id: { $in: favouritesList } };
  return Listenings.find(selector);
})

Meteor.publish("listenings.history", function() {
  const user = Meteor.users.findOne(this.userId)
  if (!user) {
    return this.ready()
  }
  const historyList = user ? user.profile.historyList : [];
  const selector = { _id: { $in: historyList } };
  return Listenings.find(selector);
})

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


// Deny all client-side updates on the Listenings collection
Listenings.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
// Deny all client-side updates on the Users collection
Meteor.users.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
