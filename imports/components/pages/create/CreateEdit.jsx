import React, { Component } from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { PaymentPeriod, TypeProperty, TypeDeal, Cities, Countries, ComfortList} from '../../../data/data.js';
import { Random } from 'meteor/random';
import CreatePhoto from '../../create-photo/CreatePhoto.jsx';
import ContactsAdd from '../../contacts-add/ContactsAdd.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Listenings } from '../../../api/listenings.js';
import {isValidEmail, isValidPhone} from "/imports/functions/validation.js";
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import Loading from '../../loading/Loading.jsx';

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

  countriesOptions() {
    const { t } = this.props

    return Countries.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`countries.${value}`)
    }))
  }

  citiesOptions(value) {
    const { t } = this.props

    return Cities.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`cities.${value}`)
    }))
  }

  typePropertyOptions(value) {
    const { t } = this.props

    return TypeProperty.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`typeProperty.${value}`)
    }))
  }

  typeDealOptions(value) {
    const { t } = this.props

    return TypeDeal.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`typeDeal.${value}`)
    }))
  }

  paymentPeriodOptions(value) {
    const { t } = this.props

    return PaymentPeriod.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`paymentPeriod.${value}`)
    }))
  }

  comfortListOptions() {
    const { t } = this.props

    return ComfortList.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`comfortList.${value}`)
    }))
  }

  handleSubmit(e, { formData }) {
    const { t } = this.props;

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

    const message = t('messages:dinamiclyErrors.formError');

    function getContacts() {
      const contactsNumber = self.state.contactsNumber || _.size(self.props.listeningContacts);
      const contacts = [];
      for(let i = 0; i < contactsNumber; i++) {
        const dropdownDeafultValue = "email";
        const contactKey = Session.get('dropdown'+i) ? Session.get('dropdown'+i) : dropdownDeafultValue;
        const contactValue = formData["input"+i];

        if(contactKey === "phone" && !isValidPhone(contactValue)) {
          validation.message = message;
          validation.phone = t('messages:dinamiclyErrors.invalidPhone');
          self.setState({ validation });
        }

        if(contactKey === "email" && !isValidEmail(contactValue)) {
          validation.message = message;
          validation.email = t('messages:dinamiclyErrors.invalidEmail');
          self.setState({ validation });
        }

        contacts.push({contactKey, contactValue, message: validation.message});
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
      "listeningContacts": contacts
    }

    const hasError = _.some(contacts, contact => !_.isEmpty(contact.message));

    if(!price) {
      validation.message = message;
      validation.price = t('messages:dinamiclyErrors.emptyPriceField');
      self.setState({ validation });
    } if(!country) {
      validation.message = message;
      validation.country = t('messages:dinamiclyErrors.emptyCountryField');
      self.setState({ validation });
    } if(!headline) {
      validation.message = message;
      validation.headline = t('messages:dinamiclyErrors.emptyHeadlineField');
      self.setState({ validation });
    } if(!desc) {
    	validation.message = message;
      validation.desc = t('messages:dinamiclyErrors.emptyDescField');
      self.setState({ validation });
    } if(!paymentPeriod) {
      validation.message = message;
      validation.paymentPeriod = t('messages:dinamiclyErrors.emptyPaymentField');
      self.setState({ validation });
    } if(!city) {
      validation.message = message;
      validation.city = t('messages:dinamiclyErrors.emptyCityField');
      self.setState({ validation });
    } if(!typeDeal) {
      validation.message = message;
      validation.typeDeal = t('messages:dinamiclyErrors.emptyDealField');
      self.setState({ validation });
    } if(!typeProperty) {
      validation.message = message;
      validation.typeProperty = t('messages:dinamiclyErrors.emptyTypeField');
      self.setState({ validation });
    } if(!ratio) {
      validation.message = message;
      validation.ratio =  t('messages:dinamiclyErrors.emptyRatioField');
      self.setState({ validation });
    } if(!Session.get('0photo')) {
      validation.message = message;
      validation.ratio =  t('messages:dinamiclyErrors.emptyPhotoField');
      self.setState({ validation });
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
    const { loading, listening, t, ownerId} = this.props;

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
      const listeningId = listening._id;
      Session.set("0photo", listeningPhotos.main);
      setOtherPhotos(listeningPhotos.other);
      // console.log(this.countriesOptions(listening.listeningInfo.country))
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

      if(ownerId === Meteor.userId()) {
        return (
          <div>
            <Helmet>
              <title>{t('head:titles.edit')+" "+t('head:titles.app')}</title>
            </Helmet>
            <Form className={"create-wrapper"} onSubmit={this.handleSubmit}>
              <div className="create-block">
                <div className="create-block__item">
                  <div className="create-block-headline">{t('createListing.step1')}</div>
                </div>
                <div className="create-block__item">
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Dropdown 
                        label={t('createListing.country.label')}
                        placeholder={t('createListing.country.placeholder')}
                        name='country' 
                        fluid 
                        selection 
                        options={this.countriesOptions()} 
                        defaultValue={defaultValue.country} 
                        error={country ? true : false} 
                        required/>
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Dropdown 
                        label={t('createListing.city.label')}
                        placeholder={t('createListing.city.placeholder')}
                        name='city' 
                        fluid 
                        selection 
                        options={this.citiesOptions()} 
                        defaultValue={defaultValue.city} 
                        error={city ? true : false} 
                        required/>
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
                      <Form.Dropdown 
                        label={t('createListing.typeDeal.label')}
                        placeholder={t('createListing.typeDeal.placeholder')}
                        name='typeDeal' 
                        fluid 
                        selection 
                        options={this.typeDealOptions()} 
                        defaultValue={defaultValue.typeDeal} 
                        error={typeDeal ? true : false} 
                        required/>
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Dropdown 
                      label={t('createListing.typeProperty.label')}
                      placeholder={t('createListing.typeProperty.placeholder')}
                      name='typeProperty' 
                      fluid 
                      selection 
                      options={this.typePropertyOptions()} 
                      defaultValue={defaultValue.typeProperty} 
                      error={typeProperty ? true : false} 
                      required/>
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>
                 <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Field>
                      <label>{t('createListing.square.label')}</label>
                      <Input 
                        label={{ basic: true, content: 'm²' }} 
                        placeholder={t('createListing.square.placeholder')}
                        name='ratio' 
                        type="number" 
                        fluid 
                        labelPosition='right' 
                        defaultValue={defaultValue.ratio} 
                        error={ratio ? true : false} 
                        required/>
                    </Form.Field>
                  </div>
                  <div className="create-block-row__item"></div>
                </div>
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Group widths='equal' style={{marginBottom: 0}}>
                        <Form.Field>
                          <label>{t('createListing.priceFiled.label')}</label>
                          <Input 
                          label={{ basic: true, content: '€' }} 
                          placeholder={t('createListing.priceFiled.placeholder')}
                          name='price' 
                          type="number" 
                          fluid 
                          labelPosition='right' 
                          defaultValue={defaultValue.price} 
                          error={price ? true : false} 
                          required/>
                        </Form.Field>
                        <Form.Select 
                          label={t('createListing.paymentPeriod.label')}
                          name='paymentPeriod' 
                          options={this.paymentPeriodOptions()} 
                          placeholder={t('createListing.paymentPeriod.placeholder')}
                          defaultValue={defaultValue.paymentPeriod} 
                          error={paymentPeriod ? true : false} 
                          required/>
                      </Form.Group>
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>

                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Group widths='equal' style={{marginBottom: 0}}>
                        <Form.Input 
                          defaultValue={defaultValue.bedrooms} 
                          label={t('createListing.bedrooms.label')}
                          placeholder='1' 
                          name='bedrooms' 
                          type="number" 
                          fluid/>
                        <Form.Input 
                          defaultValue={defaultValue.bathrooms} 
                          label={t('createListing.bathrooms.label')}
                          placeholder='2' 
                          name='bathrooms' 
                          type="number" 
                          fluid/>
                        <Form.Input 
                          defaultValue={defaultValue.floor} 
                          label={t('createListing.floor.label')} 
                          placeholder='4' 
                          name='floor' 
                          type="number" 
                          fluid/>
                      </Form.Group>
                    </div>
                    <div className="create-block-row__item"></div>
                  </div>

                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Dropdown 
                        label={t('createListing.comfortList.label')}
                        placeholder={t('createListing.comfortList.placeholder')}
                        name='comfortList' 
                        multiple 
                        fluid 
                        selection 
                        renderLabel={comfortListLabel} 
                        options={this.comfortListOptions()} 
                        defaultValue={defaultValue.comfortList} />
                    </div>
                  </div>

                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Input 
                        defaultValue={defaultValue.headline} 
                        label={t('createListing.yourHeadline.label')}
                        placeholder={t('createListing.yourHeadline.placeholder')}
                        name='headline' 
                        type="text" 
                        fluid 
                        error={headline ? true : false} 
                        required/>
                    </div>
                    <div className="create-block-row__item">
                    </div>
                  </div>

                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.TextArea 
                        defaultValue={defaultValue.desc} 
                        name='description' 
                        label={t('createListing.description.label')}
                        rows='3' 
                        error={desc ? true : false} 
                        required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="create-block">
                <div className="create-block__item">
                  <div className="create-block-headline">{t('createListing.step2')}</div>
                </div>
                <div className="create-block__item">
                  <div className="create-block-row">
                    <CreatePhoto main={true} id="0" photoUrl={listeningPhotos.main || ""} listeningId={listeningId} />
                  </div>
                  <div className="create-block-row">
                    <CreatePhoto id="1" photoUrl={Session.get('1photo') || ""} listeningId={listeningId} />
                    <CreatePhoto id="2" photoUrl={Session.get('2photo') || ""} listeningId={listeningId} />
                    <CreatePhoto id="3" photoUrl={Session.get('3photo') || ""} listeningId={listeningId} />
                    <CreatePhoto id="4" photoUrl={Session.get('4photo') || ""} listeningId={listeningId} />
                  </div>
                </div>
              </div>
              <div className="create-block">
                <div className="create-block__item">

                </div>
                <div className="create-block__item">
                  <div className="create-block-headline">{t('createListing.step3')}</div>
                </div>
                <ContactsAdd
                  defaultContacts={contacts || defaultValue.contacts}
                  contactsNumber={contactsNumber}
                  message={message}
                />
                <Button onClick={this.contactAdd(contactsNumber)} circular icon='plus' />
                <Button onClick={this.contactRemove(contactsNumber)} circular icon='minus' />
              </div>
              {message ?
                <Message size="tiny" negative>
                  <Message.Header>{message}</Message.Header>
                  <Message.List>
                    {price ? <Message.Item>{price}</Message.Item> : null}
                    {country ? <Message.Item>{country}</Message.Item> : null}
                    {headline ? <Message.Item>{headline}</Message.Item> : null}
                    {desc ? <Message.Item>{desc}</Message.Item> : null}
                    {paymentPeriod ? <Message.Item>{paymentPeriod}</Message.Item> : null}
                  </Message.List>
                </Message>: null}
              <div className="create-block-confirm">
                <div className="create-block-confirm__item">
                  <Button type="submit" size='big' primary>{t('createListing.apply')}</Button>
                </div>
              </div>
            </Form>
          </div>
        );
      } else {
        return(
          <Message
            warning
            header={t('messages:needLogin.headline')}
            content={t('messages:needLogin.desc')}
          />
        );
      }
    } else {
      return (
        <Loading />
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
  const ownerId = listening ? listening.listeningTech.ownerId : "";
  return { loading, listening, listeningContacts, ownerId};
  
}, translate('common', { wait: true })(CreateEdit));