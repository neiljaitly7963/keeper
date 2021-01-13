import React from 'react';
import styled from 'styled-components';
import Vector from '../Icons/vector.svg';

const IconContainer = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0px 10px 0px;
`;

const ScrollIndicator = () => (
  <IconContainer>
    <img src={Vector} alt="v" />
  </IconContainer>
);

export default ScrollIndicator;
