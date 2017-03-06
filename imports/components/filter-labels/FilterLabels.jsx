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
      let filterData = Session.get('filterData');
      let filterLabels = [];
      for(key in filterData) {
        if(key === "price") {
          filterLabels.push(filterData[key].from + " - " + filterData[key].to)
        } else {
          filterLabels.push(filterData[key])
        }
      }
      return (
       <div className="filter-labels">
        {filterLabels.map((item, index)=>{
          return (
            <div key={index} className="filter-labels__item">
              <Label as='a'>
                {item}
                <Icon data={item} onClick={this.removeFilterLabel} name='delete' />
              </Label>
            </div>
          );
        })}
        </div>
      );
    } else {
      return(<div></div>)
    }
  }
}

FilterLabels.propTypes = {};