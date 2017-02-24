import { Listenings } from '../../../imports/api/listenings.js';

Meteor.methods({
  listeningChangeStatus(statusCode, listeningId) {
    var currentUserId = this.userId;
    var newStatus = statusCode + 0; //convert to int
    var newPublic = newStatus === 3 ? false : true;
    var listening = Listenings.find({_id: listeningId}).fetch()[0];
    var ownerId = listening.listeningTech.ownerId;

    if(currentUserId === ownerId) {
      Listenings.update({_id: listeningId}, {
        $set: {
          "listeningTech.statusCode": newStatus,
          "listeningTech.public": newPublic,
        }
      });
      return true;
    } else {
      return Meteor.error();
    }
  }
});