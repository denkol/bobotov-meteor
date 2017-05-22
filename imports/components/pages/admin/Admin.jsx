import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Listenings } from '../../../api/listenings.js';
import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';
import Loading from '../../loading/Loading.jsx';
import { Dimmer } from 'semantic-ui-react';


export default class Admin extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        listenings: Meteor.subscribe('listenings.all', {})
      }
    }
  }
  componentWillMount() {
  }
  componentWillUnmount() {
    this.state.subscription.listenings.stop();
  }
  listeningClick(url, e) {
    FlowRouter.go(url);
  }
  render() {
    const user = Meteor.user() ? Meteor.user().profile.master : "";
    if(user) {
      const listenings = Listenings.find({}, {sort: {"listeningTech.lastChangeDate": -1} }).fetch();
      if (this.state.subscription.listenings.ready()) {
        return (
          <div className="photo-grid">
            {listenings.map((listening, index) => {
              return (
                <a onClick={this.listeningClick.bind(this, "/listening/" + listening._id)} key={"photo-grid-" + index} className="photo-grid__item">
                  <ListeningPreview
                    key={index}
                    listeningData={listening}
                    layout="index"
                  />
                </a>
              );
            })}
          </div>
        );
      } else {
        return(
          <Loading />
        );
      }
    } else {
      return <div></div>;
    }
  }
}

// Admin.propTypes = {};