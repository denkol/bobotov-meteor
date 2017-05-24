import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
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
import About from '../../imports/components/pages/about/About.jsx';
import My from '../../imports/components/pages/my/My.jsx';
import Panel from '../../imports/components/pages/panel/Panel.jsx';
import Create from '../../imports/components/pages/create/Create.jsx';
import CreateEdit from '../../imports/components/pages/create/CreateEdit.jsx';
import Admin from '../../imports/components/pages/admin/Admin.jsx';

//Additional components
import Filter from '../../imports/components/filter/Filter.jsx';

// Filter actions
import { listeningsFilter } from '/imports/actions'

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

var privateRoutes = FlowRouter.group({
  name: 'private'
});

/* Routes */
publicRoutes.route('/', {
  name: 'Home',
  action() {
    mount(Layout, {
      content: <Index />,
      additionalContent: <Filter />
    });
  },
  triggersEnter: [
    (context) => {
      const { selector } = listeningsFilter(context.queryParams)
      const FilterCandidate = [
        { city: context.queryParams.city },
        { price: { from: Number(context.queryParams.priceFrom), to: Number(context.queryParams.priceTo) } },
        { typeDeal: context.queryParams.typeDeal },
        { typeProperty: context.queryParams.typeProperty },
        { bedrooms: context.queryParams.bedrooms },
        { bathrooms: context.queryParams.bathrooms }
      ];
      Session.set('filterQuery', selector)
      Session.set('filterData', FilterCandidate)
    }
  ]
});

FlowRouter.route('/listening/:_id', {
  action({ _id: listeningId }) {
    mount(Layout, {
      content: <Listening listeningId={listeningId} />,
      additionalContent: ""
    })
  }
})

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

publicRoutes.route('/about', {
  name: 'about',
  action() {
    mount(Layout, {
      content: AnimationWrapper(<About />),
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

publicRoutes.route('/reset/:_token', {
  action() {
    var token = FlowRouter.getParam('_token');
    mount(App, {
      page: AnimationWrapper(<Sign layout="reset" token={token}/>)
    });
  }
});


publicRoutes.route('/master', {
  action() {
    mount(App, {
      page: AnimationWrapper(<Admin />)
    });
  }
});
