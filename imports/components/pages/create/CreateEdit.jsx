import React, { Component } from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { PaymentPeriod, TypeProperty, TypeDeal, Cities, Countries, ComfortList} from '../../../data/data.js';
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Dropdown } from 'semantic-ui-react';
import CreatePhoto from '../../create-photo/CreatePhoto.jsx';
import ContactsAdd from '../../contacts-add/ContactsAdd.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../../api/listenings.js';
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
    this.state = { formData: {}, contactsNumber: 0 }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.contactAdd = this.contactAdd.bind(this);
    this.contactRemove = this.contactRemove.bind(this);
  }
  componentWillUnmount() {
    Session.clear()
  }
  handleChange(e, { value }) {
    this.setState({ value })
  }
  handleSubmit(e, { formData }) {
    e.preventDefault()
    this.setState({ formData });
    let self = this;
    
    let listeningId = this.props.listeningId;

    function getContacts() {
      let contacts = [];
      for(let i = 0; i <= self.state.contactsNumber; i++) {
        let dropdownDeafultValue = "email";
        let contactKey = Session.get('dropdown'+i) ? Session.get('dropdown'+i) : dropdownDeafultValue;
        let contactValue = formData["input"+i];
        contacts.push({contactKey: contactKey, contactValue: contactValue})
      }
      return contacts;
    }
    

    let typeDeal = formData.typeDeal;
    let typeProperty = formData.typeProperty;
    let country = formData.country;
    let city = formData.city;
    let location = "formData.location";
    let ratio = parseInt(formData.ratio);
    let bedrooms = parseInt(formData.bedrooms);
    let bathrooms = parseInt(formData.bathrooms);
    let floor = parseInt(formData.floor);
    let price = parseInt(formData.price);
    let paymentPeriod = formData.paymentPeriod;
    let comfortList = formData.comfortList;
    let headline = formData.headline;
    let desc = formData.description;

    let photos = {
      main: Session.get('0photo'),
      other: getOtherPhotos()
    }

    let options = [
      { optionName: "Страна", optionValue: "Черногория" },
      { optionName: "Город", optionValue: "Будва" },
      { optionName: "Площадь", optionValue: "32" },
      { optionName: "ratio", optionValue: "32" },
      { optionName: "ratio", optionValue: "32" }
    ];

    let contacts = getContacts();

    let listeningCandidate = {
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
    if(!Session.get('0photo')) {
      alert('Загрузите главное фото')
    } else if(!formData.city) {
      alert('Укажите город')
    } else if(!formData.country) {
      alert('Укажите страну')
    } else if(!formData.typeProperty) {
      alert('Укажите тип недвижимости')
    } else if(!formData.typeDeal) {
      alert('Укажите тип сделки')
    } else {
      Meteor.call('listeningEdit', listeningId, listeningCandidate, (err, res) => {
        if(err) {console.log(err)} 
        else {
          FlowRouter.go('/mylistenings');
        }
      });
    }
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
    if(this.state.contactsNumber > 0) {
      this.setState({
        contactsNumber: this.state.contactsNumber - 1
      });
    }
  }
  render() {
    const { formData, value } = this.state;
    const userId = Meteor.userId();
    let loading = this.props.loading;
    let listening = this.props.listening;
    if(loading) {
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
      
      Session.set("0photo", listening.listeningPhotos.main)
      setOtherPhotos(listening.listeningPhotos.other)
      
      let defaultValue = {
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
                      <Form.Dropdown label="Страна" placeholder='Выберите страну' name='country' fluid selection options={Countries} defaultValue={defaultValue.country} />
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Dropdown label="Населенный пункт" placeholder='Начните вводить' name='city' fluid selection options={Cities} defaultValue={defaultValue.city} />
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
                      <Form.Dropdown label="Тип предложения" placeholder='Выберите тип предложения' name='typeDeal' fluid selection options={TypeDeal} defaultValue={defaultValue.typeDeal} />
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Dropdown label="Тип недвижимости" placeholder='Выберите тип вашей недвижимости' name='typeProperty' fluid selection options={TypeProperty} defaultValue={defaultValue.typeProperty}/>
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>
                 <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Field>
                      <label>Общая площадь</label>
                      <Input label={{ basic: true, content: 'm²' }} placeholder='Введите площадь...' name='ratio' type="number" fluid  labelPosition='right' defaultValue={defaultValue.ratio}/>
                    </Form.Field>
                  </div>
                  <div className="create-block-row__item"></div>
                </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Group widths='equal' style={{marginBottom: 0}}>
                        <Form.Field>
                          <label>Цена</label>
                          <Input label={{ basic: true, content: '€' }} placeholder='Введите цену в евро' name='price' type="number" fluid labelPosition='right' defaultValue={defaultValue.price}/>
                        </Form.Field>
                        <Form.Select label='Период оплаты' name='paymentPeriod' options={PaymentPeriod} placeholder='Выберите период оплаты' defaultValue={defaultValue.paymentPeriod}/>
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
                      <Form.Input defaultValue={defaultValue.headline} label="Заголовок объявления" placeholder='' name='headline' type="text" fluid/>
                    </div>
                    <div className="create-block-row__item">
                    </div>
                  </div>

                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.TextArea defaultValue={defaultValue.desc} name='description' label='Описание объявления' placeholder='Почему люди должны обратить внимание на ваше объявление?' rows='3'/>
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
                    <CreatePhoto main={true} id="0" photoUrl={Session.get('0photo') ? Session.get('0photo') : ""}/>
                  </div>
                  <div className="create-block-row">
                    <CreatePhoto id="1" photoUrl={Session.get('1photo') ? Session.get('1photo') : ""}/>
                    <CreatePhoto id="2" photoUrl={Session.get('2photo') ? Session.get('2photo') : ""}/>
                    <CreatePhoto id="3" photoUrl={Session.get('3photo') ? Session.get('3photo') : ""}/>
                    <CreatePhoto id="4" photoUrl={Session.get('4photo') ? Session.get('4photo') : ""}/>
                  </div>
                </div>
              </div>
              <div className="create-block">
                <div className="create-block__item">
                  <div className="create-block-headline">Шаг 3: Контакты</div>
                </div>
                <ContactsAdd 
                  defaultContacts={defaultValue.contacts}
                  contactsNumber={this.state.contactsNumber}
                />
                <Button onClick={this.contactAdd} circular icon='plus' />
                <Button onClick={this.contactRemove} circular icon='minus' />
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
      return (<div>loading</div>);
    }
  }
}

CreateEdit.propTypes = {};


export default createContainer(({ listeningId }) => {
  const id = listeningId;
  const listeningSubs = Meteor.subscribe('listenings.all');
  const loading = listeningSubs.ready();
  const listening = Listenings.findOne({_id: listeningId});
  const listeningContacts = listening ? listening.listeningContacts : [];
  return { loading, listening, listeningContacts };
}, CreateEdit);