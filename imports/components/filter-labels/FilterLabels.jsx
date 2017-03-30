import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Icon, Label } from 'semantic-ui-react';

export default class FilterLabels extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.removeFilterLabel = this.removeFilterLabel.bind(this);
  }
  componentWillUnmount() {
    Session.set('filterData', null);
  }
  removeFilterLabel(label) {
  	  return e => {
    	 	if(e) {
           //console.log(label);
           Session.set('filterData', _.reject(this.props.filterData, function(n){ return _.isEqual(label, n); }));
    	 	}
       };
  	  
  }
  render() {
    const filterData = this.props.filterData;
    if(filterData) {
      return (
        <div>
       {filterData.map((n, i) => 
       <div className="filter-labels">
         {n.city ? 
         <div key={"label-" + i} className="filter-labels__item">
            <Label as='a'>
              {n.city}
              <Icon onClick={this.removeFilterLabel(n)} name='delete' />
            </Label>
          </div>
          : null}
          {n.price && (n.price.to || n.price.from) ? 
         <div key={"label-" + i} className="filter-labels__item">
            <Label as='a'>
              {n.price.from + " - " + n.price.to}
              <Icon onClick={this.removeFilterLabel(n)} name='delete' />
            </Label>
          </div>
          : null}
          {n.typeDeal ? 
          <div key={"label-" + i} className="filter-labels__item">
            <Label as='a'>
              {n.typeDeal}
              <Icon onClick={this.removeFilterLabel(n)} name='delete' />
            </Label>
          </div>
          : null}
          {n.typeProperty ? 
          <div key={"label-" + i} className="filter-labels__item">
            <Label as='a'>
              {n.typeProperty}
              <Icon onClick={this.removeFilterLabel(n)} name='delete' />
            </Label>
          </div>
          : null}
          {n.paymentPeriod ? 
          <div key={"label-" + i} className="filter-labels__item">
            <Label as='a'>
              {n.paymentPeriod}
              <Icon onClick={this.removeFilterLabel(n)} name='delete' />
            </Label>
          </div>
          : null}
        </div>
          )}
          </div>
      );
    } else {
      return(<div></div>)
    }
  }
}

FilterLabels.propTypes = {};