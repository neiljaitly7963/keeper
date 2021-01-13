import React, { Component } from 'react';
import { connect } from 'react-redux';
import webApi from '../utility/webApi.js';
import { ensurePaymentIsPaid } from '../utility/payment';

import { Alert, Container } from 'react-bootstrap';
import ThankYou from '../components/ThankYou';
import Create from '../components/Create';
import NotFound from '../components/NotFound';
import Header from '../components/Header';
import CheckingPayment from '../components/CheckingPayment';
import Loader from '../components/Loader';
import { FormattedMessage } from 'react-intl';

class Main extends Component {
  state = {
    error: false,
    checkingPayment: false,
  };

  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const transaction = urlParams.get('sk_trx');
    const { dispatch } = this.props;

    const checkingPayment = (checkingPayment) => this.setState({ checkingPayment });

    try {
      if (!!transaction) {
        checkingPayment(true);
        await ensurePaymentIsPaid(dispatch, transaction);
        checkingPayment(false);
        await dispatch(webApi.actions.getOrder());
      } else {
        await dispatch(webApi.actions.getOrder());
      }
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const { order, hasOrder, isLoading } = this.props;
    const { error, checkingPayment } = this.state;

    /** Check if there are any errors */
    if (!!error) {
      return (
        <div>
          <Header />
          <Container className="pt-4">
            <Alert variant="danger">
              <Alert.Heading>
                <FormattedMessage id="Main.Error" defaultMessage="Payment failed." />
              </Alert.Heading>
              <p>
                <FormattedMessage
                  id="Main.ContactUs"
                  defaultMessage="We where unable to check if the payment was successful, reload the page to try again."
                />
              </p>
            </Alert>
          </Container>
        </div>
      );
    }

    /** We are validating the payment */
    if (checkingPayment) {
      return (
        <div>
          <Header />
          <CheckingPayment />
        </div>
      );
    }

    /** Check if there is anything being fetched */
    if (isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    /** Check if there is any order that is paid */
    if (hasOrder && order.is_paid) {
      return (
        <div>
          <ThankYou />
        </div>
      );
    }

    /** Show order creation */
    if (hasOrder) {
      return (
        <div>
          <Create />
        </div>
      );
    }

    /** Nothing found */
    return (
      <div>
        <Header />
        <NotFound />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasOrder: !!state.getOrder.sync,
    isLoading: !!state.getOrder.loading,
    order: state.getOrder.data,
  };
};

export default connect(mapStateToProps)(Main);
