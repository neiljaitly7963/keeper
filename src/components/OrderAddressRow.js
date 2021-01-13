import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-bootstrap';
import { hasRequiredFields, getAddressFromOrder, formatAddress } from '../utility/address';
import OrderAddressEditButton from './buttons/OrderAddressEditButton';
import CopyOrderAddressButton from './buttons/CopyOrderAddressButton';

class OrderAddressRow extends Component {
  render() {
    const { order, isBilling } = this.props;
    const address = getAddressFromOrder(order, isBilling);
    const hasAddress = hasRequiredFields(address);

    return (
      <Row>
        <Col className="flex-middle" md={4}>
          <strong>
            {isBilling
              ? <FormattedMessage id="OrderAddressRow.BillingAddress" defaultMessage="Your billing address" />
              : <FormattedMessage id="OrderAddressRow.ShippingAddress" defaultMessage="Your shipping address" />}
            :
          </strong>
        </Col>
        <Col className="flex-middle" md={4}>
          {hasAddress ? formatAddress(address) : '-'}
        </Col>
        <Col className="flex-middle" md={2} xs={hasAddress ? 12 : 6}>
          <OrderAddressEditButton isBilling={isBilling} />
        </Col>
        <Col className="flex-middle" md={2} xs={hasAddress ? 12 : 6}>
          {hasAddress ? '' : <CopyOrderAddressButton isBilling={isBilling} />}
        </Col>
      </Row>
    );
  }
}

OrderAddressRow.propTypes = {
  order: PropTypes.object.isRequired,
  isBilling: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  order: state.getOrder.data,
});

export default connect(mapStateToProps)(OrderAddressRow);
