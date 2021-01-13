import {
  get, set, unset, cloneDeep,
} from 'lodash';
import React from 'react';
import Country from '../components/spans/Country';

export const REQUIRED_FIELDS = ['city', 'street', 'streetnumber', 'zipcode', 'country_iso2'];

export const AVAILABLE_FIELDS = [
  'city',
  'street',
  'streetnumber',
  'zipcode',
  'flatnumber',
  'country_iso2',
];

export const AVAILABLE_Person_FIELDS = ['firstname', 'familyname_prefix', 'familyname'];

export const AVAILABLE_Contact_FIELDS = ['phone'];

/**
 * Checks if an address has all its required fields
 * @param address
 * @return {boolean}
 */
export function hasRequiredFields(address) {
  let hasFields = true;

  REQUIRED_FIELDS.forEach((field) => {
    if (!address[field]) hasFields = false;
  });

  return hasFields;
}

export function getAddressFromOrder(orderData, getBilling = true) {
  const { shipping_address, billing_address } = orderData;
  const targetAddress = getBilling ? billing_address : shipping_address;

  const preferredField = getBilling ? 'address_billing' : 'contact_address';
  const fallbackField = getBilling ? 'contact_address' : 'address_billing';

  const getFallback = (field) => get(targetAddress, `${fallbackField}.${field}`, '');
  const getPreferred = (field) => get(targetAddress, `${preferredField}.${field}`, getFallback(field));

  const getFallbackPerson = (field) => get(targetAddress, `contact_person.${field}`, '');
  const getPreferredPerson = (field) => get(targetAddress, `contact_person.${field}`, getFallbackPerson(field));

  const getFallbackContact = (field) => get(targetAddress, `contact_person.${field}`, '');
  const getPreferredContact = (field) => get(targetAddress, `contact_person.contact_set.${field}`, getFallbackContact(field));

  return {
    city: getPreferred('city'),
    street: getPreferred('street'),
    streetnumber: getPreferred('streetnumber'),
    zipcode: getPreferred('zipcode'),
    flatnumber: getPreferred('flatnumber'),
    country_iso2: getPreferred('country_iso2'),
    firstname: getPreferredPerson('firstname'),
    familyname: getPreferredPerson('familyname'),
    familyname_prefix: getPreferredPerson('familyname_prefix'),
    phone: getPreferredContact('phone'),
  };
}

export function getAddressForUpdate(orderData, updateAddressData, setBilling) {
  const { shipping_address, billing_address } = orderData;
  const targetAddress = cloneDeep(setBilling ? billing_address : shipping_address);

  const targetField = setBilling ? 'address_billing' : 'contact_address';

  const setAddress = (field, value) => set(targetAddress, `${targetField}.${field}`, value);

  const setPersonInfo = (field, value) => set(targetAddress, `contact_person.${field}`, value);

  const setContactInfo = (field, value) => set(targetAddress, `contact_person.contact_set.${field}`, value);

  AVAILABLE_FIELDS.forEach((field) => {
    if (field in updateAddressData) {
      setAddress(field, updateAddressData[field]);
    }
  });

  AVAILABLE_Person_FIELDS.forEach((field) => {
    if (field in updateAddressData) {
      setPersonInfo(field, updateAddressData[field]);
    }
  });

  AVAILABLE_Contact_FIELDS.forEach((field) => {
    if (field in updateAddressData) {
      setContactInfo(field, updateAddressData[field]);
    }
  });

  /** Fields to get rid off */
  [
    'address_id',
    'address_billing_id',
    'parent_id',
    'person_id',
    'hash',
    'id',
    'relation_data_id',
    'date_created',
  ].forEach((field) => unset(targetAddress, field));

  return targetAddress;
}

export function getContactDetailsForUpdate(orderData, updateAddressData, setBilling) {
  const { shipping_address, billing_address } = orderData;
  const targetAddress = cloneDeep(setBilling ? billing_address : shipping_address);
  console.log(targetAddress, 'targetAddress');
  const targetField = setBilling ? 'address_billing' : 'contact_address';
  console.log(targetField, 'targetField');

  set(targetAddress, 'contact_person.firstname', updateAddressData.firstname);
  set(targetAddress, 'contact_person.familyname', updateAddressData.familyname);
  set(targetAddress, 'contact_person.contact_set.phone', updateAddressData.phone);

  return targetAddress;
}

export function formatAddress(address) {
  if (address) {
    const street = get(address, 'street', '-');
    const streetNumber = get(address, 'streetnumber', '');
    const zipcode = get(address, 'zipcode', '');
    const city = get(address, 'city', '');
    const countryIso2 = get(address, 'country_iso2', '');

    return (
      <span>
        {street}
        {' '}
        {streetNumber}
        ,
        <br />
        {' '}
        {zipcode}
        {' '}
        {city}
        ,
        <br />
        {' '}
        <Country countryIs2={countryIso2} />
      </span>
    );
  }
  return 'No address set yet';
}

export function formatName(address) {
  if (address) {
    const firstname = get(address, 'firstname', '-');
    const familyname = get(address, 'familyname', '');

    return (
      <span>
        {firstname}
        {' '}
        {familyname}
      </span>
    );
  }
  return 'No address set yet';
}

export function formatContact(address) {
  if (address) {
    const phone = get(address, 'phone', '-');

    return <span>{phone}</span>;
  }
  return 'No address set yet';
}
