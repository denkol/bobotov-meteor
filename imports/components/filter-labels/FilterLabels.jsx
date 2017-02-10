import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

export default class FilterLabels extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
       <div className="filter-labels">
        <div className="filter-labels__item">
          <div className="ui labels"><a className="ui label">Будва<i className="icon close" /></a></div>
        </div>
        <div className="filter-labels__item">
          <div className="ui labels"><a className="ui label">Дом, аппартаменты<i className="icon close" /></a></div>
        </div>
        <div className="filter-labels__item">
          <div className="ui labels"><a className="ui label">Аренда<i className="icon close" /></a></div>
        </div>
        <div className="filter-labels__item">
          <div className="ui labels"><a className="ui label">В месяц<i className="icon close" /></a></div>
        </div>
        <div className="filter-labels__item">
          <div className="ui labels"><a className="ui label">0 - 300 евро<i className="icon close" /></a></div>
        </div>
        <div className="filter-labels__item">
          <div className="ui labels"><a className="ui label"> <i className="icon close" /></a></div>
        </div>
      </div>
    );
  }
}

FilterLabels.propTypes = {};