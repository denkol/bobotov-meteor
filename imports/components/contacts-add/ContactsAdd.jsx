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
    let name = data.name;
    let value = data.value;
    Session.set(name, value)
  }
  render() {
    var contactsInputs = [];
    const SingleContact = (i) =>(
      <div key={"contactField" + i} className="create-block-row">
        <div className="create-block-row__item">
          <Form.Input placeholder='' actionPosition='right' name={'input' + i} fluid required 
            action={<Dropdown basic floating onChange={this.handleChange} options={ContactsList} name={'dropdown' + i} defaultValue='email' />} />
        </div>
        <div className="create-block-row__item"></div>
      </div>
    );
    
    for(let i = 1; i <= this.props.contactsNumber; i++) {
      contactsInputs.push(SingleContact(i));
    }

    return (
      <div className="create-block__item">
        {contactsInputs}
      </div>
    );
  }
}

ContactsAdd.propTypes = {
  contacts: React.PropTypes.array
};