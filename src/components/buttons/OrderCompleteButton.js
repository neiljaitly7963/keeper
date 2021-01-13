import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import { getAddressFromOrder, hasRequiredFields } from '../../utility/address';
import webApi from '../../utility/webApi';

import { getIntl } from '../../utility/translations';

import NextPage from '../../Icons/nextpage.svg';
import { PayButton, PayVector } from '../PayButton';

class OrderCompleteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fatalError: false,
    };
  }

  getCheckoutErrors({ order, paymentId }) {
    const intl = getIntl();
    const billingAddress = getAddressFromOrder(order, true);
    const shippingAddress = getAddressFromOrder(order, false);
    const errors = [];

    if (!hasRequiredFields(shippingAddress)) {
      errors.push(
        intl.formatMessage({
          id: 'Error.InvalidShippingAddress',
          defaultMessage: 'Invalid shipping address',
        }),
      );
    }

    if (!hasRequiredFields(billingAddress)) {
      errors.push(
        intl.formatMessage({
          id: 'Error.InvalidBillingAddress',
          defaultMessage: 'Invalid billing address',
        }),
      );
    }

    if (!paymentId) {
      errors.push(
        intl.formatMessage({
          id: 'Error.MissingPayment',
          defaultMessage: 'No payment method selected',
        }),
      );
    }

    return errors;
  }

  async payOrder() {
    try {
      const { dispatch } = this.props;
      const response = await dispatch(
        webApi.actions.payOrder(
          {},
          {
            body: JSON.stringify({ payment_method_id: this.props.paymentId }),
          },
        ),
      );
      if (!!response && !!response.payment_url) {
        window.location.href = response.payment_url;
      }
    } catch (err) {
      this.setState({ fatalError: err.message });
    }
  }

  render() {
    const intl = getIntl();
    const { fatalError } = this.state;

    if (fatalError) {
      return (
        <Alert variant="danger">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          {' '}
          <FormattedMessage
            id="Error.OrderComplete"
            defaultMessage="An error occurred while completing your order"
          />
          :
          {fatalError}
        </Alert>
      );
    }

    const { isLoading } = this.props;
    const errors = this.getCheckoutErrors(this.props);
    const hasErrors = !!errors.length;

    const { className } = this.props;

    const errorMessages = errors.join(', ');
    const completeButtonText = hasErrors
      ? errorMessages
      : intl.formatMessage({
        id: 'OrderCompleteButton.CompleteOrder',
        defaultMessage: 'Complete order',
      });

    return (
      <div style={{ padding: '0px', marginTop: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <span style={{ fontWeight: '500', fontSize: '28px' }}> Totaal:</span>
          <span style={{ fontWeight: '600', fontSize: '28px' }}>€15,31</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {hasErrors ? (
            <PayButton
              bg="#BEBEBE"
              pr="20px"
              cursor="not-allowed"
              disabled
              className={className}
              onClick={() => this.payOrder()}
              title={errorMessages}
              variant={hasErrors ? 'warning' : 'success'}
            >
              {hasErrors ? <FontAwesomeIcon icon={faExclamationTriangle} /> : ''}
              &nbsp;
              {isLoading ? <Spinner animation="grow" size="sm" /> : completeButtonText}
            </PayButton>
          ) : (
            <PayButton
              pr="20px"
              bg="#00a3e2"
              cursor="pointer"
              value="thankyou"
              onClick={() => this.payOrder()}
            >
              {isLoading ? <Spinner animation="grow" size="sm" /> : ''}
              {completeButtonText}
              <PayVector src={NextPage} alt=">" />
            </PayButton>
          )}
        </div>
      </div>
    );
  }
}

OrderCompleteButton.propTypes = {
  paymentId: PropTypes.number,
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  paymentId: state.payment.paymentId,
  order: state.getOrder.data,
  isLoading: state.payOrder.loading,
});

export default connect(mapStateToProps)(OrderCompleteButton);
