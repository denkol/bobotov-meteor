import React, { Component } from 'react';

export default class ListeningContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let contacts;
    if(this.props.contacts) {
      contacts = this.props.contacts;
    }
    return (
      <div className="listening-info-block">
        <h2 className="medium-headline">Контакты</h2>
        {contacts.map((contact, index) => {
          return (
            <div key={"contact-" + index} className="listening-info-block__item">
              <div className="listening-info-contacts">
                <div className="listening-info-contacts__item">{contact.contactKey}: </div>
                <div className="listening-info-contacts__item">{contact.contactValue}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

ListeningContacts.propTypes = {
  contacts: React.PropTypes.array
};