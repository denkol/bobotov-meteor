/* React libs */
import React, { Component } from 'react';
/* Meteor libs */
/* Components */
/* Some functions */
import { Listenings } from '../../../api/listenings.js';
/* Semantic UI */
import { Dimmer, Loader, Message, Button } from 'semantic-ui-react';
/* Material UI */
/* Other */

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="about-header">
          <div className="about-header-img"></div>  
        </div>
        <div className="about-body">
          <div className="about-block" id="about">
            <div className="about-block__headline">
              <h1>О нас</h1>
            </div>
            <div className="about-block__text">
              <p>Простой и быстрый сайт для поиска недвижимости в Черногории</p>
            </div>
          </div>
          <div className="about-block" id="contacts">
            <div className="about-block__headline">
              <h1>Контакты</h1>
            </div>
            <div className="about-block__text">
              <p>E-mail: <a href="mailto:hello@bobotov.me">hello@bobotov.me</a></p>
              <p>Телефон: +3215654785</p>
            </div>
          </div>
          <div className="about-block" id="support">
            <div className="about-block__headline">
              <h1>Поддержка</h1>
            </div>
            <div className="about-block__text">
              <p>Если у вас возникли трудности с использованием нашего сервиса, напишите нам: <a href="mailto:hello@bobotov.me">hello@bobotov.me</a></p>
            </div>
          </div>
          <div className="about-block" id="advert">
            <div className="about-block__headline">
              <h1>Реклама</h1>
            </div>
            <div className="about-block__text">
              <p>По вопросам рекламы ждем ваших писем по адресу <a href="mailto:hello@bobotov.me">hello@bobotov.me</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

About.propTypes = {};