import React from 'react';
import MobileFooterLogo from '../../Icons/footerlogo.svg';

const MobileFooter = ({ order }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateRows: 'auto auto auto auto auto auto',
      rowGap: '11px',
      color: '#666666',
    }}
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: '10px',
        fontSize: '18px',
        fontWeight: '500',
      }}
    >
      <span>Bestelnummer:</span>
      <span>
        #
        {order && order.number ? order.number : ''}
      </span>
    </div>

    <span
      style={{
        display: 'grid',
        gridTemplateRows: 'auto auto',
        rowGap: '5px',
        fontSize: '13px',
      }}
    >
      <span>
        Dit BestelVerzoek is gestuurd door SK Fashion. Deze email is verstuurd om je bestelling af
        te ronden op jouw eigen verzoek
      </span>
      <br />
      <span>
        <span style={{ fontWeight: '700' }}>Vragen over je bestelling?</span>
        <br />
        Neem contact op met
        <span style={{ fontWeight: '700' }}>SK Fashion</span>
        info@skfashion.nl / +31 (0)548-514843
      </span>
    </span>

    <span style={{ fontWeight: '500', fontSize: '18px' }}>BestelVerzoek is een dienst van:</span>

    <img src={MobileFooterLogo} alt="StoreKeeper" />
    <span style={{ textDecorationLine: 'underline', fontStyle: 'italic', fontSize: '16px' }}>
      <a
        style={{ color: 'inherit', textDecoration: 'inherit' }}
        href="https://storekeeper.nl/"
        target="_blank"
        rel="noreferrer"
      >
        www.storekeeper.nl
      </a>
    </span>
  </div>
);

export default MobileFooter;
