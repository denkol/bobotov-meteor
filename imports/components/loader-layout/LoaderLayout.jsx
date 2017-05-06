/* React libs */
import React, { Component } from 'react';

/* Meteor libs */

/* Components */

/* Some functions */

/* Semantic UI */
import { Loader, Dimmer } from 'semantic-ui-react';

/* Material UI */

/* Other */

export default class LoaderLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="loader-wrapper">
        <div className="loader">
          <Loader size='medium'/>
        </div>
      </div>
    );
  }
}

LoaderLayout.propTypes = {};