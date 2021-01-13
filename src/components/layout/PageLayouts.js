import styled from 'styled-components';

export const WebPageLayout = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 53px;
`;

export const OnePartLayout = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
`;

export const TwoPartsLayout = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 260px;
  row-gap: 49px;
`;

export const BigContainer = styled.div`
  background: #ffffff;
  padding: 25px 45px 20px 45px;
`;

export const SmallContainer = styled.div`
  background: #ffffff;
  border-radius: 0px 0px 40px 40px;
  padding: 25px 45px;
`;

// Mobile components

export const MobilePageLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const MobileDetailsContainer = styled.div`
  width: 100%;

  background: #ffffff;
  border-radius: 0px 0px 40px 40px;
  padding: 24px;
`;

export const MobileItemsContainer = styled.div`
  width: 100%;
  height: 500px;
  background: transparent;
  padding: 40px;
`;

// Common components

export const FooterContainer = styled.div`
  background: #ffffff;
  border-radius: 40px 40px 0px 0px;

  @media (min-width: 1000px) {
    padding: 25px 35px 10px 35px;
  }
  @media (max-width: 1000px) {
    padding: 12px 38px;
    width: 100%;
    height: 345px;
  }
`;
