import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Icon, Label } from 'semantic-ui-react';

export default class FilterLabels extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {}
  }
  removeFilterLabel(e) {
  }
  render() {
    if(Session.get('filterData')) {
      return (
       <div className="filter-labels">
         <div className="filter-labels__item">
            <Label as='a'>
              Будва
              <Icon onClick={this.removeFilterLabel} name='delete' />
            </Label>
          </div>
          <div className="filter-labels__item">
            <Label as='a'>
              0 - 200 евро
              <Icon onClick={this.removeFilterLabel} name='delete' />
            </Label>
          </div>
          <div className="filter-labels__item">
            <Label as='a'>
              Аренда краткосрочная
              <Icon onClick={this.removeFilterLabel} name='delete' />
            </Label>
          </div>
        </div>
      );
    } else {
      return(<div></div>)
    }
  }
}

FilterLabels.propTypes = {};