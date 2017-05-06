import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { createContainer } from 'meteor/react-meteor-data';
import { Photos } from '../../api/photos.js';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import SnackbarMateiral from '../snackbar/Snackbar.jsx';

class CreatePhoto extends Component {
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
  uploadIt(e) {
    "use strict";
    e.preventDefault();
    const { t } = this.props; //i18n
    const self = this;
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      Photos.storagePath('listenings');
      if (file) {
        const uploadInstance = Photos.insert({
          file: file,
          meta: {
            locator: self.props.fileLocator,
            userId: Meteor.userId(), // Optional, used to check on server for file tampering
            listeningId: self.props.listeningId
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
        uploadInstance.on('start', function () {});
        uploadInstance.on('end', function (error, fileObj) {});
        uploadInstance.on('uploaded', function (error, fileObj) {
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
          self.setState({
            progress: progress
          });
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
      uploading: [],
      progress: 0,
      uploaded: false,
      inProgress: false,
      file: ""
    });
    Meteor.call('fileRemove', fileId, (err, res) => {
      if(err) {
        console.log(err);
      }
    });
  }
  render() {
    const { t, loading } = this.props;
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
          <SnackbarMateiral open={this.state.alert.open} message={this.state.alert.message} />
          <div className={this.props.main ? "create-photo create-photo_main" : "create-photo"}>
            <label htmlFor={"image-" + imageNumber} className={this.state.uploaded || Session.get(imageNumber+"photo") ? "create-photo-hide" : "create-photo-layer create-photo-layer_init"}>
              <div className="create-photo-layer_init__icon">
                <svg role="img" className="ico-add-photo">
                  <use xlinkHref="#ico-add-photo" />
                </svg>
              </div>
              <div className="create-photo-layer_init__text">{t('createPhoto.helpText')}</div>
            </label>
            <div className={this.state.inProgress ? "create-photo-layer create-photo-layer_loader" : "create-photo-hide"}>
              <Dimmer active style={{borderRadius: "5px"}}>
                <Loader indeterminate>{t('createPhoto.progressText')} {this.state.progress}%</Loader>
              </Dimmer>
            </div>
            <div className={Session.get(imageNumber+"photo") || this.state.uploaded ? "create-photo-layer create-photo-layer_image" : "create-photo-hide"}>
              <div className="create-photo-layer_image__item" style={{backgroundImage: 'url('+photoUrl+')'}}></div>
            </div>
            <div className={Session.get(imageNumber+"photo") || this.state.uploaded ? "create-photo-layer create-photo-layer_hover" : "create-photo-hide"}>
              <div className="create-photo-layer_hover__item">
                <div className="create-photo-layer_hover-text">
                  <label htmlFor={"image-" + imageNumber} className="hover-item-text">{t('createPhoto.load')}</label>
                  <div onClick={this.photoRemove} className="hover-item-text hover-item-text_remove">{t('createPhoto.remove')}</div>
                </div>
              </div>
            </div>
            <input
              onChange={this.uploadIt.bind(this)}
              onClick={(e)=> { e.target.value = null }}
              name={"fileinput-" + imageNumber}
              ref={"fileinput-" + imageNumber}
              type="file" id={"image-" + imageNumber}
              hidden="true"
              disabled={this.state.inProgress} />
          </div>
        </div>
      );
    } else {
      return (<div>Loading</div>);
    }
  }
}
export default createContainer( ({ params }) => {
  const handle = Meteor.subscribe('photos.public');
  const docs = Photos.find().fetch();
  const loading = handle.ready();

  return { loading, docs };
}, translate('common', { wait: true })(CreatePhoto));

CreatePhoto.propTypes = {};