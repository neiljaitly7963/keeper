import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

class OrderAddressRow extends Component {
  render() {
    const { order, showFullOrder } = this.props;

    return (
      <Row>
        <Col className="flex-middle" md={4}>
          <FontAwesomeIcon icon={faNewspaper} className="text-primary" />
          &nbsp;
          &nbsp;
          <strong>
            <FormattedMessage id="OrderSummary.Title" defaultMessage="Your order summary" />
          </strong>
        </Col>
        <Col className="flex-middle" md={4}>
          €
          {' '}
          {order.value_wt ? order.value_wt.toFixed(2) : '-'}
        </Col>
        <Col className="flex-middle" md={4}>
          <Button onClick={() => showFullOrder()} variant="link">
            <FormattedMessage id="OrderSummary.ShowDetails" defaultMessage="View order" />
          </Button>
        </Col>
      </Row>
    );
  }
}

OrderAddressRow.propTypes = {
  order: PropTypes.object.isRequired,
  showFullOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.getOrder.data,
});

export default connect(mapStateToProps)(OrderAddressRow);
