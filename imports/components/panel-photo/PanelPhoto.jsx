import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Photos } from '../../api/photos.js';

import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
class PanelPhoto extends Component {
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
    let fileId; 
    if(this.state.file) {
      fileId = this.state.file._id;
    } else {
      fileId = Session.get('avatar-already');
      console.log(fileId)
    }

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
          Meteor.call('userDeletePhoto');
        } else {

        }
      }
    });
  }
  render() {
    let loading = this.props.loading;
    if (loading) {

      if(this.props.photoUrl) {
        Session.set('avatar-already', this.props.photoUrl)
      }

      let photoUrl = Session.get('avatar-already');
      let currentFileId;
      let uploadedFileCursor;
      let link;

      if(this.state.file) {
        currentFileId = this.state.file._id;
        uploadedFileCursor = Photos.findOne({_id: currentFileId});
      }
      if(uploadedFileCursor) {
        link = uploadedFileCursor.link(); //The "view/download" link
        Session.set("avatar-uploaded", link);
        if(Session.get("avatar-uploaded")) {
          photoUrl = Session.get("avatar-uploaded");  
        }
        
        // photoUrl = {backgroundImage: 'url('+link+')'};
      }
      return (
        <div className="panel-photo">
          <div className="panel-photo__item" style={{backgroundImage: "url("+photoUrl+")"}}/>
          
          {this.state.inProgress ? <div className="panel-photo__loader">
            
              <Loader size='mini'>Загрузка {this.state.progress}%</Loader>
          </div> : ""}

          <div className="panel-photo__control">
            <label htmlFor={"fileinput-avatar"} className="panel-photo-add">Загрузить</label>
            {photoUrl != "/img/unknown.jpg" ? <div onClick={this.photoRemove} className="panel-photo-remove">Удалить</div> : ""}
          </div>
          <div className="panel-photo__tip">
            Нажмите чтобы загрузить фотографию (макс. размер 5мб, форматы: jpg, jpeg, png)
          </div>
          <input 
            onChange={this.uploadIt.bind(this)}
            name={"fileinput-avatar"}
            ref={"fileinput-avatar"} 
            type="file" id={"fileinput-avatar"} 
            hidden="true" 
            disabled={this.state.inProgress} />
        </div>
      );
    } else {
      return (
        <div className="panel-photo">
          <div className="panel-photo__loader">
            <Dimmer active inverted>
              <Loader size='mini'>Loading</Loader>
            </Dimmer>
          </div>
        </div>
      );
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
}, PanelPhoto);

PanelPhoto.propTypes = {};