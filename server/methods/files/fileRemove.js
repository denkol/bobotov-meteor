import { Photos } from '../../../imports/api/photos.js';

Meteor.methods({
  fileRemove(id) {
    var userId = this.userId;
    var file = Photos.find({_id: id}).fetch()[0];
    if(file) {
      var ownerId = file.userId;
    } else {
      throw new Meteor.Error("Файл не найден в БД");
    }


    if(userId && file) {
      if(userId === ownerId) {
        Photos.remove({_id: id});
        return true;
      }
    }
  }
});