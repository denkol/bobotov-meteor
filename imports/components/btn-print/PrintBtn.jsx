import React, { Component } from 'react';
import { translate } from 'react-i18next';

class PrintBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.PrintBtn = this.PrintBtn.bind(this);
  }

  PrintBtn() {
    window.print();
  }

  render() {
    const { t } = this.props;
    return (
      <div className="print-btn" onClick={this.PrintBtn}>
        <div className="print-btn__icon">
          <svg className="ico-print" role="img">
            <use xlinkHref="#ico-print" />
          </svg>
        </div>
        <div className="print-btn__text">{t('listening.printBtn')}</div>
      </div>
    );
  }
}

PrintBtn.propTypes = {};

export default translate('common', { wait: true }) (PrintBtn);