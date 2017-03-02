import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class Paginate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 9
    }
    this.loadMore = this.loadMore.bind(this);
  }
  loadMore() {
    this.setState({
      limit: this.state.limit + 9
    });
  }
  render() {
    Session.set('streamLimit', this.state.limit)
    return (
      <div className="paginate-wrapper">
        <div className="paginate">
          <Button primary onClick={this.loadMore}>Загрузить еще</Button>
        </div>
      </div>
    );
  }
}

Paginate.propTypes = {};