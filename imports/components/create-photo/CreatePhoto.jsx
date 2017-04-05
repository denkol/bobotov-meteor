import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Photos } from '../../api/photos.js';
import Snackbar from '../snackbar/Snackbar.jsx';

import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
class CreatePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: {
        open: false,
        message: ""
      },
      uploading: [],
      progress: 0,
      uploaded: false,
      inProgress: false,
      file: "",
    }
    this.photoRemove = this.photoRemove.bind(this);
    this.snackbarClose = this.snackbarClose.bind(this);
  }
  snackbarClose() {
    this.state({
      snackbar: {
        open: false,
        message: ""
      }
    });
  }
  uploadIt(e){
    "use strict";
    e.preventDefault();
    const self = this;
    if (e.currentTarget.files && e.currentTarget.files[0]) {
     // We upload only one file, in case
     // there was multiple files selected
     const file = e.currentTarget.files[0];
      
     if (file) {
       const uploadInstance = Photos.insert({
         file: file,
         meta: {
           locator: self.props.fileLocator,
           userId: Meteor.userId() // Optional, used to check on server for file tampering
         },
         streams: 'dynamic',
         chunkSize: 'dynamic',
         allowWebWorkers: true // If you see issues with uploads, change this to false
       }, false);

       self.setState({
         uploading: uploadInstance, // Keep track of this instance to use below
         inProgress: true // Show the progress bar now
       });

       // These are the event functions, don't need most of them, it shows where we are in the process
       uploadInstance.on('start', function () {
         // console.log('Starting');
       });

       uploadInstance.on('end', function (error, fileObj) {
       });

       uploadInstance.on('uploaded', function (error, fileObj) {
         // console.log('uploaded: ', fileObj);
         // Remove the filename from the upload box
         // self.refs['fileinput'].value = '';
         // Reset our state for the next file
         self.setState({
            snackbar: {
              open: true,
              message: "Фотография загружена!"
            },
           uploading: [],
           progress: 0,
           inProgress: false,
           uploaded: true,
           file: fileObj
         });
       });

       uploadInstance.on('error', function (error, fileObj) {
         console.log('Error during upload: ' + error);
         self.setState({
            snackbar: {
              open: true,
              message: "Ошибка! (макс. размер 2мб, jpg, jpeg, png)"
            },
            uploading: [],
            progress: 0,
            uploaded: false,
            inProgress: false,
            file: ""
          });
       });

       uploadInstance.on('progress', function (progress, fileObj) {
         // Update our progress bar
         self.setState({
           progress: progress
         })
       });

       uploadInstance.start(); // Must manually start the upload
     }
    }
  }
  photoRemove() {
    let fileId = "";
    const id = this.props.id;
    if(this.props.photoUrl) {
      const photoUrl = this.props.photoUrl;
      fileId = photoUrl.substr(photoUrl.lastIndexOf('/') + 1).slice(0, -4); //get id from url
    } else {
      fileId = this.state.file._id;
    }
    delete Session.keys[id + 'photo']
    this.setState({
      snackbar: {
        open: true,
        message: "Фотография удалена"
      },
      uploading: [],
      progress: 0,
      uploaded: false,
      inProgress: false,
      file: ""
    });
    Meteor.call('fileRemove', fileId, (err, res) => {
      if(err) {
        console.log(err);
      } else {
        
      }
    });
    
  }
  render() {
    // console.log(this.state.snackbar)
    const loading = this.props.loading;
    if (loading) {
      const imageNumber = this.props.id;
      const main = this.props.main ? "photo-add-block photo-add-block_main" : "photo-add-block";
      let photoUrl = this.props.photoUrl;
      let currentFileId;
      let uploadedFileCursor;
      let link;

      if(this.state.file) {
        currentFileId = this.state.file._id;
        uploadedFileCursor = Photos.findOne({_id: currentFileId});
      }
      if(uploadedFileCursor) {
        link = uploadedFileCursor.link(); //The "view/download" link
        Session.set(imageNumber + "photo", link);
        photoUrl = link;
      }
      return (
        <div className="create-block-row__item">
          <Snackbar 
            onRequiestClose={this.snackbarClose} 
            open={this.state.snackbar.open} 
            message={this.state.snackbar.message} />

          <div className={this.props.main ? "create-photo create-photo_main" : "create-photo"}>
            <label htmlFor={"image-" + imageNumber} className={this.state.uploaded || Session.get(imageNumber+"photo") ? "create-photo-hide" : "create-photo-layer create-photo-layer_init"}>
              <div className="create-photo-layer_init__icon">
                <svg role="img" className="ico-add-photo">
                  <use xlinkHref="#ico-add-photo" />
                </svg>
              </div>
              <div className="create-photo-layer_init__text">
               Нажмите чтобы загрузить (макс. размер 2мб, jpg, jpeg, png)
              </div>
            </label>
            <div className={this.state.inProgress ? "create-photo-layer create-photo-layer_loader" : "create-photo-hide"}>
              <Dimmer active>
                <Loader indeterminate>Загрузка файла {this.state.progress}%</Loader>
              </Dimmer>
            </div>
            <div className={Session.get(imageNumber+"photo") || this.state.uploaded ? "create-photo-layer create-photo-layer_image" : "create-photo-hide"}>
              <div className="create-photo-layer_image__item" style={{backgroundImage: 'url('+photoUrl+')'}}></div>
            </div>
            <div className={Session.get(imageNumber+"photo") || this.state.uploaded ? "create-photo-layer create-photo-layer_hover" : "create-photo-hide"}>
              <div className="create-photo-layer_hover__item">
                <label htmlFor={"image-" + imageNumber} className="hover-item-text">Загрузить другую</label>
                <div onClick={this.photoRemove} className="hover-item-text hover-item-text_remove">Удалить</div>
              </div>
            </div>
            <input 
              onChange={this.uploadIt.bind(this)}
              name={"fileinput-" + imageNumber}
              ref={"fileinput-" + imageNumber} 
              type="file" id={"image-" + imageNumber} 
              hidden="true" 
              disabled={this.state.inProgress} />
          </div>
        </div>
      );
    } else {
      return (<div> Loading </div>);
    }
  }
}
export default createContainer( ({ params }) => {
  const handle = Meteor.subscribe('photos.public');
  const docs = Photos.find().fetch();
  const loading = handle.ready();

  //Clear all db
  return {
    loading,docs
  };
}, CreatePhoto);

CreatePhoto.propTypes = {};