import React, { Component } from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { PaymentPeriod, TypeProperty, TypeDeal, Cities, Countries, ComfortList} from '../../../data/data.js';
import CreatePhoto from '../../create-photo/CreatePhoto.jsx';
import ContactsAdd from '../../contacts-add/ContactsAdd.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../../api/listenings.js';
import {isValidEmail, isValidPhone} from "/imports/functions/validation.js";

/* Semantic UI */
import { Loader, Dimmer, Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Dropdown } from 'semantic-ui-react';

/* Comfort List */
const comfortListLabel = (label, index, props) => ({
  color: 'blue',
  content: `${label.text}`
})

function getOtherPhotos() {
  let listeningPhotos = [];
  for (let i = 1; i <= 4; i++) {
    if(Session.get(i + "photo")) {
      listeningPhotos.push( Session.get(i + "photo") );
    }
  }
  return listeningPhotos;
}

class CreateEdit extends Component {
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
      contacts: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.contactAdd = this.contactAdd.bind(this);
    this.contactRemove = this.contactRemove.bind(this);
  }
  componentWillUnmount() {
    Session.clear()
  }
  componentWillMount() {
    window.scrollTo(0, 0); //scroll to top
    Session.clear()
  }

  handleSubmit(e, { formData }) {
    e.preventDefault()
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
    const listeningId = this.props.listeningId;
    
    const message = "У вас ошибки при заполнении формы, исправьте ошибки и попробуйте снова"; 

    function getContacts() {
      const contactsNumber = self.state.contactsNumber || _.size(self.props.listeningContacts);
      const contacts = [];
      for(let i = 0; i < contactsNumber; i++) {
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
        
        contacts.push({contactKey, contactValue, message});
      }
      return contacts;
    }

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
    const comfortList = formData.comfortList;
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
    //console.log(listeningCandidate);
    
    const hasError = _.some(contacts, contact => !_.isUndefined(contact.message));
    
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
    } if(!desc) {console.log('!desc', !desc);
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
    
    if(hasError || !price || !country || !headline || !desc || !paymentPeriod || !city || !typeDeal || !typeProperty || !ratio ) return;
    Meteor.call('listeningEdit', listeningId, listeningCandidate, (err, res) => {
      if(err) {console.log(err)} 
      else {
        FlowRouter.go('/mylistenings');
      }
    });

  }
  contactAdd(contactsNumber) {    
    return e => {
    	 e.preventDefault();
       if(contactsNumber < 10 ) {
      	this.setState({
        	  contactsNumber: contactsNumber + 1
      	});
    	 }
    };        
  }
  contactRemove(contactsNumber) {
    return e => {
    	 e.preventDefault();
       if(contactsNumber > 1 ) {
      	this.setState({
        	  contactsNumber: contactsNumber - 1
      	});
    	 }
    };        
  }
  render() {
    const { message, phone, email, price, country, headline, desc, paymentPeriod, city, typeDeal, typeProperty, ratio } = this.state.validation; 
    const { contacts } = this.state; 
    let { contactsNumber } = this.state; 
    const { loading, listening } = this.props;
    const userId = Meteor.userId();

    if(loading) {
      contactsNumber = contactsNumber || _.size(listening.listeningContacts);
      /* Get other photos */
      function setOtherPhotos(photos) {
        var temp = [];
        if(photos) {
          for(var i = 0; i < photos.length; i++) {
            Session.set((i+1) + "photo", photos[i]);
          }
        }
        return temp;
      }
      
      const listeningPhotos = listening.listeningPhotos;
      //console.log(listeningPhotos);
      Session.set("0photo", listeningPhotos.main);
      setOtherPhotos(listeningPhotos.other);
      
      const defaultValue = {
        country: listening.listeningInfo.country,
        city: listening.listeningInfo.city,
        typeDeal: listening.listeningInfo.typeDeal,
        typeProperty: listening.listeningInfo.typeProperty,
        paymentPeriod: listening.listeningInfo.paymentPeriod,
        price: listening.listeningInfo.price,
        floor: listening.listeningInfo.floor,
        bedrooms: listening.listeningInfo.bedrooms,
        bathrooms: listening.listeningInfo.bathrooms,
        ratio: listening.listeningInfo.ratio,
        headline: listening.listeningInfo.headline,
        desc: listening.listeningInfo.desc,
        comfortList: listening.listeningInfo.comfortList,
        contacts: listening.listeningContacts
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
                  <div className="headline-icon__text">Новое объявление</div>
                </div>
              </div>
            </div>
            <Form className={"create-wrapper"} onSubmit={this.handleSubmit}>
              <div className="create-block">
                <div className="create-block__item">
                  <div className="create-block-headline">Шаг 1: Общая информация</div>
                </div>
                <div className="create-block__item">
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Dropdown label="Страна" placeholder='Выберите страну' name='country' fluid selection options={Countries} defaultValue={defaultValue.country} error={country ? true : false} />
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Dropdown label="Населенный пункт" placeholder='Начните вводить' name='city' fluid selection options={Cities} defaultValue={defaultValue.city} error={city ? true : false} />
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Field>
                        <label>Местоположение</label>
                        <Button>Указать на карте</Button>
                      </Form.Field>
                    </div>
                  </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Dropdown label="Тип предложения" placeholder='Выберите тип предложения' name='typeDeal' fluid selection options={TypeDeal} defaultValue={defaultValue.typeDeal} error={typeDeal ? true : false} />
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Dropdown label="Тип недвижимости" placeholder='Выберите тип вашей недвижимости' name='typeProperty' fluid selection options={TypeProperty} defaultValue={defaultValue.typeProperty} error={typeProperty ? true : false} />
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>
                 <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Field>
                      <label>Общая площадь</label>
                      <Input label={{ basic: true, content: 'm²' }} placeholder='Введите площадь...' name='ratio' type="number" fluid  labelPosition='right' defaultValue={defaultValue.ratio} error={ratio ? true : false} />
                    </Form.Field>
                  </div>
                  <div className="create-block-row__item"></div>
                </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Group widths='equal' style={{marginBottom: 0}}>
                        <Form.Field>
                          <label>Цена</label>
                          <Input label={{ basic: true, content: '€' }} placeholder='Введите цену в евро' name='price' type="number" fluid labelPosition='right' defaultValue={defaultValue.price} error={price ? true : false}/>
                        </Form.Field>
                        <Form.Select label='Период оплаты' name='paymentPeriod' options={PaymentPeriod} placeholder='Выберите период оплаты' defaultValue={defaultValue.paymentPeriod} error={paymentPeriod ? true : false}/>
                      </Form.Group>
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>

                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Group widths='equal' style={{marginBottom: 0}}>
                        <Form.Input defaultValue={defaultValue.bedrooms} label="Кол-во спален" placeholder='1' name='bedrooms' type="number" fluid/>
                        <Form.Input defaultValue={defaultValue.bathrooms} label="Кол-во санузлов" placeholder='2' name='bathrooms' type="number" fluid/>
                        <Form.Input defaultValue={defaultValue.floor} label="Этаж" placeholder='4' name='floor' type="number" fluid/>
                      </Form.Group>
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>

                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Dropdown label="Удобства" placeholder='Выберите удобства' name='comfortList' multiple fluid selection renderLabel={comfortListLabel} options={ComfortList} defaultValue={defaultValue.comfortList} />
                    </div>
                  </div>

                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Input defaultValue={defaultValue.headline} label="Заголовок объявления" placeholder='' name='headline' type="text" fluid error={headline ? true : false}/>
                    </div>
                    <div className="create-block-row__item">
                    </div>
                  </div>

                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.TextArea defaultValue={defaultValue.desc} name='description' label='Описание объявления' placeholder='Почему люди должны обратить внимание на ваше объявление?' rows='3' error={desc ? true : false}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="create-block">
                <div className="create-block__item">
                  <div className="create-block-headline">Шаг 2: Фотография</div>
                </div>
                <div className="create-block__item">
                  <div className="create-block-row">
                    <CreatePhoto main={true} id="0" photoUrl={listeningPhotos.main || ""}/>
                  </div>
                  <div className="create-block-row">
                    <CreatePhoto id="1" photoUrl={Session.get('1photo') || ""}/>
                    <CreatePhoto id="2" photoUrl={Session.get('2photo') || ""}/>
                    <CreatePhoto id="3" photoUrl={Session.get('3photo') || ""}/>
                    <CreatePhoto id="4" photoUrl={Session.get('4photo') || ""}/>
                  </div>
                </div>
              </div>
              <div className="create-block">
                <div className="create-block__item">
                	{message ? 
                  	<Message compact negative>
                     	<Message.Header>{message}</Message.Header>
                     	{phone ? <p>{phone}</p> : null}
                     	{email ? <p>{email}</p> : null}
                     	{price ? <p>{price}</p> : null}
                     	{country ? <p>{country}</p> : null}
                     	{headline ? <p>{headline}</p> : null}
                     	{desc ? <p>{desc}</p> : null}
                     	{paymentPeriod ? <p>{paymentPeriod}</p> : null}
                  	</Message>
    				 	: null}
                </div>
                <div className="create-block__item">
                  <div className="create-block-headline">Шаг 3: Контакты</div>
                </div>
                <ContactsAdd 
                  defaultContacts={contacts || defaultValue.contacts}
                  contactsNumber={contactsNumber}
                  message={message} 
                />
                <Button onClick={this.contactAdd(contactsNumber)} circular icon='plus' />
                <Button onClick={this.contactRemove(contactsNumber)} circular icon='minus' />
              </div>
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
    } else {
      return (
        <div>
          <Dimmer inverted active>
            <Loader indeterminate>Загрузка...</Loader>
          </Dimmer>
         </div>
      );
    }
  }
}

CreateEdit.propTypes = {};


export default createContainer(({ listeningId }) => {
  const id = listeningId;
  const listeningSubs = Meteor.subscribe('listenings.all');
  const loading = listeningSubs.ready();
  const listening = Listenings.findOne({_id: id});
  const listeningContacts = listening ? listening.listeningContacts : [];
  return { loading, listening, listeningContacts };
}, CreateEdit);