import { find, sortBy, memoize } from 'lodash';
import Countries from '../data/countries.json';

const tlc = (s) => s.toLowerCase();

export const getCountry = (country_iso2) => {
  country_iso2 = country_iso2 || '';
  country_iso2 = tlc(country_iso2);
  return find(Countries, (obj) => tlc(obj.iso2) === country_iso2);
};

export const getCountryName = (country_iso2) => {
  const country = getCountry(country_iso2);
  if (country) return country.name;
  return country_iso2;
};

export const getCountries = () => sortBy(Countries, 'name');

/**
 * Translates the country names and sorts them by name
 * The result is saved(memoized) so it won't have to translate all countries again.
 *
 * @param intl
 */
export const getTranslatedCountries = memoize((intl) => {
  const translatedCountries = Countries.map((country) => {
    // The translation id is the country key + the country name without spaces
    const translationID = `Country.${country.name.replace(/\s/g, '')}`;

    country.name = intl.formatMessage({ id: translationID, defaultMessage: country.name });
    return country;
  });

  return sortBy(translatedCountries, 'name');
});
