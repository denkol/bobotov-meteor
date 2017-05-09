/* React libs */
import React, { Component } from 'react';
import { translate } from 'react-i18next';

/* Meteor libs */

/* Components */

/* Tranlate & Data */

/* Semantic UI */



class ListeningOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { options, t } = this.props;
    return (
      <div className="listening-info-block listening-info-block_general">
        <h2 className="medium-headline">{t('listening.summary')}</h2>
        {options.map((option, index) => {
          if(option.optionValue) {
            return (
              <div key={"option-" + index} className="listening-info-block__item">
                <div className="listening-info-param listening-info-param_general">
                  <span className="listening-info-param__item">{option.optionName}: </span>
                  <span className="listening-info-param__item">{option.optionValue}</span>
                </div>
              </div>
            );
          } else {
            return '';
          }
        })}
      </div>
    );
  }
}

ListeningOptions.propTypes = {
  options: React.PropTypes.array
};


export default translate('common', { wait: true }) (ListeningOptions);