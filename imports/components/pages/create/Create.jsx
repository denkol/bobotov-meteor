import React, { Component } from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { PaymentPeriod, TypeProperty, TypeDeal, Cities, Countries, ComfortList} from '../../../data/data.js';
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Dropdown } from 'semantic-ui-react'
import CreatePhoto from '../../create-photo/CreatePhoto.jsx';
import ContactsAdd from '../../contacts-add/ContactsAdd.jsx';
import {isValidEmail, isValidPhone} from "/imports/functions/validation.js";

/* Comfort List */
const comfortListLabel = (label, index, props) => ({
  color: 'blue',
  content: `${label.text}`
})

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      validation: {
        message: '',
        phone: '',
        email: '',
        price: false,
        country: false,
        headline: false,
        desc: false,
        paymentPeriod: false,
        city: false,
        typeDeal: false,
        typeProperty: false,
        ratio: false
      },
      contacts: [],
      contactsNumber: 1 
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.contactAdd = this.contactAdd.bind(this);
    this.contactRemove = this.contactRemove.bind(this);
  }
  componentWillUnmount() {
    Session.clear()
  }
  componentDidMount() {
    Session.keys = {} //reset session
  }

  handleSubmit(e, { formData }) { //console.log(formData);
    e.preventDefault();
    const validation = {
      message: '',
      phone: '',
      email: '',
      price: false,
      country: false,
      headline: false,
      desc: false,
      paymentPeriod: false,
      city: false,
      typeDeal: false,
      typeProperty: false,
      ratio: false
    };
    this.setState({ validation });

    const self = this;
    
    const message = "У вас ошибки при заполнении формы, исправьте ошибки и попробуйте снова"; 
    
    function getContacts() {
      const contacts = [];
      for(let i = 0; i < self.state.contactsNumber; i++) {
        const dropdownDeafultValue = "email";
        const contactKey = Session.get('dropdown'+i) ? Session.get('dropdown'+i) : dropdownDeafultValue;
        const contactValue = formData["input"+i];
        
        //console.log(contactKey, contactValue);
        if(contactKey === "phone" && !isValidPhone(contactValue)) {
          validation.message = message;
          validation.phone = "Введите корректный телефонный номер!";
          self.setState({ validation });
        }
        
        if(contactKey === "email" && !isValidEmail(contactValue)) {
          validation.message = message;
          validation.email = "Введите корректный почтовый адрес!";
          self.setState({ validation });
        }
        
        contacts.push({contactKey, contactValue, message: validation.message});
      }
      return contacts;
    }
    function getOtherPhotos() {
      const listeningPhotos = [];
      for (let i = 1; i <= 4; i++) {
        if(Session.get(i + "photo")) {
          listeningPhotos.push( Session.get(i + "photo") );
        }
      }
      return listeningPhotos;
    }

    const comfortList = formData.comfortList;
    const typeDeal = formData.typeDeal;
    const typeProperty = formData.typeProperty;
    const country = formData.country;
    const city = formData.city;
    const location = "formData.location";
    const ratio = parseInt(formData.ratio);
    const bedrooms = parseInt(formData.bedrooms);
    const bathrooms = parseInt(formData.bathrooms);
    const floor = parseInt(formData.floor);
    const price = parseInt(formData.price);
    const paymentPeriod = formData.paymentPeriod;
    const headline = formData.headline;
    const desc = formData.description;

    const photos = {
      main: Session.get('0photo'),
      other: getOtherPhotos()
    }

    const options = [
      { optionName: "Страна", optionValue: "Черногория" },
      { optionName: "Город", optionValue: "Будва" },
      { optionName: "Площадь", optionValue: "32" },
      { optionName: "ratio", optionValue: "32" },
      { optionName: "ratio", optionValue: "32" }
    ];

    const contacts = getContacts();
    self.setState({ contacts });
    
    const hasError = _.some(contacts, contact => !_.isUndefined(contact.message));

    const listeningCandidate = {
      "listeningInfo": {
        "typeDeal": typeDeal,
        "typeProperty": typeProperty,
        "country": country,
        "city": city,
        "location": location,
        "ratio": ratio,
        "floor": floor,
        "bedrooms": bedrooms,
        "bathrooms": bathrooms,
        "price": price,
        "paymentPeriod": paymentPeriod,
        "comfortList": comfortList,
        "headline": headline,
        "desc": desc
      },
      "listeningPhotos": photos,
      "listeningContacts": contacts,
      "listeningOptions": options
    }

    if(!price) {
      validation.message = message;
      validation.price = "Введите цену!";
      self.setState({ validation });
    } if(!country) {
      validation.message = message;
      validation.country = "Укажите страну!";
      self.setState({ validation });
    } if(!headline) {
      validation.message = message;
      validation.headline = "Введите заголовок!";
      self.setState({ validation });
    } if(!desc) {
    	validation.message = message;
      validation.desc = "Введите описание!";
      self.setState({ validation });
    } if(!paymentPeriod) {
      validation.message = message;
      validation.paymentPeriod = "Укажите период оплаты!";
      self.setState({ validation });
    } if(!city) {
      validation.message = message;
      validation.city = "Укажите населенный пункт!";
      self.setState({ validation });
    } if(!typeDeal) {
      validation.message = message;
      validation.typeDeal = "Укажите тип предложения!";
      self.setState({ validation });
    } if(!typeProperty) {
      validation.message = message;
      validation.typeProperty = "Укажите тип недвижимости!";
      self.setState({ validation });
    } if(!ratio) {
      validation.message = message;
      validation.ratio = "Укажите площадь!";
      self.setState({ validation });
    } if(!Session.get('0photo')) {
      alert('Загрузите главное фото')
    }
    
    if(hasError || !price || !country || !headline || !desc || !paymentPeriod || !city || !typeDeal || !typeProperty || !ratio) return;
    Meteor.call('listeningCreate', listeningCandidate, (err, res) => {
      if(err) {console.log(err)} 
      else {
        FlowRouter.go('/mylistenings');
      }
    });

  }
  contactAdd(event) {
    event.preventDefault();
    if(this.state.contactsNumber < 10 ) {
      this.setState({
        contactsNumber: this.state.contactsNumber + 1
      });
    }
  }
  contactRemove(event) {
    event.preventDefault();
    if(this.state.contactsNumber > 1) {
      this.setState({
        contactsNumber: this.state.contactsNumber - 1
      });
    }
  }
  render() {
    const { message, phone, email, price, country, headline, desc, paymentPeriod, city, typeDeal, typeProperty, ratio } = this.state.validation;
    const { contactsNumber, contacts } = this.state; 
    //console.log(contactsNumber, contacts);
    const userId = Meteor.userId();
    let defaultData;
    if(this.props.defaultData) {
      defaultData = this.props.defaultData;
    }
    if(userId) {
      return (
        <div>
          <div className="headline">
            <div className="headline__item">
              <div className="headline-icon">
                <div className="headline-icon__icon">
                  <svg className="ico-create" role="img"><use xlinkHref="#ico-create" /></svg>
                </div>
                <div className="headline-icon__text">
                  Новое объявление
                </div>
              </div>
            </div>
          </div>
          <Form className={"create-wrapper"} onSubmit={this.handleSubmit}>
            <div className="create-block">
              <div className="create-block__item">
                <div className="create-block-headline">
                  Шаг 1: Общая информация
                </div>
              </div>
              <div className="create-block__item">
                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Dropdown label="Страна" placeholder='Выберите страну' name='country' fluid selection options={Countries} error={country ? true : false} required/>
                  </div>
                  <div className="create-block-row__item"></div>
                </div>
                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Dropdown label="Населенный пункт" placeholder='Начните вводить' name='city' fluid selection options={Cities} error={city ? true : false} required/>
                  </div>
                  <div className="create-block-row__item"></div>
                </div>
                {/*<div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Field>
                      <label>Местоположение</label>
                      <Button>Указать на карте</Button>
                    </Form.Field>
                  </div>
                </div>*/}
                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Dropdown label="Тип предложения" placeholder='Выберите тип предложения' name='typeDeal' fluid selection options={TypeDeal} error={typeDeal ? true : false} required/>
                  </div>
                  <div className="create-block-row__item"></div>
                </div>
                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Dropdown label="Тип недвижимости" placeholder='Выберите тип вашей недвижимости' name='typeProperty' fluid selection options={TypeProperty} error={typeProperty ? true : false} required/>
                  </div>
                  <div className="create-block-row__item"></div>
                </div>
               <div className="create-block-row">
                <div className="create-block-row__item">
                  <Form.Field>
                    <label>Общая площадь</label>
                    <Input label={{ basic: true, content: 'm²' }} placeholder='Введите площадь...' name='ratio' type="number" fluid  labelPosition='right' error={ratio ? true : false} required/>
                  </Form.Field>
                </div>
                <div className="create-block-row__item"></div>
              </div>
                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Group widths='equal' style={{marginBottom: 0}}>
                      <Form.Field>
                        <label>Цена</label>
                        <Input label={{ basic: true, content: '€' }} placeholder='Введите цену в евро' name='price' type="number" fluid labelPosition='right' error={price ? true : false} required/>
                      </Form.Field>
                      <Form.Select label='Период оплаты' name='paymentPeriod' options={PaymentPeriod} placeholder='Выберите период оплаты' error={paymentPeriod ? true : false} required/>
                    </Form.Group>
                  </div>
                  <div className="create-block-row__item"></div>
                </div>

                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Group widths='equal' style={{marginBottom: 0}}>
                      <Form.Input label="Кол-во спален" placeholder='1' name='bedrooms' type="number" fluid/>
                      <Form.Input label="Кол-во санузлов" placeholder='2' name='bathrooms' type="number" fluid/>
                      <Form.Input label="Этаж" placeholder='4' name='floor' type="number" fluid/>
                    </Form.Group>
                  </div>
                  <div className="create-block-row__item"></div>
                </div>

                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Dropdown label="Удобства" placeholder='Выберите удобства' name='comfortList' multiple fluid selection renderLabel={comfortListLabel} options={ComfortList} />
                  </div>
                </div>

                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Input label="Заголовок объявления" placeholder='' name='headline' type="text" fluid error={headline ? true : false} required/>
                  </div>
                  <div className="create-block-row__item">
                  </div>
                </div>

                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.TextArea name='description' label='Описание объявления' rows='3' error={desc ? true : false} required/>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-block">
              <div className="create-block__item">
                <div className="create-block-headline">
                  Шаг 2: Фотография
                </div>
              </div>
              <div className="create-block__item">
                <div className="create-block-row">
                  <CreatePhoto main={true} id="0" photoUrl=""/>
                </div>
                <div className="create-block-row">
                  <CreatePhoto id="1" photoUrl=""/>
                  <CreatePhoto id="2" photoUrl=""/>
                  <CreatePhoto id="3" photoUrl=""/>
                  <CreatePhoto id="4" photoUrl=""/>
                </div>
              </div>
            </div>
            <div className="create-block">
              <div className="create-block__item">
              </div>
              <div className="create-block__item">
                <div className="create-block-headline">
                  Шаг 3: Контакты
                </div>
              </div>
              <ContactsAdd 
                defaultContacts={contacts}
                contactsNumber={contactsNumber}
                message={message} 
              />
              <Button onClick={this.contactAdd} circular icon='plus' />
              <Button onClick={this.contactRemove} circular icon='minus' />
            </div>
            {message ? 
              <Message size="tiny" negative>
                <Message.Header>{message}</Message.Header>
                <Message.List>
                  {phone ? <Message.Item>{phone}</Message.Item> : null}
                  {email ? <Message.Item>{email}</Message.Item> : null}
                  {price ? <Message.Item>{price}</Message.Item> : null}
                  {country ? <Message.Item>{country}</Message.Item> : null}
                  {headline ? <Message.Item>{headline}</Message.Item> : null}
                  {desc ? <Message.Item>{desc}</Message.Item> : null}
                  {paymentPeriod ? <Message.Item>{paymentPeriod}</Message.Item> : null}
                  {city ? <Message.Item>{city}</Message.Item> : null}
                  {typeDeal ? <Message.Item>{typeDeal}</Message.Item> : null}
                  {typeProperty ? <Message.Item>{typeProperty}</Message.Item> : null}
                  {ratio ? <Message.Item>{ratio}</Message.Item> : null}
                </Message.List>
              </Message>
            : null}
            <div className="create-block-confirm">
              <div className="create-block-confirm__item">
                <Button type="submit" size='big' primary>Готово</Button>
              </div>
            </div>
          </Form>
        </div>
      );
    } else {
      return(
        <Message
          warning
          header='Войдите или зарегистрируйтесь'
          content='Добавление объявления доступно только авторизированным пользователям'
        />
      );
    }
  }
}

Create.propTypes = {};