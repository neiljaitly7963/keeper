import { FormattedMessage, createIntlCache, createIntl } from 'react-intl';
import React from 'react';
import translations from '../locales/translation.json';

/**
 * Loads the translations that are not directly used as formatted message.
 * This function should never be executed anywhere and is just to help pick up translation keys.
 * @returns {*}
 */
function ensureTranslations() {
  return (
    <div>
      <FormattedMessage id="Address.HouseNumber" defaultMessage="House number" />
      <FormattedMessage id="Address.Street" defaultMessage="Street" />
      <FormattedMessage id="Address.FlatNumber" defaultMessage="Flat number" />
      <FormattedMessage id="Address.InvalidPostalCode" defaultMessage="Invalid postal code" />
      <FormattedMessage id="Address.InvalidHouseNumber" defaultMessage="Invalid house number" />
      <FormattedMessage id="Error.Required" defaultMessage="Required" />
      <FormattedMessage id="Country.Netherlands" defaultMessage="Netherlands" />
      <FormattedMessage id="Country.Belgium" defaultMessage="Belgium" />
      <FormattedMessage id="Country.Germany" defaultMessage="Germany" />
      <FormattedMessage
        id="Error.InvalidShippingAddress"
        defaultMessage="Invalid shipping address"
      />
      <FormattedMessage id="Error.InvalidBillingAddress" defaultMessage="Invalid billing address" />
      <FormattedMessage id="Error.MissingPayment" defaultMessage="No payment method selected" />
    </div>
  );
}

/**
 * Create global intl object
 */

/** Create a intl for translation pruposes */
const cache = createIntlCache();
const intl = createIntl(
  {
    locale: 'nl-NL',
    defaultLocale: 'en-GB',
    messages: translations.nl,
    onError: (err) => {
      // Skip if we are in development mode
      if (process.env.NODE_ENV !== 'development') return;

      // Skip if the error id starts with the ignoredKeys, we dont log the errors.
      const ignoredKeys = ['Country'];
      const descriptorId = err.descriptor && err.descriptor.id ? err.descriptor.id : null;
      if (descriptorId && ignoredKeys.find((key) => descriptorId.startsWith(key))) return;

      // Log the errors.
      console.error(err);
    },
  },
  cache,
);

/**
 * Returns the intl object. This can be used for the RawIntlProvider or to formatMessage on.
 * One object/function for other user cases
 * @return {IntlShape}
 */
export function getIntl() {
  return intl;
}
