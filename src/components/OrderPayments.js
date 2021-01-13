import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, Col, Row, Spinner,
} from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';
import webApi from '../utility/webApi';
import { updatePaymentId } from '../actions/paymentActions';
import ImageWithFallback from './images/ImageWithFallback';

import CustomBox from './Cards/CustomBox';
import { PaymentOptionCard, PaymentOptionImage } from './PaymentCard/PaymentOptionCard';
import PaymentCardsContainer from './PaymentCard/PaymentCardsContainer';
// SVG
import Apple from '../Icons/apple.svg';
import Visa from '../Icons/visa.svg';
import Vvv from '../Icons/vvv.svg';
import Amex from '../Icons/amex.svg';
import AfterPay from '../Icons/afterpay.svg';
import Ideal from '../Icons/ideal.svg';

import '../index.css';

class OrderPayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  async componentDidMount() {
    try {
      const { dispatch } = this.props;
      await dispatch(webApi.actions.listOrderPayments());
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const {
      payments, paymentId, dispatch, isLoading,
    } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <Alert variant="danger">
          <FormattedMessage
            id="Error.PaymentLoading"
            defaultMessage="An error occurred while loading your payment methods"
          />
          :
          {error}
        </Alert>
      );
    }

    if (isLoading) return <Spinner animation="grow" />;
    if (isEmpty(payments)) {
      return (
        <FormattedMessage
          id="OrderPayment.MissingPayments"
          defaultMessage="No payment methods available."
        />
      );
    }

    return (
      <CustomBox>
        <span
          style={{
            fontSize: '18px',
            color: 'rgba(0, 0, 0, 0.6)',
            fontWeight: '500',
          }}
        >
          <FormattedMessage id="Order.Payment" defaultMessage="Payment" />
        </span>
        <PaymentCardsContainer>
          {payments.map((payment) => {
            const borderClassName = payment.id === paymentId ? ' dark-blue' : '';
            const mainImage = `https://static.pay.nl/payment_profiles/100x100/${payment.eid}.png`;
            return (
              <PaymentOptionCard
                key={payment.id}
                title={payment.title}
                onClick={() => dispatch(updatePaymentId(payment.id))}
                sm={4}
                xs={6}
                className={`bg-white flex-center ${borderClassName}`}
              >
                <PaymentOptionImage
                  src={mainImage}
                  imageUrlFallback={payment.image_url}
                  alt={payment.title}
                  className="payment-method-images"
                />
              </PaymentOptionCard>
            );
          })}
        </PaymentCardsContainer>
      </CustomBox>
    );
  }
}

const mapStateToProps = (state) => ({
  payments: state.listOrderPayments.data.data,
  isLoading: state.listOrderPayments.loading,
  paymentId: state.payment.paymentId,
});

export default connect(mapStateToProps)(OrderPayments);
