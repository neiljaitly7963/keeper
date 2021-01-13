import styled from 'styled-components';

const getCardState = (props) => {
  if (props.selected) {
    return '5px solid #00a3e2';
  }
  return '';
};

export const PaymentOptionCard = styled.div`
  cursor: pointer;
  border: ${getCardState};
  box-sizing: border-box;
  border-radius: 22px;
  padding: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-items:center @media (min-width: 1000px) {
    width: 147px;
    height: 147px;
  }
  @media (max-width: 1000px) {
    width: 90px;
    height: 90px;
  }
`;

export const PaymentOptionImage = styled.img`
  @media (min-width: 1000px) {
    width: 129px;
    height: 129px;
  }
  @media (max-width: 1000px) {
    width: 70px;
    height: 70px;
  }
`;
