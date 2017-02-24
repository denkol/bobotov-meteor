import React, { Component } from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Dropdown } from 'semantic-ui-react'
import CreatePhoto from '../../create-photo/CreatePhoto.jsx';
import ContactsAdd from '../../contacts-add/ContactsAdd.jsx';

const countries = [ 
  { key: 'me', value: 'me', flag: 'me', text: 'Черногория' }
];

const cities = [
  { key: 'be', value: 'becici', text: 'Бечичи' },
];

const typeDeal = [
  { key: 'rl', value: 'rent_long', text: 'Аренда долгосрочная' },
  { key: 'rs', value: 'rent_short', text: 'Аренда краткосрочная' },
  { key: 'sl', value: 'sale', text: 'Продажа' },
];

const typeProperty = [
  { key: 'ap', value: 'appart', text: 'Квартира / Аппартамент' },
  { key: 'rm', value: 'room', text: 'Комната' },
  { key: 'ht', value: 'hotel', text: 'Отель / Мотель / Гостиница' },
  { key: 'ms', value: 'mansion', text: 'Вилла / Особняк' },
  { key: 'hm', value: 'home', text: 'Дом / Коттедж' },
  { key: 'of', value: 'office', text: 'Офис' },
  { key: 'co', value: 'commercial', text: 'Коммерческое помещение' },
  { key: 'ot', value: 'other', text: 'Другое' }
];

const paymentPeriod = [
  { key: 'fu', value: 'full', text: 'За объект' },
  { key: 'mo', value: 'month', text: 'В месяц' },
  { key: 'da', value: 'day', text: 'В сутки' },
  { key: 'we', value: 'week', text: 'В неделю' }
];

/* Comfort List */
const comfortListLabel = (label, index, props) => ({
  color: 'blue',
  content: `${label.text}`
})

