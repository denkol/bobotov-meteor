import React, { Component, PropTypes } from 'react';
import { Avatars } from '../../api/avatars.js';
import { createContainer } from 'meteor/react-meteor-data';
// import CircularProgress from 'material-ui/CircularProgress';
// import Snackbar from 'material-ui/Snackbar';

import { Progress } from 'semantic-ui-react'

class AvatarUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: [],
      progress: 0,
      uploaded: false,
      inProgress: false,
      file: ""
    }
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
       let uploadInstance = Avatars.insert({
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
          uploaded: false
         })
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
  render() {
    if (this.props.docsReadyYet) {
      let photoUrl = {backgroundImage: "img/unknown.jpg" };
      let currentFileId;
      let uploadedFileCursor;
      let link;

      if(this.state.file) {
        currentFileId = this.state.file._id;
        uploadedFileCursor = Avatars.findOne({_id: currentFileId});
      }

      if(uploadedFileCursor) {
        link = uploadedFileCursor.link(); //The "view/download" link
        Session.set("uploadedAvatar", link);
        photoUrl = {backgroundImage: 'url('+link+')'};
      }

      return (
        <label htmlFor="avatarInput" className="avatar-upload">
          <div className="avatar-upload__image" style={photoUrl}>
            <div className={this.state.inProgress ? "avatar-upload__loader" : "avatar-upload__loader--hide"}>
              <Progress percent={this.state.progress} progress />
              {/*<CircularProgress mode="determinate" value={this.state.progress} thickness={4} />*/}
            </div>
          </div>
          <div className="avatar-upload__text">
            <p className={this.state.uploaded ? "upload-text--hide" : "upload-text"}>Нажмите, чтобы загрузить фотографию (макс. размер 2мб .png, .jpg, .jpeg)</p>
            <p className={this.state.uploaded ? "upload-text" : "upload-text--hide"}>Отлично выглядите!</p>
          </div>
          <input 
            onChange={this.uploadIt.bind(this)} 
            ref="avatarInput"
            type="file" id="avatarInput" 
            hidden="true" 
            disabled={this.state.inProgress} />
        </label>
      );
    } else {
      return (this.props.docsReadyYet);
    }
  }
}

export default createContainer( ({ params }) => {
  const handle = Meteor.subscribe('avatars.public');
  const docs = Avatars.find().fetch();
  const docsReadyYet = handle.ready();

  //Clear all db
  return {
    docsReadyYet,
    docs
  };
}, AvatarUpload);
