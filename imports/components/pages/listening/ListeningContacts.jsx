import React, { Component } from 'react';
import { ContactsList } from '../../../data/data.js';
import { Translate } from '../../../functions/functions.js';

export default class ListeningContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    if(this.props.contacts) {
      let contacts = this.props.contacts;
      return (
        <div className="listening-info-block">
          <h2 className="medium-headline">Контакты</h2>
          {contacts.map((contact, index) => {
            let contactValue;
            if(contact.contactValue.match( /(http:|https:)/ )) {
              contactValue = (<a href={contact.contactValue} target="_blank" className="listening-info-contacts__item">{contact.contactValue}</a>);
            } else {
              contactValue = (<div className="listening-info-contacts__item">{contact.contactValue}</div>);
            }
            return (
              <div key={"contact-" + index} className="listening-info-block__item">
                <div className="listening-info-contacts">
                  <div className="listening-info-contacts__item">{ Translate(ContactsList, contact.contactKey) }: </div>
                  {contactValue}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}

ListeningContacts.propTypes = {
  contacts: React.PropTypes.array
};