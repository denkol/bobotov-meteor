/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';

/* Meteor libs */
import { Random } from 'meteor/random'
import { createContainer } from 'meteor/react-meteor-data';

/* Components */

/* Some functions */
import { TypeProperty, TypeDeal, Cities } from '../../data/data.js';

/* Semantic UI */
import { Button, Form, Input, Select } from 'semantic-ui-react';

/* Material UI */

/* Other */
import { filterToQuery } from '/imports/actions';

/* Global vars */
const FilterPanel = {
  open: function() {
    $('#filter-btn').addClass('filter-btn--close');
    $('.filter').addClass("filter--show");
    $('html, body').addClass('overflow-hidden');
  },
  close: function() {
    $('#filter-btn').removeClass('filter-btn--close');
    $('.filter').removeClass("filter--show");
    $('html, body').removeClass('overflow-hidden');
  },
  toggle: function() {
    $('.filter-btn').toggleClass('filter-btn--close'); //switch to red color
    $('.filter').toggleClass("filter--show");
    $('html, body').toggleClass('overflow-hidden');
  }
}

const Window = {
  scrollToTop: function() {
    window.scrollTo(0, 0);
  }
}

/* Component code */
class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  citiesOptions() {
    const { t } = this.props

    return Cities.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`cities.${value}`)
    }))
  }

  typePropertyOptions() {
    const { t } = this.props

    return TypeProperty.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`typeProperty.${value}`)
    }))
  }

  typeDealOptions() {
    const { t } = this.props

    return TypeDeal.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`typeDeal.${value}`)
    }))
  }

  closeMobileFilter() {
    $('body').css('overflow', 'initial'); //unlock scroll when filter open
    $('.filter-btn').removeClass('filter-btn--close'); //switch button to blue color
    $('#filterMobile').removeClass('filter-mobile--open');
  }

  handleDesktopSearchBtn() {
    FilterPanel.toggle();
  }

  resetForm() {
    Session.set('filterData', null);
    $(".text").text("");
  }

  handleSubmit(e, {formData}) {
    e.preventDefault();
    FilterPanel.close(); //close desktop filter
    this.closeMobileFilter(); //close mobile filter
    Window.scrollToTop();
    const priceFrom = formData.priceFrom.replace(/\s/g, '');
    const priceTo = formData.priceTo.replace(/\s/g, '');
    const typeDeal = formData.typeDeal.replace(/\s/g, '');
    const typeProperty = formData.typeProperty.replace(/\s/g, '');

    const bedrooms = formData.bedrooms.replace(/\s/g, '');
    const bathrooms = formData.bathrooms.replace(/\s/g, '');

    let FilterQuery = {};
    let PriceRange = {};
    if(formData.bathrooms) FilterQuery["listeningInfo.bathrooms"] = Number(formData.bathrooms);
    if(formData.bedrooms) FilterQuery["listeningInfo.bedrooms"] = Number(formData.bedrooms);
    if(formData.city) FilterQuery["listeningInfo.city"] = formData.city;

    if(priceFrom) PriceRange['$gte'] = Number(priceFrom);
    if(priceTo) PriceRange['$lte'] = Number(priceTo);
    if(priceFrom || priceTo) FilterQuery["listeningInfo.price"] = PriceRange;
    if(typeDeal) FilterQuery["listeningInfo.typeDeal"] = typeDeal;
    if(typeProperty) FilterQuery["listeningInfo.typeProperty"] = typeProperty;

    Session.set('filterQuery', FilterQuery);

    const FilterCandidate = [
      { city: formData.city },
      { price: { from: priceFrom, to: priceTo } },
      { typeDeal: typeDeal },
      { typeProperty: typeProperty },
      { bedrooms: bedrooms},
      { bathrooms: bathrooms}
    ];

    Session.set('filterData', FilterCandidate);

    FlowRouter.go('/', {}, filterToQuery(FilterCandidate))
  }

  render() {
    const { t } = this.props
    const FilterQuery = {};
    /* default values for field when page loading */
    let filterDefaultValues = {};
    /* Set default empty search query */
    Session.setDefault('filterQuery', FilterQuery);

    /* Fill default values for filter inputs */
    if(Session.get('filterQuery')) {
      /* Save all default values */
      const deafultQueryFromSession = Session.get('filterQuery');
      filterDefaultValues = {
        city: deafultQueryFromSession['listeningInfo.city'],
        typeDeal: deafultQueryFromSession['listeningInfo.typeDeal'],
        typeProperty: deafultQueryFromSession['listeningInfo.typeProperty'],
        priceFrom: deafultQueryFromSession['listeningInfo.priceFrom'],
        priceTo: deafultQueryFromSession['listeningInfo.priceTo']
      }
    }
    const FilterActions = () => (
      <div className="filter-actions">
        <div className="filter-actions__item">
          <Button type="reset" onClick={this.resetForm}>{t('filterListing.clear')}</Button>
        </div>
        <div className="filter-actions__item">
          <Button primary type="submit">{t('filterListing.apply')}</Button>
        </div>
      </div>
    );
    const FilterForm = () => (
      <Form size="small" onSubmit={this.handleSubmit}>
        <div className="filter">
          <div className="filter-items-wrapper">
            <div className="filter-block">
              <div className="filter-block-content">
                <Form.Select
                  label={t('filterListing.city.label')}
                  placeholder={t('filterListing.city.placeholder')}
                  name='city'
                  options={this.citiesOptions()}
                  defaultValue={filterDefaultValues.city}
                  fluid
                />
              </div>
            </div>
            <div className="filter-block">
              <div className="filter-block-content">
                <Form.Select
                  label={t('filterListing.typeDeal.label')}
                  placeholder={t('filterListing.typeDeal.placeholder')}
                  name='typeDeal'
                  defaultValue={filterDefaultValues.typeDeal}
                  options={this.typeDealOptions()}
                />
              </div>
            </div>
            <div className="filter-block">
              <div className="filter-block-content">
                <Form.Select
                  label={t('filterListing.typeProperty.label')}
                  placeholder={t('filterListing.typeProperty.placeholder')}
                  name='typeProperty'
                  defaultValue={filterDefaultValues.typeProperty}
                  options={this.typePropertyOptions()}
                  fluid
                />
              </div>
            </div>
            <div className="filter-block">
              <div className="filter-block-content">
                <Form.Group widths='equal' style={{marginBottom: 0}}>
                  <Form.Input
                    label={t('filterListing.bedrooms.label')}
                    placeholder={t('filterListing.bedrooms.placeholder')}
                    name='bedrooms'
                    type="number"
                    fluid
                  />
                  <Form.Input
                    label={t('filterListing.bathrooms.label')}
                    placeholder={t('filterListing.bathrooms.placeholder')}
                    name='bathrooms'
                    type="number"
                    fluid
                  />
                </Form.Group>
              </div>
            </div>
            <div className="filter-block filter-block_double"><span className="filter-block-name">{t('filterListing.price')}</span>
              <div className="filter-block-content">
                <div className="filter-block-item filter-block-item_checkbox">
                  <Form.Group widths='equal' style={{marginBottom: 0}}>
                    <Form.Field>
                      <Input
                        defaultValue={filterDefaultValues.priceFrom}
                        label={{ basic: true, content: t('filterListing.priceFrom.label') }}
                        placeholder={t('filterListing.priceFrom.placeholder')}
                        name='priceFrom'
                        type="number"
                        labelPosition='right'
                        fluid
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        defaultValue={filterDefaultValues.priceTo}
                        label={{ basic: true, content: t('filterListing.priceTo.label') }}
                        placeholder={t('filterListing.priceTo.placeholder')}
                        name='priceTo'
                        type="number"
                        labelPosition='right'
                        fluid
                      />
                    </Form.Field>
                  </Form.Group>
                </div>
              </div>
            </div>
            <FilterActions />
          </div>
        </div>
      </Form>);

    return (
      <div className="filter-wrapper">
        <div id="filter" className="filter-desktop">
          <button id="filter-btn" onClick={this.handleDesktopSearchBtn} className="filter-btn">
            <div className="filter-btn__icon" />
          </button>
          <FilterForm />
        </div>
        <div id="filterMobile" className="filter-mobile">
          <div className="filter-content">
            <h2>Поиск по параметрам: </h2>
            <FilterForm />
            <button className="filter-btn filter-btn-mobile" onClick={this.closeMobileFilter}>
              <div className="filter-btn__icon" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {};

export default translate('common', { wait: true })(Filter)
