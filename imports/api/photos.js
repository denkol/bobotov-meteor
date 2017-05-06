import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';
import path from 'path';
import fs from 'fs';

const UPLOAD_PATH = process.env.UPLOAD_PATH || '../../../../../../' //outside meteor folder

export const Photos = new FilesCollection({
  collectionName: 'Photos',
  storagePath: function(file) {
    if (file && file.meta) {
      const { listeningId, userId } = file.meta
      if (listeningId) {
        /* If listening id define put to photos/id/photoId */
        const dir = path.resolve(UPLOAD_PATH, 'photos', listeningId)
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir, 0777);
        }
        return dir
      } else if (userId) { 
        /* If listening id NOT define put photos to photos/users/userId/photoId */
        const dir = path.resolve(UPLOAD_PATH, 'photos', userId)
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir, 0777);
        }
        return dir
      }
    }
    // console.log(path.resolve(UPLOAD_PATH, 'photos'))
    return path.resolve(UPLOAD_PATH, 'photos');
  },
  allowClientCode: false, // Disallow remove files from Client
  permissions: 0777,
  parentDirPermissions: 0777,
  onBeforeUpload: function (file) {
    // Allow upload files under 5MB, and only in png/jpg/jpeg formats
    if (file.size <= 5242880 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 5MB';
    }
  }
});
