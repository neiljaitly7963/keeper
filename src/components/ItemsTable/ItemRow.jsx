import React from 'react';
import styled from 'styled-components';
import ItemIconWeb from './ItemIconWeb';
import ItemIconMobile from './ItemIconMobile';
import TruckIconWeb from './TruckIconWeb';
import TruckIconMobile from './TruckIconMobile';

const ItemCount = styled.span`
  font-size: 14px;
  color: #00a3e2;
  border-radius: 50%;
  text-align: center;
  width: 21px;
  height: 21px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.span`
  font-weight: 400;
  @media (min-width: 1000px) {
    color: #000000;
    font-size: 18px;
  }
  @media (max-width: 1000px) {
    color: #ffffff;
    font-size: 14px;
  }
`;

const StyledRow = styled.span`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (min-width: 1000px) {
    height: 100px;
    border-bottom: 1px solid #666666;
    padding: 20px;
    grid-template-columns: 0.4fr 1fr 0.3fr 0.3fr;
  }
  @media (max-width: 1000px) {
    height: 72px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    grid-template-columns: 1.5fr 3fr 1fr 1fr;
  }
`;

const StyledShippingRow = styled.span`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (min-width: 1000px) {
    height: 100px;
    border-bottom: 1px solid #666666;
    padding: 20px;
    grid-template-columns: 0.3fr 1fr 0.3fr;
  }
  @media (max-width: 1000px) {
    height: 72px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    grid-template-columns: 1.5fr 3fr 1fr 1fr;
  }
`;

const StyledCostText = styled(StyledText)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const ItemRow = ({ viewType, order, rowType }) => (
  <>
    {rowType === 'shipping' ? (
      <StyledRow>
        {viewType === 'mobile' ? <TruckIconMobile /> : <TruckIconWeb />}
        <StyledText>{order.name}</StyledText>
        <ItemCount style={{ backgroundColor: 'transparent' }} />
        <StyledCostText>{order.price_wt}</StyledCostText>
      </StyledRow>
    ) : rowType === 'item' ? (
      <StyledRow>
        {viewType === 'mobile' ? <ItemIconMobile /> : <ItemIconWeb />}
        <StyledText>{order.name}</StyledText>
        <ItemCount>{order.quantity}</ItemCount>
        <StyledCostText>{order.price_wt}</StyledCostText>
      </StyledRow>
    ) : (
      <></>
    )}
  </>
);

export default ItemRow;
