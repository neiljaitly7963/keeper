import React from 'react';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

export default function CheckingPayment() {
  return (
    <div>
      <Container className="pt-4">
        <Alert variant="info">
          <Spinner animation="grow" size="sm" />
          &nbsp;
          <FormattedMessage id="Main.CheckingPayment" defaultMessage="Please wait while we are validating the payment." />
        </Alert>
      </Container>
    </div>
  );
}
