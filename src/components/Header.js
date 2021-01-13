import React from 'react';
import { Container } from 'react-bootstrap';
import CompanyLogo from './CompanyLogo';

export default function Header() {
  return (
    <header className="p-4 header-background">
      <Container>
        <CompanyLogo />
      </Container>
    </header>
  );
}
