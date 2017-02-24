import { Photos } from '../../../imports/api/photos.js';

Meteor.methods({
  fileRemove(id) {
    console.log("ID изображения:", id);
    
    
    var userId = this.userId;
    var file = Photos.find({_id: id}).fetch()[0];
    var ownerId = file.userId;

    console.log("ID пользователя пытающегося удалить изображение:", userId)
    console.log("ID владельца", ownerId);
    console.log("Файл в БД", file);


    if(userId && file) {
      if(userId === ownerId) {
        Photos.remove({_id: id});
        console.log("ID пользователя и ID владельца совпали, изображение удалено из БД")
        return true;
      } else {console.log("Неудачная попытка удалить фото, владелец фото не совпадает")}
    } else {
      console.log("Неудачная попытка удалить фото, пользователь или файл не найден в БД");
    }
  }
});