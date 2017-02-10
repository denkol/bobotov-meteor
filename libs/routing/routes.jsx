import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import React, { Component } from 'react';

//App
import App from  '../../imports/components/App.jsx';

//Pages
import Index from '../../imports/components/pages/index/Index.jsx';
import Listening from '../../imports/components/pages/listening/Listening.jsx'; 
import Sign from '../../imports/components/pages/sign/Sign.jsx'; 


/* Groups */
var publicRoutes = FlowRouter.group({
  name: 'public'
});

/* Routes */
publicRoutes.route('/', {
  name: 'Home',
  action() {
    mount(App, {
      page: <Index />
    });
  }
});

publicRoutes.route('/listening/:_id', {
  action() {
    var listeningId = FlowRouter.getParam('_id');
    mount(App, {
      page: <Listening listeningId={listeningId}/>
    });
  }
});

/* SignIn & SignUp */
publicRoutes.route('/signin', {
  action() {
    mount(App, {
      page: <Sign layout="in"/>
    });
  }
});

publicRoutes.route('/signup', {
  action() {
    mount(App, {
      page: <Sign layout="up"/>
    });
  }
});
