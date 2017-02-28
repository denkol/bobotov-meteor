import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class FilterLabels extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    if(Session.get('filterData')) {
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
    } else {
      return(<div></div>)
    }
  }
}

FilterLabels.propTypes = {};