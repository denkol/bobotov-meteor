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
import Favorites from '../../imports/components/pages/favorites/Favorites.jsx'; 
import History from '../../imports/components/pages/history/History.jsx'; 
import My from '../../imports/components/pages/my/My.jsx';
import Panel from '../../imports/components/pages/panel/Panel.jsx';
import Create from '../../imports/components/pages/create/Create.jsx'; 


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

publicRoutes.route('/favorites', {
  action() {
    mount(App, {
      page: <Favorites />
    });
  }
});

publicRoutes.route('/history', {
  action() {
    mount(App, {
      page: <History />
    });
  }
});

publicRoutes.route('/mylistenings', {
  action() {
    mount(App, {
      page: <My />
    });
  }
});

publicRoutes.route('/create', {
  action() {
    mount(App, {
      page: <Create />
    });
  }
});

publicRoutes.route('/panel', {
  action() {
    mount(App, {
      page: <Panel />
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
