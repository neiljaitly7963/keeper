import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PdfViewer extends Component {
  render() {
    return (
      <iframe title={this.props.pdfUrl} src={this.props.pdfUrl} className="w-100 pdf-viewer" />
    );
  }
}

PdfViewer.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};

export default PdfViewer;
