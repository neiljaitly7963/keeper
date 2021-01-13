import React from 'react';
import { Container } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

export default function NotFound() {
  return (
    <Container className="text-center p-5">
      <h1>
        <FormattedMessage id="Main.OrderNotFound" defaultMessage="No order found" />
      </h1>
    </Container>
  );
}
