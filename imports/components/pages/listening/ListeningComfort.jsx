import React, { Component } from 'react';
import { ComfortList } from '../../../data/data.js';
import { Translate } from '../../../functions/functions.js';

export default class ListeningComfort extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let comforts;
    if(this.props.comforts) {
      comforts = this.props.comforts;
    }
    if(comforts.length) {
      return (
        <div className="listening-info-block listening-info-block--inline">
          <h2 className="medium-headline">Удобства</h2>
          {comforts.map((comfort, index) => {
            return (
              <div key={"comfort-" + index} className="listening-info-block__item">
                <div className="comfort-label">{Translate(ComfortList, comfort)}</div>
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