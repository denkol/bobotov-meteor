import { Listenings } from '../../../imports/api/listenings.js';

Meteor.methods({
  listeningChangeStatus(listeningId) {
    var listening = Listenings.find({_id: listeningId}).fetch()[0];
    var currentUserId = this.userId;
    var ownerId = listening.listeningTech.ownerId;

    if(listening) {
      var newPublic = !listening.listeningTech.public;
      var newStatus = listening.listeningTech.statusCode === 1 ? 3 : 1;
    } else {
      return Meteor.error();
    }
    


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