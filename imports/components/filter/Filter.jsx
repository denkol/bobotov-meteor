import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Form, Input, Select } from 'semantic-ui-react';
import { PaymentPeriod, TypeProperty, TypeDeal, Cities, Countries, ComfortList} from '../../data/data.js';

import { filterToQuery } from '/imports/actions'

//Some JQuery function
const FilterPanel = {
  open: function() {
    $('#filter-btn').addClass('filter-btn--close');
    $('.filter').addClass("filter--show");
  },
  close: function() {
    $('#filter-btn').removeClass('filter-btn--close');
    $('.filter').removeClass("filter--show");
  },
  toggle: function() {
    $('.filter-btn').toggleClass('filter-btn--close'); //switch to red color
    $('.filter').toggleClass("filter--show");
  }
}

const Window = {
  scrollToTop: function() {
    window.scrollTo(0, 0);
  }
}

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e, {formData}) { console.log(formData);
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
    const FilterForm = () => (
      <Form size="small" onSubmit={this.handleSubmit}>
        <div className="filter">
          <div className="filter-items-wrapper">
            <div className="filter-block">
              <div className="filter-block-content">
                <Form.Select fluid label='Город' name='city' options={Cities} defaultValue={filterDefaultValues.city} placeholder='Не важно' />
              </div>
            </div>
            <div className="filter-block">
              <div className="filter-block-content">
                <Form.Select fluid label='Тип предложения' name='typeDeal' defaultValue={filterDefaultValues.typeDeal} options={TypeDeal} placeholder='Не важно' />
              </div>
            </div>
            <div className="filter-block">
              <div className="filter-block-content">
                <Form.Select fluid label='Тип недвижимости' name='typeProperty' defaultValue={filterDefaultValues.typeProperty} options={TypeProperty} placeholder='Не важно' />
              </div>
            </div>
            <div className="filter-block">
              <div className="filter-block-content">
                <Form.Group widths='equal' style={{marginBottom: 0}}>
                  <Form.Input label="Кол-во спален" placeholder='Не важно' name='bedrooms' type="number" fluid/>
                  <Form.Input label="Кол-во санузлов" placeholder='Не важно' name='bathrooms' type="number" fluid/>
                </Form.Group>
              </div>
            </div>
            <div className="filter-block filter-block_double"><span className="filter-block-name">Цена</span>
              <div className="filter-block-content">
                <div className="filter-block-item filter-block-item_checkbox">
                  <Form.Group widths='equal' style={{marginBottom: 0}}>
                    <Form.Field>
                      <Input defaultValue={filterDefaultValues.priceFrom} label={{ basic: true, content: '€' }} placeholder='От' name='priceFrom' type="number" fluid  labelPosition='right' />
                    </Form.Field>
                    <Form.Field>
                      <Input defaultValue={filterDefaultValues.priceTo} label={{ basic: true, content: '€' }} placeholder='До' name='priceTo' type="number" fluid  labelPosition='right' />
                    </Form.Field>
                  </Form.Group>
                  {/*<label className="filter-block-item__name">От</label>
                  <input className="filter-block-item__input default-input" type="text" placeholder={0} />*/}
                </div>
              </div>
            </div>
            <div className="filter-actions">
              <div className="filter-actions__item">
                <Button type="reset" onClick={this.resetForm}>Очистить</Button>
              </div>
              <div className="filter-actions__item">
                <Button primary type="submit"> Применить </Button>
              </div>
            </div>
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

