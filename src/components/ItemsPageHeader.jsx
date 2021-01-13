import React from 'react';
import { FormattedMessage } from 'react-intl';
import Logo from '../Icons/headerlogoweb.svg';
import Vector from '../Icons/vector.svg';

const ItemsPageHeader = ({ order }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateRows: '1fr 1fr',
      gridTemplateColumns: '1fr 1fr',
      rowGap: '15px',
      columnGap: '36px',
    }}
  >
    <span>
      <img src={Logo} alt="SK Fashion" style={{ margin: '10px 0px 10px 0px' }} />
    </span>
    <span
      style={{
        fontSize: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <span style={{ fontWeight: '700' }}>Order</span>
      #
      {order && order.number ? order.number : ''}
    </span>
    <span
      style={{
        fontWeight: '500',
        fontSize: '36px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <span>
        <FormattedMessage id="Main.OrderNumber" defaultMessage="Your order" />
      </span>

      <img src={Vector} alt="v" />
    </span>
    <span style={{ fontSize: '16px' }}>
      <span style={{ fontWeight: '700' }}>
        <FormattedMessage id="Main.YourContact" defaultMessage="Your Contact" />
      </span>
      <br />
      {order && order.created_by.name ? order.created_by.name : ''}
    </span>
  </div>
);

export default ItemsPageHeader;
