import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Listenings } from '../../../api/listenings.js';
import ListeningPreview from '../../listening-preview/ListeningPreview.jsx';
import { Helmet } from "react-helmet";


export default class Admin extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        listenings: Meteor.subscribe('listenings.all')
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
    const master = Meteor.user() ? Meteor.user().profile.master : "";
    
    const Head = () => (
      <Helmet>
        <title>Master</title>
      </Helmet>
    );

    if(master) {
      const listenings = Listenings.find({"listeningTech.statusCode": 2}, {sort: {"listeningTech.createdAt": -1}}).fetch();
      if (this.state.subscription.listenings.ready()) {
        if(listenings.length) {
          return (
            <div className="photo-grid">
              <Head />
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
          return (
            <div>Listenings not found</div>
          );
        }
      } else {
        return(
          <div>Loading...</div>
        );
      }
    } else {
      return <div></div>;
    }
  }
}

// Admin.propTypes = {};