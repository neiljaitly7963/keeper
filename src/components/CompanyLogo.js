import React from 'react';
import { Image } from 'react-bootstrap';

import appConfig from '../utility/appConfig';

const CompanyLogo = () => {
  const { company_name: companyName, company_image_url: companyImageUrl } = appConfig.get('initialData');
  if (companyImageUrl) {
    const logo = appConfig.getResourceUrl(companyImageUrl);
    return (
      <Image src={logo} alt={companyName} title={companyName} fluid className="company-logo" />
    );
  }
  return (
    <span className="h2">{companyName}</span>
  );
};

export default CompanyLogo;
