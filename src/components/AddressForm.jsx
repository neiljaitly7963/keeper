import React, { Component } from 'react';
import CustomBox from './Cards/CustomBox';
import {
  AddressFormGrid,
  InputsLabelContainer,
  InputsContainer,
  IconContainer,
  StyledIcon,
} from './AddressForm/AddressFormComponents';
import StyledInput from './Input/StyledInput';

// SVG
import User from '../Icons/user.svg';
import Map from '../Icons/map.svg';
import Phone from '../Icons/phone.svg';
import Ellipse from '../Icons/ellipse.svg';

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CustomBox>
        <span
          style={{
            fontSize: '18px',
            color: 'rgba(0, 0, 0, 0.6)',
            fontWeight: '500',
          }}
        >
          Verzendadres
        </span>
        <AddressFormGrid>
          <InputsLabelContainer>
            <IconContainer>
              <StyledIcon src={User} />
            </IconContainer>
            <InputsContainer style={{ justifyContent: 'flex-start' }}>
              <StyledInput small placeholder="Voornaam" style={{ marginRight: '27px' }} />
              <StyledInput extrasmall />
              <StyledInput medium placeholder="Achternaam" style={{ marginLeft: 'auto' }} />
            </InputsContainer>
          </InputsLabelContainer>
          <InputsLabelContainer>
            <IconContainer>
              <StyledIcon src={Map} />
            </IconContainer>
            <InputsContainer>
              <StyledInput big placeholder="Postcode" />
              <StyledInput medium placeholder="Huisnummer" />
            </InputsContainer>
          </InputsLabelContainer>
          <InputsLabelContainer>
            <IconContainer>
              <span />
            </IconContainer>
            <InputsContainer>
              <StyledInput big placeholder="Straatnaam" />
              <StyledInput medium placeholder="Stad" />
            </InputsContainer>
          </InputsLabelContainer>
          <InputsLabelContainer>
            <IconContainer>
              <StyledIcon src={Phone} />
            </IconContainer>
            <InputsContainer>
              <StyledInput extrabig placeholder="Telefoonnummer" />
            </InputsContainer>
          </InputsLabelContainer>
          <InputsLabelContainer>
            <IconContainer style={{ alignItems: 'center' }}>
              <StyledIcon src={Ellipse} style={{ height: '12px', width: '12px' }} />
            </IconContainer>
            <InputsContainer>
              <span style={{ fontWeight: '400', fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}>
                Factuur adres anders dan bezorgadres
              </span>
            </InputsContainer>
          </InputsLabelContainer>
        </AddressFormGrid>
      </CustomBox>
    );
  }
}

export default AddressForm;
