/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';

/* Meteor libs */

/* Components */

/* Some functions */

/* Semantic UI */
import { Dimmer, Loader } from 'semantic-ui-react';

/* Material UI */

/* Other */

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { t } = this.props;

    return (
      <div className="loader">
        <Dimmer active inverted>
          {/*<Loader size='medium'>{t('other.loading')}...</Loader>*/}
          <Loader size='medium'></Loader>
        </Dimmer>
      </div>
    );
  }
}

Loading.propTypes = {};

export default translate('common', { wait: true })(Loading);