import React, { Component } from 'react';

export default class EmptyBanner extends Component {
  render() {
    return (
      <div className="empty-banner">
        <div className="cat">
          <svg role="img" className="ico-cat">
            <use xlinkHref="#ico-cat" />
          </svg>
        </div>
        <div className="cat-text">
          {this.props.text}
        </div>
      </div>
    );
  }
}