const comfortList = [
  { key: 'we', value: 'week', text: 'Баня / Сауна' },
  { key: 'col', value: 'cool', text: 'Холодильник' },
  { key: 'in', value: 'internet', text: 'Интернет / Wi-Fi' },
  { key: 'pl', value: 'pool', text: 'Открытый бессен' },
  { key: 'tr', value: 'traning_room', text: 'Тренажерный зал' },
  { key: 'bc', value: 'beach', text: 'Пляж-поблизости' },
  { key: 'de', value: 'disabled_equipment', text: 'Оборудование для инвалидов' },
  { key: 'pr', value: 'parking', text: 'Парковка' },
  { key: 'la', value: 'laundry', text: 'Прачечная' },
  { key: 'ac', value: 'ac', text: 'Кондиционер' },
  { key: 'tv', value: 'tv', text: 'Телевидение' },
  { key: 'fp', value: 'fireplace', text: 'Камин' },
  { key: 'cm', value: 'coffeMaker', text: 'Кофеварка' },
  { key: 'ke', value: 'kettle', text: 'Чайник' },
  { key: 'di', value: 'dishwasher', text: 'Посудомоечная машина' },
  { key: 'wa', value: 'washer', text: 'Стиральная машина' },
  { key: 'tr', value: 'transfer', text: 'Трансфер из/в аэропорт' },
  { key: 'mw', value: 'microwave', text: 'Микроволновая печь' },
  { key: 'vi', value: 'view', text: 'Панорамный вид' },
];

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = { formData: {}, contactsNumber: 1 }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.contactAdd = this.contactAdd.bind(this);
    this.contactRemove = this.contactRemove.bind(this);
  }
  componentDidMount() {
    Session.keys = {} //reset session
  }
  handleChange(e, { value }) {
    this.setState({ value })
  }
  handleSubmit(e, { formData }) {
    e.preventDefault()
    this.setState({ formData });
    
    function getOtherPhotos() {
      let listeningPhotos = [];
      for (let i = 1; i <= 4; i++) {
        if(Session.get(i + "photo")) {
          listeningPhotos.push( Session.get(i + "photo") );
        }
      }
      return listeningPhotos;
    }

    let typeDeal = formData.typeDeal;
    let typeProperty = formData.typeProperty;
    let country = formData.country;
    let city = formData.city;
    let location = "formData.location";
    let ratio = formData.ratio;
    let bedrooms = formData.bedrooms;
    let bathrooms = formData.bathrooms;
    let floor = formData.floor;
    let price = formData.price;
    let paymentPeriod = formData.paymentPeriod;
    let comfortList = formData.comfortList;
    let headline = formData.headline;
    let desc = formData.description;

    let photos = {
      main: Session.get('0photo'),
      other: getOtherPhotos()
    }
    let contacts = [
      { contactKey: "Телефон", contactValue: "+7 (999) 899-898-32"},
      { contactKey: "Телефон", contactValue: "+7 (999) 899-898-32"},
      { contactKey: "Телефон", contactValue: "+7 (999) 899-898-32"},
    ];

    let options = [
      { optionName: "Страна", optionValue: "Черногория" },
      { optionName: "Город", optionValue: "Будва" },
      { optionName: "Площадь", optionValue: "32" },
      { optionName: "ratio", optionValue: "32" },
      { optionName: "ratio", optionValue: "32" }
    ];

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
    Meteor.call('listeningCreate', listeningCandidate, (err, res) => {
      if(err) {console.log(err)} 
      else {
        FlowRouter.go('/mylistenings');
        console.log(res)
      }
    });
    console.log(listeningCandidate)
  }
  contactAdd() {
    if(this.state.contactsNumber < 10 ) {
      this.setState({
        contactsNumber: this.state.contactsNumber + 1
      });
    }
  }
  contactRemove() {
    if(this.state.contactsNumber > 1) {
      this.setState({
        contactsNumber: this.state.contactsNumber - 1
      });
    }
  }
  render() {
    const { formData, value } = this.state;
    const userId = Meteor.userId();
    let defaultData;
    if(this.props.defaultData) {
      defaultData = this.props.defaultData;
      console.log(defaultData);
    }
    if(userId) {
      return (
        <div>
          <div className="headline-icon">
            <div className="headline-icon__icon">
              <svg className="ico-create" role="img">
                <use xlinkHref="#ico-create" />
              </svg>
            </div>
            <div className="headline-icon__text">Новое объявление</div>
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
                      <Form.Dropdown label="Страна" placeholder='Выберите страну' name='country' fluid selection options={countries} />
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Dropdown label="Населенный пункт" placeholder='Начните вводить' name='city' fluid selection options={cities} />
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
                      <Form.Dropdown label="Тип предложения" placeholder='Выберите тип предложения' name='typeDeal' fluid selection options={typeDeal} />
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Dropdown label="Тип недвижимости" placeholder='Выберите тип вашей недвижимости' name='typeProperty' fluid selection options={typeProperty} />
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>
                 <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Field>
                      <label>Общая площадь</label>
                      <Input label={{ basic: true, content: 'm²' }} placeholder='Введите площадь...' name='ratio' type="number" fluid  labelPosition='right' />
                    </Form.Field>
                  </div>
                  <div className="create-block-row__item"></div>
                </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Group widths='equal' style={{marginBottom: 0}}>
                        <Form.Field>
                          <label>Цена</label>
                          <Input label={{ basic: true, content: '€' }} placeholder='Введите цену в евро' name='price' type="number" fluid  labelPosition='right' />
                        </Form.Field>
                        <Form.Select label='Период оплаты' name='paymentPeriod' options={paymentPeriod} placeholder='Выберите период оплаты' />
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
                      <Form.Dropdown label="Удобства" placeholder='Выберите удобства' name='comfortList' multiple fluid selection renderLabel={comfortListLabel} options={comfortList} />
                    </div>
                  </div>


                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Input label="Заголовок объявления" placeholder='' name='headline' type="text" fluid/>
                    </div>
                    <div className="create-block-row__item">
                    </div>
                  </div>

                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.TextArea name='description' label='Описание объявления' placeholder='Почему люди должны обратить внимание на ваше объявление?' rows='3' />
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
                  <div className="create-block-headline">
                    Шаг 3: Контакты
                  </div>
                </div>
                <ContactsAdd 
                  contacts={[]}
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