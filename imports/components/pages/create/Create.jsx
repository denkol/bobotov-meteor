/* React libs */
import React, { Component } from 'react'
import { translate } from 'react-i18next';
import { Helmet } from "react-helmet";

/* Meteor libs */
import { Random } from 'meteor/random';
import { FlowRouter } from 'meteor/kadira:flow-router';

/* Components */
import CreatePhoto from '../../create-photo/CreatePhoto.jsx';
import ContactsAdd from '../../contacts-add/ContactsAdd.jsx';

/* Some functions */
import { PaymentPeriod, TypeProperty, TypeDeal, Cities, Countries, ComfortList} from '../../../data/data.js';
import {isValidEmail, isValidPhone} from "/imports/functions/validation.js";

/* Semantic UI */
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Dropdown } from 'semantic-ui-react'

/* Material UI */
import Dialog from 'material-ui/Dialog';

/* Other */

/* Comfort List */
const comfortListLabel = (label, index, props) => ({
  color: 'blue',
  content: `${label.text}`
});

class Create extends Component {
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
      contactsNumber: 1,
      listeningId: Random.id(),
      mapModal: {
        open: false,
        submitted: false
      }
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

  countriesOptions() {
    const { t } = this.props

    return Countries.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`countries.${value}`),
      flag: value
    }))
  }

  citiesOptions() {
    const { t } = this.props

    return Cities.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`cities.${value}`)
    }))
  }

  typePropertyOptions() {
    const { t } = this.props

    return TypeProperty.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`typeProperty.${value}`)
    }))
  }

  typeDealOptions() {
    const { t } = this.props

    return TypeDeal.map(({ value }) => ({
      key: Random.id(4),
      value: value,
      text: t(`typeDeal.${value}`)
    }))
  }

  paymentPeriodOptions() {
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

  handleSubmit(e, { formData }) { //console.log(formData);
    e.preventDefault();
    const { t } = this.props;

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

    const message = t('messages:dinamiclyErrors.formError');

    function getContacts() {
      const contacts = [];
      for(let i = 0; i < self.state.contactsNumber; i++) {
        const dropdownDeafultValue = "email";
        const contactKey = Session.get('dropdown'+i) ? Session.get('dropdown'+i) : dropdownDeafultValue;
        const contactValue = formData["input"+i];

        //console.log(contactKey, contactValue);
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

    let photos = {
      main: Session.get('0photo'),
      other: getOtherPhotos()
    }
    const contacts = getContacts();
    self.setState({ contacts });

    const hasError = _.some(contacts, contact => !_.isEmpty(contact.message));

    const listeningCandidate = {
      _id: this.state.listeningId,
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
    } if(!photos.main) {
      validation.message = message;
      validation.ratio =  t('messages:dinamiclyErrors.emptyPhotoField');
      self.setState({ validation });
    }

    // console.log(hasError, !price, !country, !headline, !desc, !paymentPeriod, !city, !typeDeal, !typeProperty, !ratio)
    
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
    const { t } = this.props;
    const { message, phone, email, price, country, headline, desc, paymentPeriod, city, typeDeal, typeProperty, ratio } = this.state.validation;
    const { contactsNumber, contacts, listeningId } = this.state;
    const userId = Meteor.userId();
    const MapModal = (props) => {
      const actions = [
        <Button onClick={this.handleMapClose} content="Cancel"/>,
        <Button onClick={this.handleMapSubmit} primary content="Submit" />
      ];
      return (
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.mapModal.open}
          onRequestClose={this.handleMapClose}
          style={{padding: 10 + "px"}}
        >
        {props.content}
        </Dialog>
      );
    };
    if(userId) {
      return (
        <div className="createWrapper">
          <Helmet>
            <title>{t('head:titles.create')+" "+t('head:titles.app')}</title>
          </Helmet>
          <div className="headline">
            <div className="headline__item">
              <div className="headline-icon">
                <div className="headline-icon__icon">
                  <svg className="ico-create" role="img"><use xlinkHref="#ico-create" /></svg>
                </div>
                <div className="headline-icon__text">
                  {t('createListing.headline')}
                </div>
              </div>
            </div>
          </div>
          <Form className={"create-wrapper"} onSubmit={this.handleSubmit}>
            <div className="create-block">
              <div className="create-block__item">
                <div className="create-block-headline">
                  {t('createListing.step1')}
                </div>
              </div>
              <div className="create-block__item">
                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Dropdown
                      label={t('createListing.country.label')}
                      placeholder={t('createListing.country.placeholder')}
                      name='country'
                      options={this.countriesOptions()}
                      error={country ? true : false}
                      fluid
                      selection
                      required
                    />
                  </div>
                  <div className="create-block-row__item"></div>
                </div>
                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Dropdown
                      label={t('createListing.city.label')}
                      placeholder={t('createListing.city.placeholder')}
                      name='city'
                      options={this.citiesOptions()}
                      error={city ? true : false}
                      fluid
                      selection
                      required
                    />
                  </div>
                  <div className="create-block-row__item"></div>
                </div>
                {/*<div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Field>
                      <label>Местоположение</label>
                      <Button 
                        onClick={this.handleMapOpen} 
                        icon={this.state.mapModal.submitted ? "checkmark" : false}
                        content={this.state.mapModal.submitted ? "Местоположение сохранено" : "Указать на карте"}
                        positive={this.state.mapModal.submitted ? true : false}
                      />
                    </Form.Field>
                  </div>
                </div>*/}
                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Dropdown
                      label={t('createListing.typeDeal.label')}
                      placeholder={t('createListing.typeDeal.placeholder')}
                      name='typeDeal'
                      options={this.typeDealOptions()}
                      error={typeDeal ? true : false}
                      fluid
                      selection
                      required
                    />
                  </div>
                  <div className="create-block-row__item"></div>
                </div>
                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Dropdown
                      label={t('createListing.typeProperty.label')}
                      placeholder={t('createListing.typeProperty.placeholder')}
                      name='typeProperty'
                      options={this.typePropertyOptions()}
                      error={typeProperty ? true : false}
                      fluid
                      selection
                      required
                    />
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
                      labelPosition='right'
                      error={ratio ? true : false}
                      required
                      fluid
                    />
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
                          error={price ? true : false}
                          required
                        />
                      </Form.Field>
                      <Form.Select
                        label={t('createListing.paymentPeriod.label')}
                        name='paymentPeriod'
                        options={this.paymentPeriodOptions()}
                        placeholder={t('createListing.paymentPeriod.placeholder')}
                        error={paymentPeriod ? true : false}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="create-block-row__item"></div>
                </div>

                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Group widths='equal' style={{marginBottom: 0}}>
                      <Form.Input label={t('createListing.bedrooms.label')} placeholder='1' name='bedrooms' type="number" fluid/>
                      <Form.Input label={t('createListing.bathrooms.label')} placeholder='2' name='bathrooms' type="number" fluid/>
                      <Form.Input label={t('createListing.floor.label')} placeholder='4' name='floor' type="number" fluid/>
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
                      renderLabel={comfortListLabel}
                      options={this.comfortListOptions()}
                      multiple
                      fluid
                      selection
                    />
                  </div>
                </div>

                <div className="create-block-row">
                  <div className="create-block-row__item">
                    <Form.Input 
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
                <div className="create-block-headline">
                  {t('createListing.step2')}
                </div>
              </div>
              <div className="create-block__item">
                <div className="create-block-row">
                  <CreatePhoto main={true} id="0" photoUrl="" listeningId={listeningId} />
                </div>
                <div className="create-block-row">
                  <CreatePhoto id="1" photoUrl="" listeningId={listeningId} />
                  <CreatePhoto id="2" photoUrl="" listeningId={listeningId} />
                  <CreatePhoto id="3" photoUrl="" listeningId={listeningId} />
                  <CreatePhoto id="4" photoUrl="" listeningId={listeningId} />
                </div>
              </div>
            </div>
            <div className="create-block">
              <div className="create-block__item">
              </div>
              <div className="create-block__item">
                <div className="create-block-headline">
                  {t('createListing.step3')}
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
  }
}

Create.propTypes = {};

export default translate('common', { wait: true })(Create)