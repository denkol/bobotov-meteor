import React, { Component } from 'react';

export default class PrintBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.PrintBtn = this.PrintBtn.bind(this);
  }
  
  PrintBtn() {
    window.print();
  }
  render() {
    return (
      <div className="print-btn" onClick={this.PrintBtn}>
        <div className="print-btn__icon">
          <svg className="ico-print" role="img">
            <use xlinkHref="#ico-print" />
          </svg>
        </div>
        <div className="print-btn__text">Распечатать</div>
      </div>
    );
  }
}

PrintBtn.propTypes = {

};