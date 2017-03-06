import { Listenings } from '../../../imports/api/listenings.js';

Meteor.methods({
  listeningEdit(listeningId, listeningData) {
    var listeningId = listeningId + "";
    var listening = Listenings.find({_id: listeningId}).fetch()[0];
    var userId = this.userId;
    var ownerId = listening.listeningTech.ownerId;
    var listeningTech = listening.listeningTech;
    
    if (userId === ownerId) {
      Listenings.update({_id: listeningId}, { 
        $set: {
          "listeningTech" : listeningTech,
          "listeningInfo" : listeningData.listeningInfo,
          "listeningContacts" : listeningData.listeningContacts,
          "listeningPhotos" : listeningData.listeningPhotos,
          "listeningOptions" : listeningData.listeningOptions,
        } 
      });
    } else {
      console.log("Пользователь не найден, отказано в редактировании");
    }
  }
});