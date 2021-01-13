import styled from 'styled-components';

export const PayButton = styled.div`
  background: ${(props) => props.bg};
  border-radius: 24px;
  border: none;
  font-weight: 500;
  color: #ffffff;
  cursor: ${(props) => props.cursor};
  display: flex;
  flex-flexdirection: row;
  justify-content: center;
  align-items: center;
  padding-right: ${(props) => props.pr};
  @media (min-width: 1000px) {
    min-width: 205px;
    height: 64px;
    font-size: 30px;
    padding-left: 30px;
  }
  @media (max-width: 1000px) {
    min-width: 120px;
    height: 41px;
    font-size: 13px;
    padding-left: 15px;
  }
`;

export const PayVector = styled.img`
  margin-left: 15px;
  @media (min-width: 1000px) {
  }
  @media (max-width: 1000px) {
    width: 13px;
    height: 13px;
  }
`;
