/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import GoogleMapReact from 'google-map-react';

/* Meteor libs */

/* Components */

/* Some functions */

/* Semantic UI */

/* Material UI */

/* Other */

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class ListeningMap extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { t } = this.props;
    return (
      <div className="listening-info-block listening-info-block--inline">
        <h2 className="medium-headline">{t('listening.onMap')}</h2>
        <div className="listening-info-block__item">
          <GoogleMapReact
            defaultCenter={{lat: 59.95, lng: 30.33}}
            defaultZoom={{zoom: 11}}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text={'Kreyser Avrora'}
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

ListeningMap.propTypes = {
  coordinates: React.PropTypes.object
};

export default translate('common', { wait: true })(ListeningMap)