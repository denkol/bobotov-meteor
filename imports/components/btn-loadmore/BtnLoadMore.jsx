import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

class BtnLoadMore extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { t } = this.props
    return (
      <Button 
        primary={true}
        onClick={this.props.onClick} 
        content={t('other.loadMoreBtn')} 
      />
    );
  }
}

BtnLoadMore.propTypes = {
  onClick: React.PropTypes.function,
};

export default translate('common', { wait: true })(BtnLoadMore)