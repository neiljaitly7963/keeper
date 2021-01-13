import React from 'react';
import Vector from '../Icons/vector.svg';

const YourOrderHeading = () => (
  <span
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '15px',
    }}
  >
    <span style={{ marginBottom: '5px' }}>Jouw bestelling</span>
    <img src={Vector} alt="v" />
  </span>
);

export default YourOrderHeading;
