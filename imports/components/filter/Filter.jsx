import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';


const cityes = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
];

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {formData: {}}
    this.handleSubmit = this.handleSubmit.bind(this);
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
    e.preventDefault()
    this.setState({ formData });
    console.log(formData)
  }
  render() {
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
                  <Form.Select fluid label='Город' name='city' options={cityes} placeholder='Search...' search />
                </div>
              </div>
              <div className="filter-block">
                <div className="filter-block-content">
                  <Form.Select fluid label='Тип предложения' name='typeDeal' options={cityes} placeholder='Тип предложения' />
                </div>
              </div>
              <div className="filter-block">
                <div className="filter-block-content">
                  <Form.Select fluid label='Тип недвижимости' name='typeDeal' options={cityes} placeholder='Тип недвижимости' />
                </div>
              </div>
              <div className="filter-block">
                <div className="filter-block-content">
                  <Form.Select fluid label='Период оплаты' name='typeDeal' options={cityes} placeholder='Тип недвижимости' />
                </div>
              </div>
              <div className="filter-block filter-block_double"><span className="filter-block-name">Цена</span>
                <div className="filter-block-content">
                  <div className="filter-block-item filter-block-item_checkbox">
                    <Form.Group widths='equal' style={{marginBottom: 0}}>
                      <Form.Field>
                        <Input label={{ basic: true, content: '€' }} placeholder='От' name='price' type="number" fluid  labelPosition='right' />
                      </Form.Field>
                      <Form.Field>
                        <Input label={{ basic: true, content: '€' }} placeholder='До' name='price' type="number" fluid  labelPosition='right' />
                      </Form.Field>
                    </Form.Group>
                    {/*<label className="filter-block-item__name">От</label>
                    <input className="filter-block-item__input default-input" type="text" placeholder={0} />*/}
                  </div>
                </div>
              </div>
              <div className="filter-block"><span className="filter-block-name">Удобства</span>
                <div className="filter-block-content">
                  <div className="filter-block-item filter-block-item_checkbox">
                    <input className="filter-block-item__checkbox" type="checkbox" />
                    <label className="filter-block-item__name">Интернет</label>
                  </div>
                  <div className="filter-block-item filter-block-item_checkbox">
                    <input className="filter-block-item__checkbox" type="checkbox" />
                    <label className="filter-block-item__name">Парковка</label>
                  </div>
                  <div className="filter-block-item filter-block-item_checkbox">
                    <input className="filter-block-item__checkbox" type="checkbox" />
                    <label className="filter-block-item__name">Телевизор</label>
                  </div>
                  <div className="filter-block-item filter-block-item_checkbox">
                    <input className="filter-block-item__checkbox" type="checkbox" />
                    <label className="filter-block-item__name">Кондиционер</label>
                  </div>
                  <div className="filter-block-item filter-block-item_checkbox">
                    <input className="filter-block-item__checkbox" type="checkbox" />
                    <label className="filter-block-item__name">Место для работы</label>
                  </div>
                  <div className="filter-block-item filter-block-item_checkbox">
                    <input className="filter-block-item__checkbox" type="checkbox" />
                    <label className="filter-block-item__name">Ванная/Душ</label>
                  </div>
                  <div className="filter-block-item filter-block-item_checkbox">
                    <input className="filter-block-item__checkbox" type="checkbox" />
                    <label className="filter-block-item__name">Утюг</label>
                  </div>
                  <div className="filter-block-item filter-block-item_checkbox">
                    <input className="filter-block-item__checkbox" type="checkbox" />
                    <label className="filter-block-item__name">Пылесос</label>
                  </div>
                  <div className="filter-block-item filter-block-item_checkbox">
                    <input className="filter-block-item__checkbox" type="checkbox" />
                    <label className="filter-block-item__name">Стирал. маш.</label>
                  </div>
                  <div className="filter-block-item filter-block-item_checkbox">
                    <input className="filter-block-item__checkbox" type="checkbox" />
                    <label className="filter-block-item__name">Посуд. маш.</label>
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
                  <Button> Очистить </Button>
                </div>
                <div className="filter-actions__item">
                  <Button primary> Применить </Button>
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

