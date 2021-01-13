import { clone } from 'lodash';
import { hasRequiredFields } from './address';

describe('Testing address.js', () => {
  const validData = {
    city: 'Enschede',
    street: 'Roombeek',
    streetnumber: '123',
    zipcode: '1234AB',
    country_iso2: 'NL',
  };

  const invalidData = {
    city: '',
    street: '',
    streetnumber: '',
    zipcode: '',
    country_iso2: '',
  };

  it('should be false on empty address', () => {
    expect(hasRequiredFields(invalidData)).toBe(false);
  });

  it('should be true on fill in address', () => {
    expect(hasRequiredFields(validData)).toBe(true);
  });

  it('should be false on partly empty address', () => {
    const missingCity = clone(validData);
    missingCity.city = '';

    expect(hasRequiredFields(missingCity)).toBe(false);
  });
});
