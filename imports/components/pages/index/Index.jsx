/* React libs */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';

/* Meteor libs */
import { createContainer } from 'meteor/react-meteor-data';

/* Components */
import BigSlider from '../../big-slider/BigSlider.jsx';
import PhotoGrid from '../../photo-grid/PhotoGrid.jsx';
import BtnAdd from '../../btn-add/BtnAdd.jsx';
/* Tranlate & Data */

/* Semantic UI */
import { Message } from 'semantic-ui-react';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillMount() {
    if(Session.get('index_scroll_position')) {
      console.log(Session.get('index_scroll_position') )
    }
  }
  componentWillUnmount() {
    $('body, html').removeClass('overflow-hidden');
    $('.filter-btn').removeClass('filter-btn--close');
    $('.filter').removeClass("filter--show");
  }
  openFilter() {
    $('body, html').addClass('overflow-hidden'); //lock scroll when filter open
    $('.filter-btn').addClass('filter-btn--close'); //switch buttons to red color
    $('#filterMobile').addClass('filter-mobile--open');
  }
  render() {
    const { t } = this.props;
    return (
      <div className="index-page-wrapper">
        <Helmet>
          <title>{t('head:titles.index')+" "+t('head:titles.app')}</title>
        </Helmet>
        <button onClick={this.openFilter} className="filter-btn filter-btn-mobile">
          <div className="filter-btn__icon" />
        </button>
        <BtnAdd mobile={true} />
        <BigSlider />
        <PhotoGrid />
      </div>
    );
  }
}

Index.propTypes = {};

export default translate('common', { wait: true })(Index)
