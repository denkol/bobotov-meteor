import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Dropdown } from 'semantic-ui-react';


const cityes = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'b', text: 'Будва', value: 'budva' }
];

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {formData: {}}
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  translate(array, key) {
    if(array && key) {
      var returnText = "";
      for(var i = 0; i < array.length; i++) {
        var arrayValue = array[i].value;
        var arrayText = array[i].text;
        if(key === arrayValue) {
          returnText = arrayText;
        }
      }
      if(returnText) {
        return returnText;
      } else {
        return key;
      }
    } else {
      return false;
    }
  }


  componentDidMount() {
    function toggleFilter() {
      $('.filter-btn').toggleClass('filter-btn--close');
      $('.main-content').toggleClass("main-content--slide-to-left");
      $('.filter').toggleClass("filter--show");
    }

    $('.filter-btn').on('click', function() {
      toggleFilter();
    });

    $('#apply-filter').on('click', function() {
      toggleFilter();
    });
  }
  handleSubmit(e, {formData}) {
    e.preventDefault();
    this.setState({ formData });
    let priceFrom = formData.priceFrom ? formData.priceFrom : "0";
    let priceTo = formData.priceTo ? formData.priceTo : "0";
    let FilterCandidate = { price: {priceFrom: priceFrom, priceTo: priceTo}};
    Session.set('filterData', FilterCandidate);
  }
  render() {
    console.log(this.translate(cityes, "budva"));

    const { formData, value } = this.state;
    return (
      <div className="filter-wrapper">
        <button className="filter-btn">
          <div className="filter-btn__icon" />
        </button>
        <Form size="tiny" onSubmit={this.handleSubmit}>
          <div className="filter">
            <div className="filter-items-wrapper">
              <div className="filter-block">
                <div className="filter-block-content">
                  <Form.Input fluid label='Заголовок' name='headline' placeholder='' />
                </div>
              </div>
              <div className="filter-block">
                <div className="filter-block-content">
                  <Form.Dropdown fluid label='Город' name='city' options={cityes} placeholder='Search...' />
                </div>
              </div>
              <div className="filter-block">
                <div className="filter-block-content">
                  <Form.Select fluid label='Тип предложения' name='typeDeal' options={cityes} placeholder='Тип предложения' />
                </div>
              </div>
              <div className="filter-block">
                <div className="filter-block-content">
                  <Form.Select fluid label='Тип недвижимости' name='typeProperty' options={cityes} placeholder='Тип недвижимости' />
                </div>
              </div>
              <div className="filter-block">
                <div className="filter-block-content">
                  <Form.Select fluid label='Период оплаты' name='paymentPeriod' options={cityes} placeholder='Тип недвижимости' />
                </div>
              </div>
              <div className="filter-block filter-block_double"><span className="filter-block-name">Цена</span>
                <div className="filter-block-content">
                  <div className="filter-block-item filter-block-item_checkbox">
                    <Form.Group widths='equal' style={{marginBottom: 0}}>
                      <Form.Field>
                        <Input label={{ basic: true, content: '€' }} placeholder='От' name='priceFrom' type="number" fluid  labelPosition='right' />
                      </Form.Field>
                      <Form.Field>
                        <Input label={{ basic: true, content: '€' }} placeholder='До' name='priceTo' type="number" fluid  labelPosition='right' />
                      </Form.Field>
                    </Form.Group>
                    {/*<label className="filter-block-item__name">От</label>
                    <input className="filter-block-item__input default-input" type="text" placeholder={0} />*/}
                  </div>
                </div>
              </div>
              <div className="filter-block filter-block_double"><span className="filter-block-name">Прочее</span>
                <div className="filter-block-content">
                  <div className="filter-block-item filter-block-item_checkbox">
                    <input className="filter-block-item__checkbox" type="checkbox" />
                    <label className="filter-block-item__name">От агенства</label>
                  </div>
                </div>
              </div>
              <div className="filter-actions">
                <div className="filter-actions__item">
                  <Button type="reset">Очистить</Button>
                </div>
                <div className="filter-actions__item">
                  <Button primary type="submit"> Применить </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

Filter.propTypes = {};

