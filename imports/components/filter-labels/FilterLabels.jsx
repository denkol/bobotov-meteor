/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

/* Meteor libs */
import { createContainer } from 'meteor/react-meteor-data';

/* Components */

/* Some functions */
// import { Translate } from '../../functions/functions.js';
// import { Cities, TypeDeal, TypeProperty } from '../../data/data.js';

/* Semantic UI */
import { Icon, Label } from 'semantic-ui-react';

/* Material UI */

/* Other */
import { filterToQuery } from '/imports/actions';

/* Global vars */

/* Component code */
class FilterLabels extends TrackerReact(Component) {
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
    const { t, filterData } = this.props

    if(filterData) {
      return (
        <div className="filter-labels">
          {filterData.map((n, i) =>
            <Label.Group color='blue' key={"label-group", i}>
             {n.city ?
             <div key={"label-" + i} className="filter-labels__item">
                <Label as='a'>
                  {t(`cities.${n.city}`)}
                  <Icon onClick={this.removeFilterLabel(n)} name='delete' />
                </Label>
              </div>
              : null}
              {n.price && (n.price.to || n.price.from) ?
              <div key={"label-" + i} className="filter-labels__item">
                <Label as='a'>
                  {(n.price.from || 0) + " - " + n.price.to} €
                  <Icon onClick={this.removeFilterLabel(n)} name='delete' />
                </Label>
              </div>
              : null}
              {n.typeDeal ?
              <div key={"label-" + i} className="filter-labels__item">
                <Label as='a'>
                  {t(`typeDeal.${n.typeDeal}`)}
                  <Icon onClick={this.removeFilterLabel(n)} name='delete' />
                </Label>
              </div>
              : null}
              {n.typeProperty ?
              <div key={"label-" + i} className="filter-labels__item">
                <Label as='a'>
                  {t(`typeProperty.${n.typeProperty}`)}
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

export default translate('common', { wait: true })(FilterLabels)