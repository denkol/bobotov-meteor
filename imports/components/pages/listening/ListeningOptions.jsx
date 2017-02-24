import React, { Component } from 'react';

export default class ListeningOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let options;
    if(this.props.options) {
      options = this.props.options;
    }
    return (
      <div className="listening-info-block listening-info-block--inline">
        <h2 className="medium-headline">Общая информация</h2>
        {options.map((option, index) => {
          if(option.optionName === "Площадь") {
            return (
              <div key={"option-" + index} className="listening-info-block__item">
                <div className="listening-info-param">
                  <span className="listening-info-param__item">{option.optionName}: </span>
                  <span className="listening-info-param__item">{option.optionValue} m²</span>
                </div>
              </div>
            );
          }
          return (
            <div key={"option-" + index} className="listening-info-block__item">
              <div className="listening-info-param">
                <span className="listening-info-param__item">{option.optionName}: </span>
                <span className="listening-info-param__item">{option.optionValue}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

ListeningOptions.propTypes = {
  options: React.PropTypes.array
};