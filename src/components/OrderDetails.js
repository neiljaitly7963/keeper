import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { Button, Alert } from 'react-bootstrap';
import webApi from '../utility/webApi';
import appConfig from '../utility/appConfig';
import PdfViewer from './PdfViewer';

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  async componentDidMount() {
    try {
      const { dispatch } = this.props;
      await dispatch(webApi.actions.orderPdf());
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const { pdfUrl, hideFullOrder } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <Alert variant="danger">
          <FormattedMessage id="Error.OrderPdf" defaultMessage="An error occurred while getting your order details" />
          :
          {' '}
          {error}
        </Alert>
      );
    }

    if (isEmpty(pdfUrl)) {
      return (
        <span>
          <FormattedMessage id="OrderDetails.LoadingOrder" defaultMessage="Loading order details" />
          ...
        </span>
      );
    }
    return (
      <div>
        <h2>
          <FormattedMessage id="OrderDetails.Title" defaultMessage="Order PDF" />
          <Button onClick={hideFullOrder} className="float-right" variant="link">
            <FormattedMessage id="OrderDetails.ShowSummary" defaultMessage="Show order summary" />
          </Button>
        </h2>

        <PdfViewer pdfUrl={appConfig.getResourceUrl(pdfUrl.url)} />
      </div>
    );
  }
}

OrderDetails.propTypes = {
  pdfUrl: PropTypes.object,
  hideFullOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pdfUrl: state.orderPdf.data,
});

export default connect(mapStateToProps)(OrderDetails);
