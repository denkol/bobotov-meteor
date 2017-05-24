import { Mongo } from 'meteor/mongo';
import Dropbox from 'dropbox';
import { Photos } from './photos'

export const Listenings = new Mongo.Collection('listenings');

if (Meteor.isServer) {
  const bound = Meteor.bindEnvironment(function(callback) {
    return callback();
  });
  const client = new Dropbox.Client({
    key: '775nw1v70zprgf8',
    secret: 'a9d25zanyu94d29',
    token: 'odBU_EpkN74AAAAAAAAHc2gDItNKAgV3m1XL5gfa6XTbgdRJxio6QCiWBuwM-KWw'
  });

  Listenings.after.remove((userId, doc) => {
    Photos.remove({ 'meta.listeningId': doc._id })
    client.remove(`listenings/${doc._id}`, function(error) {
      bound(function() {
        if (error) {
          console.error(error);
        }
      });
    });
    Meteor.users.update({}, {
      $pull: {
        'profile.favoritesList': doc._id
      }
    }, { multi: true })
    Meteor.users.update({}, {
      $pull: {
        'profile.historyList': doc._id
      }
    }, { multi: true })
  })
}
