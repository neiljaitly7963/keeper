import React from 'react';
import WebFooterLogo from '../../Icons/footerlogoweb.svg';

const WebFooter = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateRows: 'auto auto auto',
      rowGap: '15px',
      color: '#666666',
    }}
  >
    <span style={{ fontWeight: '600', fontSize: '18px' }}>Vragen?</span>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px' }}>
      <span style={{ fontWeight: '400', lineHeight: '21px' }}>
        Dit BestelVerzoek is gestuurd door SK Fashion. Deze email is verstuurd om je bestelling af
        te ronden op jouw eigen verzoek
      </span>
      <span>
        <span style={{ fontWeight: '700', lineHeight: '21px' }}>Vragen over je bestelling?</span>
        <br />
        <span style={{ fontWeight: '500', lineHeight: '21px' }}>
          Neem contact op met SK Fashion info@skfashion.nl /+31(0)548-514843
        </span>
      </span>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px' }}>
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <span
          style={{
            fontWeight: '500',
            fontSize: '18px',
          }}
        >
          BestelVerzoek is een dienst van:
        </span>
        <span style={{ textDecorationLine: 'underline', fontStyle: 'italic' }}>
          <a
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            href="https://storekeeper.nl/"
            target="_blank"
            rel="noreferrer"
          >
            www.storekeeper.nl
          </a>
        </span>
      </span>
      <span>
        <img src={WebFooterLogo} alt="storekeeper" />
      </span>
    </div>
  </div>
);

export default WebFooter;
