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
import { isValidEmail, isValidPhone } from "/imports/functions/validation.js";

/* Semantic UI */
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Dropdown } from 'semantic-ui-react'

/* Material UI */
import Dialog from 'material-ui/Dialog';

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
        paymentPeriod: false,
        city: false,
        typeDeal: false,
        typeProperty: false,
        ratio: false,
        username: false,
        signEmail: false,
        password: false
      },
      contacts: [],
      contactsNumber: 1,
      listeningId: Random.id(),
      createMap: {
        open: false,
        submitted: false
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.contactAdd = this.contactAdd.bind(this);
    this.contactRemove = this.contactRemove.bind(this);
    this.locationCreateHandler = this.locationCreateHandler.bind(this);
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

  capitalizeFirstLetter(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1).trim() : "";
  }

  getContacts() {
    const contacts = [];
    for(let i = 0; i < self.state.contactsNumber; i++) {
      const dropdownDeafultValue = "email";
      const contactKey = Session.get('dropdown'+i) ? Session.get('dropdown'+i) : dropdownDeafultValue;
      const contactValue = formData["input"+i];

      contacts.push({contactKey, contactValue});
    }
    return contacts;
  }

  getOtherPhotos() {
    const listeningPhotos = [];
    for (let i = 1; i <= 4; i++) {
      if(Session.get(i + "photo")) {
        listeningPhotos.push( Session.get(i + "photo") );
      }
    }
    return listeningPhotos;
  }
  locationCreateHandler() {
    const isSubmit = this.state.createMap.open;

    this.setState({
      createMap: {
        open: !this.state.createMap.open,
        submitted: isSubmit
      }
    });

    if(isSubmit) {
      /* Get & Save location code here */

      console.log('Местоположение сохранено')

      this.setState({
        createMap: {
          submitted: true
        }
      });

    }
  }
  handleSubmit(e, { formData }) { //console.log(formData);
    e.preventDefault();
    const { t } = this.props;
    const userId = Meteor.userId();
    const validation = {
      message: '',
      phone: '',
      email: '',
      price: false,
      country: false,
      headline: false,
      paymentPeriod: false,
      city: false,
      typeDeal: false,
      typeProperty: false,
      ratio: false,
      signEmail: false,
      password: false,
      username: false
    };
    this.setState({ validation });
    const message = t('messages:dinamiclyErrors.formError');
    const comfortList = formData.comfortList;
    const typeDeal = formData.typeDeal;
    const typeProperty = formData.typeProperty;
    const country = formData.country;
    const city = formData.city;
    const location = null;
    const ratio = parseInt(formData.ratio);
    const bedrooms = parseInt(formData.bedrooms);
    const bathrooms = parseInt(formData.bathrooms);
    const floor = parseInt(formData.floor);
    const price = parseInt(formData.price);
    const paymentPeriod = formData.paymentPeriod;
    const headline = formData.headline;
    const desc = formData.description;
    const username = formData.username ? this.capitalizeFirstLetter(formData.username) : "";
    const signEmail = formData.signEmail ? formData.signEmail : "";
    const password = formData.password ? formData.password.trim() : "";
    const passwordR = formData.passwordR ? formData.passwordR.trim() : "";
    const contacts = this.getContacts();
    const hasError = _.some(contacts, contact => !_.isEmpty(contact.message));

    let photos = {
      main: Session.get('0photo'),
      other: this.getOtherPhotos()
    }

    /* Listening object */
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

    /* User object */
    const userCandidate = {
      email : signEmail,
      password : password,
      profile : {
        userName : username
      }
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

    if(!userId) {
      if (username.length < 3) {
        validation.message = message;
        validation.username = t('messages:dinamiclyErrors.userNameLength');
        this.setState({ validation });
      }
      if (!isValidEmail(signEmail)) {
        validation.message = message;
        validation.signEmail = t('messages:dinamiclyErrors.invalidEmail');
        this.setState({ validation });
      }
      if (!password || !passwordR) {
        validation.message = message;
        validation.password = t('messages:dinamiclyErrors.emptyPassword');
        this.setState({ validation });
      }
      if (!!password && !!passwordR && password !== passwordR) {
        validation.message = message;
        validation.password = t('messages:dinamiclyErrors.passwordsNotMatch');
        this.setState({ validation });
      }
    }




    if(hasError ||
      (!!password && !!passwordR && password !== passwordR) ||
      (!password || !passwordR) ||
      !price ||
      !country ||
      !headline ||
      !desc ||
      !paymentPeriod ||
      !city ||
      !typeDeal ||
      !typeProperty ||
      !ratio) return;

    if(!userId) {

      /* If user dont't sign */
      Accounts.createUser(userCandidate, (err) => {
        const { validation } = this.state;
        if (err) {
          if(err.error === 403) {
            validation.signEmail = t('messages:dinamiclyErrors.emailAlreadyExists');
          }
          return this.setState({ validation });
        }
        /* Create user */
        Meteor.call("userCreate", userCandidate, (err, res) => {
          if(err) {
            validation.message = err.reason;
            return this.setState({ validation });
          }
          /* Create new listening */
          Meteor.call('listeningCreate', listeningCandidate, (err, res) => {
            if(err) {console.log(err)}
            else { FlowRouter.go('/mylistenings'); }
          });
        });
      });
    } else {
      /* If user sign */
      Meteor.call('listeningCreate', listeningCandidate, (err, res) => {
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
    if(this.state.contactsNumber > 1) {
      this.setState({
        contactsNumber: this.state.contactsNumber - 1
      });
    }
  }

  render() {
    const { t } = this.props;
    const userId = Meteor.userId();
    const {
      message,
      phone,
      email,
      price,
      country,
      headline,
      desc,
      paymentPeriod,
      city,
      typeDeal,
      typeProperty,
      ratio } = this.state.validation;


    const { signEmail, password, username } = this.state.validation;

    const { contactsNumber, contacts, listeningId } = this.state;

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
              <div className="create-block-row">
                <div className="create-block-row__item">
                  <Form.Field>
                    <label>Местоположение</label>

                  <div className={this.state.createMap.open ? "create-map" : "create-map create-map--hide"}>
                    <div className="create-map__item create-map__item_desc">
                      <p>Укажите местоположение вашего жилья на карте, затем нажмите кнопку "Сохранить"</p>
                    </div>
                    <div className="create-map__item create-map__item_map">
                      Зона карты
                    </div>
                  </div>
                  {this.state.createMap.submitted ?
                    <div className="create-map-submitted">
                      <div className="create-map-submitted__item">
                        <p>50.121212,8.6365638</p>
                      </div>
                      <div className="create-map-submitted__item">
                        <Button
                          content="Изменить местоположение"
                          onClick={this.locationCreateHandler}
                        />
                      </div>
                    </div>
                  : <Button
                    content={this.state.createMap.open ? "Сохранить местоположение" : "Указать на карте"}
                    onClick={this.locationCreateHandler}
                    primary={this.state.createMap.open}
                  /> }
                  </Form.Field>
                </div>
              </div>
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
                  />
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
          {!userId ?
            /* If not user */
            <div className="create-block">
              <div className="create-block__item">
                <div className="create-block-headline">
                  {t('createListing.step4')}
                </div>
                <p>Есть аккаунт? <a href="#">Войти</a></p>
              </div>
              <div className="signup-create-block">
                <div className="create-block__item">
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Input label={t('nameField.label')} name='username' type="text" placeholder={t('nameField.placeholder')} required/>
                    </div>
                    <div className="create-block-row__item">
                    </div>
                  </div>
                </div>
                <div className="create-block__item">
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Input label='E-mail:' name='signEmail' type="email" placeholder='example@mail.com' required/>
                    </div>
                    <div className="create-block-row__item">
                    </div>
                  </div>
                </div>
                <div className="create-block__item">
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Input label={t('passwordField.label')} name='password' type="password" placeholder={t('passwordField.placeholder')} required/>
                    </div>
                    <div className="create-block-row__item">
                    </div>
                  </div>
                </div>
                <div className="create-block__item">
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Input label={t('repeatPasswordField.label')} name='passwordR' type="password" placeholder={t('repeatPasswordField.label')} required/>
                    </div>
                    <div className="create-block-row__item">
                    </div>
                  </div>
                </div>
              </div>
              {/*<div className="signin-create-block">
                <div className="create-block__item">
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Input label='E-mail:' name='signEmail' type="email" placeholder='example@mail.com' required/>
                    </div>
                    <div className="create-block-row__item">
                    </div>
                  </div>
                </div>
                <div className="create-block__item">
                  <div className="create-block-row">
                    <div className="create-block-row__item">
                      <Form.Input label={t('passwordField.label')} name='password' type="password" placeholder={t('passwordField.placeholder')} required/>
                    </div>
                    <div className="create-block-row__item">
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          : null}
          {message ?
            <Message size="tiny" negative>
              <Message.Header>Error!</Message.Header>
              <Message.List>
                {phone ? <Message.Item>{phone}</Message.Item> : null}
                {email ? <Message.Item>{email}</Message.Item> : null}
                {price ? <Message.Item>{price}</Message.Item> : null}
                {country ? <Message.Item>{country}</Message.Item> : null}
                {headline ? <Message.Item>{headline}</Message.Item> : null}
                {paymentPeriod ? <Message.Item>{paymentPeriod}</Message.Item> : null}
                {city ? <Message.Item>{city}</Message.Item> : null}
                {typeDeal ? <Message.Item>{typeDeal}</Message.Item> : null}
                {typeProperty ? <Message.Item>{typeProperty}</Message.Item> : null}
                {ratio ? <Message.Item>{ratio}</Message.Item> : null}
                {signEmail ? <Message.Item>{signEmail}</Message.Item> : null}
                {username ? <Message.Item>{username}</Message.Item> : null}
                {password ? <Message.Item>{password}</Message.Item> : null}
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
  }
}

Create.propTypes = {};

export default translate('common', { wait: true })(Create)