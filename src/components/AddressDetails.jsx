import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CustomBox from './Cards/CustomBox';
import {
  AddressFormGrid,
  InputsLabelContainer,
  InputsContainer,
  IconContainer,
  StyledIcon,
} from './AddressForm/AddressFormComponents';

import {
  hasRequiredFields,
  getAddressFromOrder,
  formatAddress,
  formatName,
  formatContact,
} from '../utility/address';

// SVG
import User from '../Icons/user.svg';
import Map from '../Icons/map.svg';
import Phone from '../Icons/phone.svg';

class AddressDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { order } = this.props;
    const address = getAddressFromOrder(order, false);
    const hasAddress = hasRequiredFields(address);
    return (
      <CustomBox style={{ marginTop: '20px', marginBottom: '20px' }}>
        <span
          style={{
            fontSize: '18px',
            color: 'rgba(0, 0, 0, 0.6)',
            fontWeight: '500',
          }}
        >
          <FormattedMessage
            id="OrderAddressRow.ShippingAddress"
            defaultMessage=" Shipping address"
          />
        </span>
        <AddressFormGrid style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '14px', rowGap: '0px' }}>
          <InputsLabelContainer style={{ marginBottom: '0px' }}>
            <IconContainer style={{ alignItems: 'center', paddingTop: '5px' }}>
              <StyledIcon src={User} />
            </IconContainer>
            <InputsContainer>
              <span>{formatName(address)}</span>
            </InputsContainer>
          </InputsLabelContainer>
          <InputsLabelContainer style={{ marginBottom: '0px' }}>
            <IconContainer style={{ alignItems: 'flex-start', paddingTop: '5px' }}>
              <StyledIcon src={Map} />
            </IconContainer>
            <InputsContainer>
              <span>{hasAddress ? formatAddress(address) : '-'}</span>
            </InputsContainer>
          </InputsLabelContainer>
          <InputsLabelContainer style={{ marginBottom: '0px' }}>
            <IconContainer style={{ alignItems: 'center', paddingTop: '5px' }}>
              <StyledIcon src={Phone} />
            </IconContainer>
            <InputsContainer>
              <span>{formatContact(address)}</span>
            </InputsContainer>
          </InputsLabelContainer>
        </AddressFormGrid>
      </CustomBox>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.getOrder.data,
  pdfUrl: state.orderPdf.data,
});

export default connect(mapStateToProps)(AddressDetails);
