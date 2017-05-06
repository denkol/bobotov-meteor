/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';

/* Meteor libs */
import { createContainer } from 'meteor/react-meteor-data';

/* Components */
import SnackbarMateiral from '../snackbar/Snackbar.jsx';

/* Some functions */
import { Photos } from '../../api/photos.js';

/* Semantic UI */
import { Dimmer, Loader } from 'semantic-ui-react';

/* Material UI */

/* Other */

class PanelPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: [],
      progress: 0,
      uploaded: false,
      inProgress: false,
      file: "",
      alert: {
        open: false,
        message: ""
      }
    }
    this.photoRemove = this.photoRemove.bind(this);
  }
  uploadIt(e){
    "use strict";
    e.preventDefault();
    const self = this;
    const { t } = this.props;
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
       });

      uploadInstance.on('end', function (error, fileObj) {
      });

       uploadInstance.on('uploaded', function (error, fileObj) {
         // console.log('uploaded: ', fileObj);

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
         self.setState({
            error: error,
            uploading: [],
            progress: 0,
            uploaded: false,
            inProgress: false,
            file: "",
            alert: {
              open: true,
              message: `${t('createPhoto.errorMessage')}`
            }
          });

         setTimeout(function() {self.setState({alert: {open: false}})}, 2000);
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
    let fileId = ""; 
    if(Session.get('avatar-already')) {
      let photoUrl = Session.get('avatar-already');
      fileId = photoUrl.slice(photoUrl.lastIndexOf('/') + 1, photoUrl.lastIndexOf('.'));
    } else {
      fileId = this.state.file._id;
    }
    Meteor.call('fileRemove', fileId, (err, res) => {
      Meteor.call('userDeletePhoto');
      delete Session.keys['avatar-already', 'avatar-uploaded']; //Clear Session
      this.setState({
        uploading: [],
        progress: 0,
        uploaded: false,
        inProgress: false,
        file: "",
        alert: {
          open: false
        }
      });
      if(err) {
        console.log(err);
      }
    });
  }
  render() {
    const { t, loading } = this.props;

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
      }
      return (
        <div className="panel-photo">
          <SnackbarMateiral open={this.state.alert.open} message={this.state.alert.message} />
          <div className="panel-photo__item" style={{backgroundImage: "url("+photoUrl+")"}}/>
          <div className={this.state.inProgress ? "panel-photo__loader" : "panel-photo__loader--hide"}>
            <div className="panel-loader-text">{this.state.progress}%</div>
          </div>
          <div className="panel-photo__control">
            <label htmlFor={"fileinput-avatar"} className="panel-photo-add">{t('createPhoto.load')}</label>
            {photoUrl != "/img/unknown.jpg" ? <div onClick={this.photoRemove} className="panel-photo-remove">{t('createPhoto.remove')}</div> : ""}
          </div>
          <div className="panel-photo__tip">{t('createPhoto.helpText')}</div>
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
            <Loader size='mini'>Loading</Loader>
          </div>
        </div>
      );
    }
  }
}
export default createContainer( ({ params }) => {
  const handle = Meteor.subscribe('photos.public');
  const docs = Photos.find({}).fetch();
  const loading = handle.ready();

  return { 
    loading, docs
  };
}, translate('common', { wait: true })(PanelPhoto));

PanelPhoto.propTypes = {};