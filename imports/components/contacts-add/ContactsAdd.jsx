import React, { Component } from 'react';
import { Button, Form, Input, Dropdown } from 'semantic-ui-react';
import { ContactsList } from '../../data/data.js';
import { Translate } from '../../functions/functions.js';
import {isValidEmail, isValidPhone} from "/imports/functions/validation.js";

export default class ContactsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactsNumber: 1
    }

  }
  handleChange(e, data) {
    const name = data.name;
    const value = data.value;
    Session.set(name, value)
  }

  render() {
    const { defaultContacts } = this.props; //default data
    const contactsInputs = [];
    const SingleContact = ( i, defaultData, error = false ) => {
    	const { contactKey, contactValue, message } = defaultData;
    	if(message) error = true;
    	if(contactValue && contactKey === "phone" && !isValidPhone(contactValue)) error = true;
    	if(contactValue && contactKey === "email" && !isValidEmail(contactValue)) error = true;
    	return (
      <div key={"contactField" + i} className="create-block-row">
        <div className="create-block-row__item">
          <Form.Input defaultValue={contactValue} placeholder='' actionPosition='right' name={'input' + i} fluid error={error}
            action={<Dropdown basic floating onChange={this.handleChange} options={ContactsList} name={'dropdown' + i} defaultValue={Session.get('dropdown' + i) ? Session.get('dropdown' + i) : "email"} />} />
        </div>
        <div className="create-block-row__item"></div>
      </div>
      );
    }

    for(let i = 0; i < this.props.contactsNumber; i++) {
    	const contact = defaultContacts[i] || {contactKey: "email", contactValue: "", message: null};
      Session.set('dropdown' + i, contact ? contact.contactKey : null);
      contactsInputs.push(SingleContact(i, contact));
    }

    return (
      <div className="create-block__item">
        {contactsInputs}
      </div>
    );
  }
}

ContactsAdd.propTypes = {
  defaultContacts: React.PropTypes.array
};