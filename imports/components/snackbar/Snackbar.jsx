import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class SnackbarMateiral extends React.Component {
  render() {
    return (
      <div>
        <Snackbar
          open={this.props.open}
          message={this.props.message}
          autoHideDuration={2000}
          onRequestClose={this.props.onRequestClose}
        />
      </div>
    );
  }
}