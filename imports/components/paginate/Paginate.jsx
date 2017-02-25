import React, { Component } from 'react';

export default class Paginate extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="paginate-wrapper">
        <div className="paginate">
          <div className="paginate__item paginate__item--active">
            <div className="paginate-text">1</div>
          </div>
          <div className="paginate__item">
            <div className="paginate-text">2</div>
          </div>
          <div className="paginate__item">
            <div className="paginate-text">3</div>
          </div>
        </div>
      </div>
    );
  }
}

Paginate.propTypes = {};