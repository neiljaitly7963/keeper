import React from 'react';
import styled from 'styled-components';

const StyledText = styled.span`
  text-align: right;
  display: block ruby;
  @media (min-width: 1000px) {
    color: black;
    font-size: 18px;
  }
  @media (max-width: 1000px) {
    color: white;
    font-size: 14px;
  }
`;
const TotalCostBox = ({ order }) => (
  <div
    style={{
      display: 'grid',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: '28px',
    }}
  >
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        gridTemplateColumns: '1fr 1fr',
        rowGap: '15px',
        columnGap: '98px',
      }}
    >
      <StyledText style={{ fontWeight: '600' }}>Totaal(Incl. BTW)</StyledText>
      <StyledText style={{ fontWeight: '600' }}>
        €
        {order.value_wt}
      </StyledText>

      {order.order_taxes.map((tax) => (
        <>
          <StyledText style={{ fontWeight: '300' }}>{`BTW(${tax.tax * 100}%)`}</StyledText>
          <StyledText style={{ fontWeight: '300' }}>{`€${tax.value}`}</StyledText>
        </>
      ))}
    </div>
  </div>
);

export default TotalCostBox;
