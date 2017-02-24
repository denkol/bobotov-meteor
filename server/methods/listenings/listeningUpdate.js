import { Listenings } from '../../../imports/api/listenings.js';

Meteor.methods({
  listeningUpdate(id, data) {
    var listeningId = id + "";
    var newData = data;
    var listening = Listenings.find({_id: listeningId}).fetch()[0];
    
    var currentUserId = this.userId;
    var ownerId = listening.listeningTech.ownerId;
    console.log(newData)
    if(currentUserId === ownerId) {
      Listenings.update({_id: listeningId}, {
        $set: newData
      },{ upsert: true, multi: true });
      return true;
    } else {
      return Meteor.error();
    }
  }
});