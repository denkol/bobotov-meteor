import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Photos } from '../../api/photos.js';

import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
class CreatePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: [],
      progress: 0,
      uploaded: false,
      inProgress: false,
      file: "",
    }
    this.photoRemove = this.photoRemove.bind(this);
  }
  uploadIt(e){
    "use strict";
    e.preventDefault();
    let self = this;
    if (e.currentTarget.files && e.currentTarget.files[0]) {
     // We upload only one file, in case
     // there was multiple files selected
     var file = e.currentTarget.files[0];

     if (file) {
        console.log(file)
       let uploadInstance = Photos.insert({
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
         // console.log('On end File Object: ', fileObj);
       });

       uploadInstance.on('uploaded', function (error, fileObj) {
         // console.log('uploaded: ', fileObj);

         // Remove the filename from the upload box
         // self.refs['fileinput'].value = '';

         // Reset our state for the next file
         self.setState({
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
            uploading: [],
            progress: 0,
            uploaded: false,
            inProgress: false,
            file: ""
          });
       });

       uploadInstance.on('progress', function (progress, fileObj) {
         console.log('Upload Percentage: ' + progress);
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
    let fileId = this.state.file._id;
    console.log(fileId)
    Meteor.call('fileRemove', fileId, (err, res) => {
      if(err) {
        console.log(err);
      } else {
        if(res) {
          this.setState({
            uploading: [],
            progress: 0,
            uploaded: false,
            inProgress: false,
            file: ""
          });
        } else {

        }
      }
    });
  }
  render() {
    let loading = this.props.loading;
    if (loading) {
      let imageNumber = this.props.id;
      let main = this.props.main ? "photo-add-block photo-add-block_main" : "photo-add-block";
      let photoUrl = this.props.photoUrl ? this.props.photoUrl : {};

      let currentFileId;
      let uploadedFileCursor;
      let link;

      if(this.state.file) {
        currentFileId = this.state.file._id;
        uploadedFileCursor = Photos.findOne({_id: currentFileId});
      }
      if(uploadedFileCursor) {
        link = uploadedFileCursor.link(); //The "view/download" link
        Session.set(this.props.id + "photo", link);
        if(Session.get(this.props.id + "photo")) {
          photoUrl = {backgroundImage: 'url('+Session.get(this.props.id + "photo")+')'};  
        }
        
        // photoUrl = {backgroundImage: 'url('+link+')'};
      }
      return (
        <div className="create-block-row__item">
          <div className="create-photo">
            <label htmlFor={"image-" + imageNumber} className={this.state.uploaded ? "create-photo-hide" : "create-photo-layer create-photo-layer_init"}>
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
            <div className={this.state.uploaded ? "create-photo-layer create-photo-layer_image" : "create-photo-hide"}>
              <div className="create-photo-layer_image__item" style={photoUrl}></div>
            </div>
            <div className={this.state.uploaded ? "create-photo-layer create-photo-layer_hover" : "create-photo-hide"}>
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