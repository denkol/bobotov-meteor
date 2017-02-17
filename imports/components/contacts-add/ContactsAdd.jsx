import React, { Component } from 'react';
import { Button, Form, Input, Dropdown } from 'semantic-ui-react';

const contactsList = [
  { key: 'fb', value: 'facebook', text: 'Ссылка на Facebook' },
  { key: 'vk', value: 'vk', text: 'Ссылка на Вконтакте' },
  { key: 'wb', value: 'website', text: 'Веб-сайт' },
  { key: 'em', value: 'email', text: 'E-mail' },
  { key: 'ph', value: 'phone', text: 'Телефон' },
  { key: 'vi', value: 'viber', text: 'Viber' },
  { key: 'wa', value: 'whatsapp', text: 'WhatsApp' },
  { key: 'te', value: 'telegram', text: 'Telegram' },
];

export default class ContactsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactsNumber: 1
    }
    
  }
  
  render() {
    var contactsInputs = [];
    const SingleContact = (i) =>(
      <div key={"contactField" + i} className="create-block-row">
        <div className="create-block-row__item">
          <Form.Input placeholder='' actionPosition='right' name={'input' + i} fluid required 
            action={<Dropdown basic floating options={contactsList} name={'dropdown' + i} defaultValue='email' />} />
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