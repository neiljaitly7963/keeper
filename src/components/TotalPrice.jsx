import React, { Component } from 'react';
import NextPage from '../Icons/nextpage.svg';
import { PayButton, PayVector } from './PayButton';

class TotalPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
          <PayButton value="thankyou" onClick={this.props.handlePageChange}>
            Betalen
            <PayVector src={NextPage} alt=">" />
          </PayButton>
        </div>
      </div>
    );
  }
}

export default TotalPrice;
