import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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
  render() {
    return (
      <div className="filter-wrapper">
        <button className="filter-btn">
          <div className="filter-btn__icon" />
        </button>
        <div className="filter">
          <div className="filter-items-wrapper">
            <div className="filter-block filter-block_double"><span className="filter-block-name">Город</span>
              <div className="filter-block-content">
                <div className="ui fluid multiple search selection dropdown">
                  <input name="tags" type="hidden" /><i className="dropdown icon" />
                  <div className="default text">Skills</div>
                  <div className="menu">
                    <div className="item" data-value="angular">Angular</div>
                    <div className="item" data-value="css">CSS</div>
                    <div className="item" data-value="design">Graphic Design</div>
                    <div className="item" data-value="ember">Ember</div>
                    <div className="item" data-value="html">HTML</div>
                    <div className="item" data-value="ia">Information Architecture</div>
                    <div className="item" data-value="javascript">Javascript</div>
                    <div className="item" data-value="mech">Mechanical Engineering</div>
                    <div className="item" data-value="meteor">Meteor</div>
                    <div className="item" data-value="node">NodeJS</div>
                    <div className="item" data-value="plumbing">Plumbing</div>
                    <div className="item" data-value="python">Python</div>
                    <div className="item" data-value="rails">Rails</div>
                    <div className="item" data-value="react">React</div>
                    <div className="item" data-value="repair">Kitchen Repair</div>
                    <div className="item" data-value="ruby">Ruby</div>
                    <div className="item" data-value="ui">UI Design</div>
                    <div className="item" data-value="ux">User Experience</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-block filter-block_double"><span className="filter-block-name">Тип предложения</span>
              <div className="filter-block-content">
                <div className="ui fluid multiple search selection dropdown">
                  <input name="tags" type="hidden" /><i className="dropdown icon" />
                  <div className="default text">Skills</div>
                  <div className="menu">
                    <div className="item" data-value="angular">Angular</div>
                    <div className="item" data-value="css">CSS</div>
                    <div className="item" data-value="design">Graphic Design</div>
                    <div className="item" data-value="ember">Ember</div>
                    <div className="item" data-value="html">HTML</div>
                    <div className="item" data-value="ia">Information Architecture</div>
                    <div className="item" data-value="javascript">Javascript</div>
                    <div className="item" data-value="mech">Mechanical Engineering</div>
                    <div className="item" data-value="meteor">Meteor</div>
                    <div className="item" data-value="node">NodeJS</div>
                    <div className="item" data-value="plumbing">Plumbing</div>
                    <div className="item" data-value="python">Python</div>
                    <div className="item" data-value="rails">Rails</div>
                    <div className="item" data-value="react">React</div>
                    <div className="item" data-value="repair">Kitchen Repair</div>
                    <div className="item" data-value="ruby">Ruby</div>
                    <div className="item" data-value="ui">UI Design</div>
                    <div className="item" data-value="ux">User Experience</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-block"><span className="filter-block-name">Тип недвижимости</span>
              <div className="filter-block-content">
                <div className="filter-block-item filter-block-item_checkbox">
                  <input className="filter-block-item__checkbox" type="checkbox" />
                  <label className="filter-block-item__name">Дом</label>
                </div>
                <div className="filter-block-item filter-block-item_checkbox">
                  <input className="filter-block-item__checkbox" type="checkbox" />
                  <label className="filter-block-item__name">Аппартаменты/Квартира</label>
                </div>
                <div className="filter-block-item filter-block-item_checkbox">
                  <input className="filter-block-item__checkbox" type="checkbox" />
                  <label className="filter-block-item__name">Комната</label>
                </div>
                <div className="filter-block-item filter-block-item_checkbox">
                  <input className="filter-block-item__checkbox" type="checkbox" />
                  <label className="filter-block-item__name">Земельный участок</label>
                </div>
              </div>
            </div>
            <div className="filter-block"><span className="filter-block-name">Период оплаты</span>
              <div className="filter-block-content">
                <div className="filter-block-item filter-block-item_checkbox">
                  <input className="filter-block-item__checkbox" type="radio" name="pay-period" />
                  <label className="filter-block-item__name">За сутки</label>
                </div>
                <div className="filter-block-item filter-block-item_checkbox">
                  <input className="filter-block-item__checkbox" type="radio" name="pay-period" />
                  <label className="filter-block-item__name">В месяц</label>
                </div>
                <div className="filter-block-item filter-block-item_checkbox">
                  <input className="filter-block-item__checkbox" type="radio" name="pay-period" />
                  <label className="filter-block-item__name">В год</label>
                </div>
                <div className="filter-block-item filter-block-item_checkbox">
                  <input className="filter-block-item__checkbox" type="radio" name="pay-period" />
                  <label className="filter-block-item__name">За объект</label>
                </div>
              </div>
            </div>
            <div className="filter-block filter-block_double"><span className="filter-block-name">Цена</span>
              <div className="filter-block-content">
                <div className="filter-block-item filter-block-item_checkbox">
                  <label className="filter-block-item__name">От</label>
                  <input className="filter-block-item__input default-input" type="text" placeholder={0} />
                  <label className="filter-block-item__currency"><i className="fa fa-eur" aria-hidden="true" /></label>
                </div>
                <div className="filter-block-item filter-block-item_checkbox">
                  <label className="filter-block-item__name">До</label>
                  <input className="filter-block-item__input default-input" type="text" placeholder={300} />
                  <label className="filter-block-item__currency"><i className="fa fa-eur" aria-hidden="true" /></label>
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
            <div className="filter-block"><span className="filter-block-name">Особенности</span>
              <div className="filter-block-content">
                <div className="filter-block-item filter-block-item_checkbox">
                  <input className="filter-block-item__checkbox" type="radio" name="special" />
                  <label className="filter-block-item__name">Для семьи</label>
                </div>
                <div className="filter-block-item filter-block-item_checkbox">
                  <input className="filter-block-item__checkbox" type="radio" name="special" />
                  <label className="filter-block-item__name">Для работы</label>
                </div>
                <div className="filter-block-item filter-block-item_checkbox">
                  <input className="filter-block-item__checkbox" type="radio" name="special" />
                  <label className="filter-block-item__name">Для отдыха</label>
                </div>
              </div>
            </div>
            <div className="filter-block filter-block_double"><span className="filter-block-name">Прочее</span>
              <div className="filter-block-content">
                <div className="filter-block-item filter-block-item_checkbox">
                  <input className="filter-block-item__checkbox" type="checkbox" />
                  <label className="filter-block-item__name">Только с фото</label>
                </div>
                <div className="filter-block-item filter-block-item_checkbox">
                  <input className="filter-block-item__checkbox" type="checkbox" />
                  <label className="filter-block-item__name">От агенства</label>
                </div>
              </div>
            </div>
            <div className="filter-actions">
              <div className="filter-actions__item">
                <button className="simple-btn" id="clear-filter">Очистить</button>
              </div>
              <div className="filter-actions__item">
                <button className="simple-btn simple-btn_blue" id="apply-filter">Применить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {};

