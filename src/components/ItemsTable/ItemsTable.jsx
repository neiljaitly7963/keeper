import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemRow from './ItemRow';

class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  async componentDidMount() {
    console.log(this.props.order.order_items, 'this.props.order order ItemTable');
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {this.props.order.order_items.map((order) => (
          <>
            {order.is_shipping === false ? (
              <ItemRow viewType={this.props.viewType} order={order} rowType="item" />
            ) : (
              <></>
            )}
          </>
        ))}

        {this.props.order.order_items.map((order) => (
          <>
            {order.is_shipping === true ? (
              <ItemRow viewType={this.props.viewType} order={order} rowType="shipping" />
            ) : (
              <></>
            )}
          </>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.getOrder.data,
});

export default connect(mapStateToProps)(ItemTable);
