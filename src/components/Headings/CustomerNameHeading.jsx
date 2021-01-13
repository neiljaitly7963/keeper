import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const HeadingWrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 5px;
`;

const MainHeading = styled.span`
  font-weight: 500;
  color: #000000;
  @media (min-width: 1000px) {
    font-size: 48px;
  }
  @media (max-width: 1000px) {
    font-size: 24px;
  }
`;

const SubHeading = styled.span`
  font-weight: 500;
  color: #666666;
  @media (min-width: 1000px) {
    font-size: 24px;
  }
  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;

const CustomerNameHeading = ({ order, viewPage }) => (
  <HeadingWrapper>
    <MainHeading>{`Hey ${order.shipping_address.name},`}</MainHeading>
    {viewPage === 'thankYou' ? (
      <SubHeading>
        <FormattedMessage id="ThankYou.Description" defaultMessage="Thanks for your order" />
      </SubHeading>
    ) : (
      <SubHeading>
        <FormattedMessage
          id="Create.Description"
          defaultMessage="Quickly complete your order request"
        />
      </SubHeading>
    )}
  </HeadingWrapper>
);

CustomerNameHeading.propTypes = {
  heading: PropTypes.string,
};

CustomerNameHeading.defaultProps = {
  heading: 'Hey',
};

export default CustomerNameHeading;
