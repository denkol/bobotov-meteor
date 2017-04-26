import { Listenings } from '../../../imports/api/listenings.js';
import { Photos } from '../../../imports/api/photos.js';

Meteor.methods({
  listeningRemove(id) {
    var currentUserId = this.userId;
    var listeningId = id + "";
    var listening = Listenings.find({_id: listeningId}).fetch()[0];
    var ownerId = listening.listeningTech.ownerId;

    if(currentUserId === ownerId) {
      Listenings.remove({_id: listeningId}); //remove listening from Mongo
      return true;
    } else {
      return Meteor.error();
    }
  }
});