import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

export default class TopFilterDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="top-filter">
        <div className="top-filter-content"></div>
        <div className="top-filter-action"></div>
      </div>
    );
  }
}

TopFilterDemo.propTypes = {};