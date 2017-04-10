import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import React, { Component } from 'react';

//Libs
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
import CreateEdit from '../../imports/components/pages/create/CreateEdit.jsx';

//Additional components
import Filter from '../../imports/components/filter/Filter.jsx';

//Wrapper function
var AnimationWrapper = (wrappedElement) => {
  return(
    <ReactCSSTransitionGroup transitionName = "example"
      transitionAppear = {true} transitionAppearTimeout = {500}
      transitionEnter = {false} transitionLeave = {false}>
      {wrappedElement}
    </ReactCSSTransitionGroup>
  );
}

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
      content: AnimationWrapper(<Listening listeningId={listeningId} />),
      additionalContent: ""
    });
  }
});

publicRoutes.route('/edit/:_id', {
  action() {
    var listeningId = FlowRouter.getParam('_id');
    mount(Layout, {
      content: AnimationWrapper(<CreateEdit listeningId={listeningId} />),
      additionalContent: ""
    });
  }
});

publicRoutes.route('/favorites', {
  name: 'favorites',
  action() {
    mount(Layout, {
      content: AnimationWrapper(<Favorites />),
      additionalContent: ""
    });
  }
});

publicRoutes.route('/history', {
  name: 'history',
  action() {
    mount(Layout, {
      content: AnimationWrapper(<History />),
      additionalContent: ""
    });
  }
});

publicRoutes.route('/mylistenings', {
  name: 'mylistenings',
  action() {
    mount(Layout, {
      content: AnimationWrapper(<My />),
      additionalContent: ""
    });
  }
});

publicRoutes.route('/create', {
  action() {
    mount(Layout, {
      content: AnimationWrapper(<Create />),
      additionalContent: ""
    });
  }
});

publicRoutes.route('/panel', {
  action() {
    mount(Layout, {
      content: AnimationWrapper(<Panel />),
      additionalContent: ""
    });
  }
});

/* SignIn & SignUp & Recovery */
publicRoutes.route('/signin', {
  action() {
    mount(App, {
      page: AnimationWrapper(<Sign layout="in"/>)
    });
  }
});

publicRoutes.route('/signup', {
  action() {
    mount(App, {
      page: AnimationWrapper(<Sign layout="up"/>)
    });
  }
});

publicRoutes.route('/recovery', {
  action() {
    mount(App, {
      page: AnimationWrapper(<Sign layout="recovery"/>)
    });
  }
});
