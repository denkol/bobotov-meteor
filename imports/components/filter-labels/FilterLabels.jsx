import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import { Icon, Label } from 'semantic-ui-react';
import { Translate } from '../../functions/functions.js';

import { Cities, TypeDeal, TypeProperty } from '../../data/data.js';

import { filterToQuery } from '/imports/actions'

export default class FilterLabels extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.removeFilterLabel = this.removeFilterLabel.bind(this);
  }

  removeFilterLabel(label) {
    return e => {
      if(e) {
        const key = _.keys(label)[0];
        Session.set('filterData', _.reject(this.props.filterData, function(n){ return _.isEqual(label, n); }));
        Session.set('filterQuery', _.omit(Session.get('filterQuery'), 'listeningInfo.' + key));

        const queryParams = filterToQuery(Session.get('filterData'))

        FlowRouter.go('/', {}, queryParams)
      }
    };
  }

  render() {
    const filterData = this.props.filterData;
    if(filterData) {
      return (
        <div className="filter-labels">
          {filterData.map((n, i) =>
          <Label.Group color='blue'>
           {n.city ?
           <div key={"label-" + i} className="filter-labels__item">
              <Label as='a'>
                {Translate(Cities, n.city)}
                <Icon onClick={this.removeFilterLabel(n)} name='delete' />
              </Label>
            </div>
            : null}
            {n.price && (n.price.to || n.price.from) ?
            <div key={"label-" + i} className="filter-labels__item">
              <Label as='a'>
                {(n.price.from || 0) + " - " + n.price.to}
                <Icon onClick={this.removeFilterLabel(n)} name='delete' />
              </Label>
            </div>
            : null}
            {n.typeDeal ?
            <div key={"label-" + i} className="filter-labels__item">
              <Label as='a'>
                {Translate(TypeDeal, n.typeDeal)}
                <Icon onClick={this.removeFilterLabel(n)} name='delete' />
              </Label>
            </div>
            : null}
            {n.typeProperty ?
            <div key={"label-" + i} className="filter-labels__item">
              <Label as='a'>
                {Translate(TypeProperty, n.typeProperty)}
                <Icon onClick={this.removeFilterLabel(n)} name='delete' />
              </Label>
            </div>
            : null}
            </Label.Group>
            )}
        </div>
      );
    } else {
      return(<div></div>)
    }
  }
}

FilterLabels.propTypes = {};
