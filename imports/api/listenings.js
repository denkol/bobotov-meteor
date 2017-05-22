import { Mongo } from 'meteor/mongo';
import { Photos } from './photos'

export const Listenings = new Mongo.Collection('listenings');

if (Meteor.isServer) {
  Listenings.after.remove((userId, doc) => {
    Photos.remove({ 'meta.listeningId': doc._id })
  })
}
