import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div id="app">
        {this.props.page}
      </div>
    );
  }
}

App.propTypes = {};