import styled from 'styled-components';

export const AddressFormGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(auto, 1fr);
  row-gap: 15px;
  margin-top: 20px;
`;

export const InputsLabelContainer = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 1.5fr;
  column-gap: 10px;
  margin-bottom: 20px;
`;
export const InputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const IconContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

export const StyledIcon = styled.img`
  height: 16px;
  width: 16px;
`;
