import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import ListeningPreviewIndex from './index/ListeningPreviewIndex.jsx';
import ListeningPreviewSimple from './simple/ListeningPreviewSimple.jsx';

export default class ListeningPreview extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let data = this.props.listeningData;
    let layout = this.props.layout;

    if(layout === "simple") {
      return <ListeningPreviewSimple data={data} />
    } else if (layout === "my") {
      return <ListeningPreviewMy data={data} />
    } else if (layout === "index") {
      return <ListeningPreviewIndex data={data} />
    } else if (layout === "favorites") {
      return <ListeningPreviewSimple data={data} />
    } else if (layout === "history") {
      return <ListeningPreviewSimple data={data} />
    }

  }
}

ListeningPreview.propTypes = {
  layout: React.PropTypes.string.isRequired,
  listeningData: React.PropTypes.object
};