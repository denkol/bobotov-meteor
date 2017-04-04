import React, { Component } from 'react';
import { Button, Form, Input, Dropdown } from 'semantic-ui-react';
import { ContactsList } from '../../data/data.js';
import { Translate } from '../../functions/functions.js';

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
    const defaultContacts = this.props.defaultContacts; //default data
    const contactsInputs = [];
    const SingleContact = (i, defaultData) => {
    	return (
      <div key={"contactField" + i} className="create-block-row">
        <div className="create-block-row__item">
          <Form.Input defaultValue={defaultData ? defaultData.contactValue : ""} placeholder='' actionPosition='right' name={'input' + i} fluid required 
            action={<Dropdown basic floating onChange={this.handleChange} options={ContactsList} name={'dropdown' + i} defaultValue={Session.get('dropdown' + i) ? Session.get('dropdown' + i) : "email"} />} />
        </div>
        <div className="create-block-row__item"></div>
      </div>
      );
    }

    for(let i = 0; i < this.props.contactsNumber; i++) {
    	const contact = defaultContacts[i] || null;
      Session.set('dropdown' + i, contact ? contact.contactKey : contact);
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