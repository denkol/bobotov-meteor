/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';
/* Meteor libs */
/* Components */
/* Tranlate & Data */
import { ComfortList } from '../../../data/data.js';
import { Translate } from '../../../functions/functions.js';
/* Semantic UI */

class ListeningComfort extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let comforts;
    const { t } = this.props
    if(this.props.comforts) {
      comforts = this.props.comforts;
    }
    if(comforts.length) {
      return (
        <div className="listening-info-block listening-info-block--inline">
          <h2 className="medium-headline">{t('listening.comfort')}</h2>
          {comforts.map((comfort, index) => {
            return (
              <div key={"comfort-" + index} className="listening-info-block__item">
                <div className="comfort-label">{t(`comfortList.${comfort}`)}</div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return(<div></div>);
    }
  }
}

ListeningComfort.propTypes = {
  comforts: React.PropTypes.array
};

export default translate('common', { wait: true })(ListeningComfort)
