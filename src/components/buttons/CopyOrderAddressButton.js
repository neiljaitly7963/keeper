import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Spinner } from 'react-bootstrap';
import { getAddressForUpdate, getAddressFromOrder } from '../../utility/address';
import CopyAddressText from '../spans/CopyAddressText';
import webApi from '../../utility/webApi';

class OrderAddressEditButton extends Component {
  copyAddress() {
    const { isBilling, order, dispatch } = this.props;
    const fromAddress = getAddressFromOrder(order, !isBilling);
    const toAddress = getAddressForUpdate(order, fromAddress, isBilling);
    const target = isBilling ? 'billing_address' : 'shipping_address';

    dispatch(webApi.actions.updateAddress({ target }, {
      body: JSON.stringify(toAddress),
    })).then(() => this.props.closeModal());
  }

  render() {
    const { isBilling, isLoading } = this.props;
    return (
      <div>
        <Button onClick={() => this.copyAddress()} variant="link">
          {isLoading ? <Spinner animation="grow" variant="primary" size="sm" /> : <CopyAddressText isBilling={isBilling} />}
        </Button>
      </div>
    );
  }
}

OrderAddressEditButton.propTypes = {
  order: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isBilling: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  order: state.getOrder.data,
  isLoading: state.updateAddress.loading,
});

export default connect(mapStateToProps)(OrderAddressEditButton);
