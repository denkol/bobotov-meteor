import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class Paginate extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="paginate-wrapper">
        <div className="paginate">
          <Button primary loading>Показать еще</Button>
        </div>
      </div>
    );
  }
}

Paginate.propTypes = {};