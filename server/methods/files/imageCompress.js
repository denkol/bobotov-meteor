import { Photos } from '../../../imports/api/photos.js';
// import { imagemin } from 'imagemin';
// import imageminMozjpeg from 'imagemin-mozjpeg';
// import imageminPngquant from 'imagemin-pngquant';
var imagemin = require('imagemin');
var imageminMozjpeg = require('imagemin-mozjpeg');
var imageminPngquant = require('imagemin-pngquant');


Meteor.methods({
  imageCompress(imageId) {
    var userId = this.userId;
    var file = Photos.find({_id: imageId}).fetch()[0];
    var ownerId = file.userId;
    // console.log(imagemin, imageminMozjpeg, imageminPngquant)
    if(userId && file) {
      if(userId === ownerId) {
        let imageFileName = imageId + '.png';
        let exec = Npm.require('child_process').exec;
        let cmd = 'pngquant --force 256 /Users/kolpakzzz/Desktop/data/Meteor/files/' + imageFileName + ' --output /Users/kolpakzzz/Desktop/data/Meteor/files/compressed/' + imageFileName;
        exec(cmd, function (stdout, stderr) {
          if (! stderr) {
            let nextCmd = 'mv -f /Users/kolpakzzz/Desktop/data/Meteor/files/compressed' + imageFileName + ' /Users/kolpakzzz/Desktop/data/Meteor/files/' + imageFileName;
            exec(nextCmd);
          }
        });

      } else {console.log("Неудачная попытка удалить фото, владелец фото не совпадает")}
    } else {
      console.log("Неудачная попытка удалить фото, пользователь или файл не найден в БД");
    }
  }
});