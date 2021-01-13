import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { Button, Alert } from 'react-bootstrap';
import webApi from '../utility/webApi';
import appConfig from '../utility/appConfig';
import PdfViewer from './PdfViewer';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  async componentDidMount() {
    console.log(this.props.order, 'this.props.order');
  }

  render() {
    return (
      <div>
        <h2 />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.getOrder.data,
  pdfUrl: state.orderPdf.data,
});

export default connect(mapStateToProps)(Test);
