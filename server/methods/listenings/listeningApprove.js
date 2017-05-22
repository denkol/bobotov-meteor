import { Listenings } from '../../../imports/api/listenings.js';

Meteor.methods({
  listeningApprove(listeningId) {
    var listeningId = listeningId + "";
    var listening = Listenings.find({_id: listeningId}).fetch()[0];
    var userId = this.userId;
    var master = Meteor.users.find({_id: userId}).fetch()[0].profile.master;
    var listeningTech = listening.listeningTech;
    if (master) {
      Listenings.update({_id: listeningId}, { 
        $set: {
          "listeningTech.statusCode" : 1,
          "listeningTech.public": true
        } 
      });

      return true;
    }
  }
});