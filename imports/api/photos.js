import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';
import path from 'path';
import fs from 'fs';
import Dropbox from 'dropbox';
import Request from 'request';

const UPLOAD_PATH = process.env.UPLOAD_PATH || '../../../../../../' //outside meteor folder

let bound, client;

if (Meteor.isServer) {
  bound = Meteor.bindEnvironment(function(callback) {
    return callback();
  });
  client = new Dropbox.Client({
    key: '775nw1v70zprgf8',
    secret: 'a9d25zanyu94d29',
    token: 'odBU_EpkN74AAAAAAAAHc2gDItNKAgV3m1XL5gfa6XTbgdRJxio6QCiWBuwM-KWw'
  });
}

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
  },

  onAfterUpload: function(fileRef) {
    // In onAfterUpload callback we will move file to DropBox
    var self = this;
    var makeUrl = function(stat, fileRef, version, triesUrl) {
      if (triesUrl == null) {
        triesUrl = 0;
      }
      client.makeUrl(stat.path, {
        long: true,
        downloadHack: true
      }, function(error, xml) {
        // Store downloadable link in file's meta object
        bound(function() {
          if (error) {
            if (triesUrl < 10) {
              Meteor.setTimeout(function() {
                makeUrl(stat, fileRef, version, ++triesUrl);
              }, 2048);
            } else {
              console.error(error, {
                triesUrl: triesUrl
              });
            }
          } else if (xml) {
            var upd = {
              $set: {}
            };
            upd['$set']["versions." + version + ".meta.pipeFrom"] = xml.url;
            upd['$set']["versions." + version + ".meta.pipePath"] = stat.path;
            self.collection.update({
              _id: fileRef._id
            }, upd, function(error) {
              if (error) {
                console.error(error);
              } else {
                // Unlink original files from FS
                // after successful upload to DropBox
                self.unlink(self.collection.findOne(fileRef._id), version);
              }
            });
          } else {
            if (triesUrl < 10) {
              Meteor.setTimeout(function() {
                makeUrl(stat, fileRef, version, ++triesUrl);
              }, 2048);
            } else {
              console.error("client.makeUrl doesn't returns xml", {
                triesUrl: triesUrl
              });
            }
          }
        });
      });
    };
    var writeToDB = function(fileRef, version, data, triesSend) {
      // DropBox already uses random URLs
      // No need to use random file names
      if (triesSend == null) {
        triesSend = 0;
      }
      console.log(fileRef)
      client.writeFile(`listenings/${fileRef.meta.listeningId}/${fileRef._id}-${version}.${fileRef.extension}`, data, function(error, stat) {
        bound(function() {
          if (error) {
            if (triesSend < 10) {
              Meteor.setTimeout(function() {
                writeToDB(fileRef, version, data, ++triesSend);
              }, 2048);
            } else {
              console.error(error, {
                triesSend: triesSend
              });
            }
          } else {
            // Generate downloadable link
            makeUrl(stat, fileRef, version);
          }
        });
      });
    };
    var readFile = function(fileRef, vRef, version, triesRead) {
      if (triesRead == null) {
        triesRead = 0;
      }
      fs.readFile(vRef.path, function(error, data) {
        bound(function() {
          if (error) {
            if (triesRead < 10) {
              readFile(fileRef, vRef, version, ++triesRead);
            } else {
              console.error(error);
            }
          } else {
            writeToDB(fileRef, version, data);
          }
        });
      });
    };
    var sendToStorage = function(fileRef) {
      _.each(fileRef.versions, function(vRef, version) {
        readFile(fileRef, vRef, version);
      });
    };
    sendToStorage(fileRef);
  },

  interceptDownload: function(http, fileRef, version) {
    var path, ref, ref1, ref2;
    path = (ref = fileRef.versions) != null ? (ref1 = ref[version]) != null ? (ref2 = ref1.meta) != null ? ref2.pipeFrom : void 0 : void 0 : void 0;
    if (path) {
      // If file is moved to DropBox
      // We will pipe request to DropBox
      // So, original link will stay always secure
      Request({
        url: path,
        headers: _.pick(http.request.headers, 'range', 'accept-language', 'accept', 'cache-control', 'pragma', 'connection', 'upgrade-insecure-requests', 'user-agent')
      }).pipe(http.response);
      return true;
    } else {
      // While file is not yet uploaded to DropBox
      // We will serve file from FS
      return false;
    }
  }
});


if (Meteor.isServer) {
  // Intercept File's collection remove method
  // to remove file from DropBox
  var _origRemove = Photos.remove;

  Photos.remove = function(search) {
    var cursor = this.collection.find(search);
    cursor.forEach(function(fileRef) {
      _.each(fileRef.versions, function(vRef) {
        var ref;
        if (vRef != null ? (ref = vRef.meta) != null ? ref.pipePath : void 0 : void 0) {
          client.remove(vRef.meta.pipePath, function(error) {
            bound(function() {
              if (error) {
                console.error(error);
              }
              console.log(vRef.meta.pipePath)
            });
          });
        }
      });
    });
    // Call original method
    _origRemove.call(this, search);
  };
}
