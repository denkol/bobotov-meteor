import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import React, { Component } from 'react';

//Layouts
import App from  '../../imports/components/App.jsx';
import Layout from  '../../imports/components/Layout.jsx';

//Pages
import Index from '../../imports/components/pages/index/Index.jsx';
import Listening from '../../imports/components/pages/listening/Listening.jsx'; 
import Sign from '../../imports/components/pages/sign/Sign.jsx'; 
import Favorites from '../../imports/components/pages/favorites/Favorites.jsx'; 
import History from '../../imports/components/pages/history/History.jsx'; 
import My from '../../imports/components/pages/my/My.jsx';
import Panel from '../../imports/components/pages/panel/Panel.jsx';
import Create from '../../imports/components/pages/create/Create.jsx'; 

//Additional components 
import Filter from '../../imports/components/filter/Filter.jsx'; 

/* Groups */
var publicRoutes = FlowRouter.group({
  name: 'public'
});

/* Routes */
publicRoutes.route('/', {
  name: 'Home',
  action() {
    mount(Layout, {
      content: <Index />,
      additionalContent: <Filter />
    });
  }
});

publicRoutes.route('/listening/:_id', {
  action() {
    var listeningId = FlowRouter.getParam('_id');
    mount(Layout, {
      content: <Listening listeningId={listeningId} />,
      additionalContent: ""
    });
  }
});

publicRoutes.route('/edit/:_id', {
  action() {
    var listeningId = FlowRouter.getParam('_id');
    mount(Layout, {
      content: <Create listeningId={listeningId} />,
      additionalContent: ""
    });
  }
});

publicRoutes.route('/favorites', {
  action() {
    mount(Layout, {
      content: <Favorites />,
      additionalContent: ""
    });
  }
});

publicRoutes.route('/history', {
  action() {
    mount(Layout, {
      content: <History />,
      additionalContent: ""
    });
  }
});

publicRoutes.route('/mylistenings', {
  action() {
    mount(Layout, {
      content: <My />,
      additionalContent: ""
    });
  }
});

publicRoutes.route('/create', {
  action() {
    mount(Layout, {
      content: <Create />,
      additionalContent: ""
    });
  }
});

publicRoutes.route('/panel', {
  action() {
    mount(Layout, {
      content: <Panel />,
      additionalContent: ""
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
