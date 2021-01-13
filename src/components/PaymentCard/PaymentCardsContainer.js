import styled from 'styled-components';

const PaymentCardsContainer = styled.div`
  display: grid;
  margin-top: 10px;
  @media (min-width: 1000px) {
    row-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 35px;
  }
  @media (max-width: 1000px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px;
  }
`;

export default PaymentCardsContainer;
