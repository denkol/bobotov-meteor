import { Photos } from '../../../imports/api/photos.js';

Meteor.methods({
  fileRemove(id) {
    var userId = Meteor.userId();
    var file = Photos.find({_id: id}).fetch()[0];
    var ownerId = file.userId;
    if(userId === ownerId && file) {
      Photos.remove({_id: id});
      return true;
    }
  }
});