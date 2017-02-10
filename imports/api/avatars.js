import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';

export const Avatars = new FilesCollection({
  collectionName: 'Avatars',
  storagePath: "/Users/kolpakzzz/Desktop/data/Meteor/files/avatars" ,
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 2MB, and only in png/jpg/jpeg formats
    if (file.size <= 2097152 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 2MB';
    }
  }
});