import React, { Component } from 'react';
import { Container, Spinner } from 'react-bootstrap';

class Loader extends Component {
  render() {
    return (
      <div>
        <Container className="pt-5 text-center">
          <Spinner animation="grow" />
        </Container>
      </div>
    );
  }
}

export default Loader;
