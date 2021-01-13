import React, { useState, useEffect } from 'react';
import './modal-styles.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import { debounce } from 'lodash';
import {
  Button, Col, Form, Row, Spinner, Alert,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { getAddressForUpdate, getContactDetailsForUpdate } from '../../utility/address';
import webApi from '../../utility/webApi';
import { getTranslatedCountries } from '../../utility/country';
import SetChangeAddressText from '../spans/SetChangeAddressText';
import appConfig from '../../utility/appConfig';
import { getIntl } from '../../utility/translations';

import CustomBox from '../Cards/CustomBox';
import {
  AddressFormGrid,
  InputsLabelContainer,
  InputsContainer,
  IconContainer,
  StyledIcon,
} from '../AddressForm/AddressFormComponents';
import StyledInput from '../Input/StyledInput';

// SVG
import User from '../../Icons/user.svg';
import Map from '../../Icons/map.svg';
import Phone from '../../Icons/phone.svg';
import Ellipse from '../../Icons/ellipse.svg';
/**
 * This styling is used by the modal. and is required to be done this way.
 * Example: https://github.com/reactjs/react-modal#examples
 */
const customStyles = {
  content: {
    width: 'initial',
    margin: '0 auto',
    bottom: 'initial',
  },
};

const OrderAddressEditModal = (props) => {
  const intl = getIntl();

  const [error, setError] = useState(false);

  const {
    isBilling, modalShown, closeModal, isLoading, address, order, dispatch,
  } = props;

  // Set default country_iso2
  if (!address.country_iso2) {
    address.country_iso2 = appConfig.get('initialData.company_country_iso2');
  }

  // Setup form
  const {
    handleSubmit, register, errors, reset, getValues, setValue,
  } = useForm({
    defaultValues: address,
  });

  // Get options for country select
  const countryOptions = getTranslatedCountries(intl).map((country) => (
    <option key={country.iso2} value={country.iso2}>
      {country.name}
    </option>
  ));

  const updateAddress = (newAddress) => {
    const target = isBilling ? 'billing_address' : 'shipping_address';
    return dispatch(
      webApi.actions.updateAddress(
        { target },
        {
          body: JSON.stringify(newAddress),
        },
      ),
    );
  };

  const onSubmit = async (updatedAddress) => {
    // Reset error
    setError(false);

    try {
      // Update address
      const newAddress = getAddressForUpdate(order, updatedAddress, isBilling);
      console.log(newAddress, 'newAddress');
      await updateAddress(newAddress);

      // Resets internal form cache
      reset(updatedAddress);
      await closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFormOnChangeSubmit = debounce(handleSubmit(onSubmit), 3000);

  async function postData(url) {
    const options = {
      method: 'GET',
    };
    const response = await fetch(url, options);
    return response;
  }

  const getStreetAndCity = () => {
    const values = getValues();
    const postcode = values.zipcode;
    const housenumber = values.streetnumber;
    postData(`https://postcode.storekeeper.nl/?postcode=${postcode}&housenumber=${housenumber}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 'ok') {
            setValue('street', result.details.city, { shouldValidate: true });
            setValue('city', result.details.street, { shouldValidate: true });
          } else if (result.status === 'error') {
            if (result.errormessage) {
              setValue('street', '', { shouldValidate: true });
              setValue('city', '', { shouldValidate: true });
            }
          }
        },
        (err) => {
          console.log('error in getting city and street', err);
        },
      );
  };

  useEffect(() => {
    getStreetAndCity();
  }, []);

  const renderFormGroupError = (message) => (
    <div className="invalid-feedback" style={{ display: 'block' }}>
      {message}
    </div>
  );

  const showError = () => (
    <Alert variant="danger">
      <FormattedMessage
        id="Error.UpdateAddress"
        defaultMessage="An error occurred while updating your address"
      />
      :
      {' '}
      {error}
    </Alert>
  );

  return (
    <>
      {error ? showError() : ''}
      {console.log(address, 'address in return')}
      <CustomBox>
        <span
          style={{
            fontSize: '18px',
            color: 'rgba(0, 0, 0, 0.6)',
            fontWeight: '500',
          }}
        >
          <FormattedMessage
            id="OrderAddressRow.ShippingAddress"
            defaultMessage=" Shipping address"
          />
        </span>
        <Form onChange={handleFormOnChangeSubmit} style={{ marginTop: '15px' }}>
          <InputsLabelContainer>
            <IconContainer>
              <StyledIcon src={User} />
            </IconContainer>
            <InputsContainer style={{ justifyContent: 'flex-start' }}>
              <StyledInput
                style={{ marginRight: '27px' }}
                small
                type="text"
                placeholder="First Name"
                name="firstname"
                ref={register({
                  required: intl.formatMessage({
                    id: 'Error.Required',
                    defaultMessage: 'Required',
                  }),
                  pattern: {
                    value: /\w+/,
                    message: intl.formatMessage({
                      id: 'Error.Required',
                      defaultMessage: 'Required',
                    }),
                  },
                })}
              />
              {errors.firstname && renderFormGroupError(errors.firstname.message)}

              <StyledInput
                extrasmall
                type="text"
                placeholder=""
                name="familyname_prefix"
                ref={register({
                  required: intl.formatMessage({
                    id: 'Error.Required',
                    defaultMessage: 'Required',
                  }),
                  pattern: {
                    value: /\w+/,
                    message: intl.formatMessage({
                      id: 'Error.Required',
                      defaultMessage: 'Required',
                    }),
                  },
                })}
              />
              {errors.familyname_prefix && renderFormGroupError(errors.familyname_prefix.message)}

              <StyledInput
                style={{ marginLeft: 'auto' }}
                medium
                type="text"
                placeholder="Last Name"
                name="familyname"
                ref={register({
                  required: intl.formatMessage({
                    id: 'Error.Required',
                    defaultMessage: 'Required',
                  }),
                  pattern: {
                    value: /\w+/,
                    message: intl.formatMessage({
                      id: 'Error.Required',
                      defaultMessage: 'Required',
                    }),
                  },
                })}
              />
              {errors.familyname && renderFormGroupError(errors.familyname.message)}
            </InputsContainer>
          </InputsLabelContainer>

          <InputsLabelContainer>
            <IconContainer>
              <StyledIcon src={Map} />
            </IconContainer>
            <InputsContainer>
              <StyledInput
                big
                onChange={getStreetAndCity}
                type="text"
                placeholder={intl.formatMessage({
                  id: 'Address.PostalCode',
                  defaultMessage: 'Postal code',
                })}
                name="zipcode"
                ref={register({
                  required: intl.formatMessage({
                    id: 'Error.Required',
                    defaultMessage: 'Required',
                  }),
                  pattern: {
                    value: /\w+/,
                    message: intl.formatMessage({
                      id: 'Error.Required',
                      defaultMessage: 'Required',
                    }),
                  },
                })}
              />
              {errors.zipcode && renderFormGroupError(errors.zipcode.message)}

              <StyledInput
                medium
                onChange={getStreetAndCity}
                type="text"
                placeholder={intl.formatMessage({
                  id: 'Address.HouseNumber',
                  defaultMessage: 'House number',
                })}
                name="streetnumber"
                ref={register({
                  required: intl.formatMessage({
                    id: 'Error.Required',
                    defaultMessage: 'Required',
                  }),
                  pattern: {
                    value: /^\d+$/,
                    message: intl.formatMessage({
                      id: 'Address.InvalidHouseNumber',
                      defaultMessage: 'Invalid house number',
                    }),
                  },
                })}
              />
              {errors.streetnumber && renderFormGroupError(errors.streetnumber.message)}
            </InputsContainer>
          </InputsLabelContainer>
          <InputsLabelContainer>
            <IconContainer>
              <span />
            </IconContainer>
            <InputsContainer>
              <StyledInput
                big
                type="text"
                placeholder={intl.formatMessage({
                  id: 'Address.Street',
                  defaultMessage: 'Street',
                })}
                name="street"
                ref={register({
                  required: intl.formatMessage({
                    id: 'Error.Required',
                    defaultMessage: 'Required',
                  }),
                  pattern: {
                    value: /\w+/,
                    message: intl.formatMessage({
                      id: 'Error.Required',
                      defaultMessage: 'Required',
                    }),
                  },
                })}
              />
              {errors.street && renderFormGroupError(errors.street.message)}
              <StyledInput
                medium
                type="text"
                placeholder={intl.formatMessage({ id: 'Address.City', defaultMessage: 'City' })}
                name="city"
                ref={register({
                  required: intl.formatMessage({
                    id: 'Error.Required',
                    defaultMessage: 'Required',
                  }),
                  pattern: {
                    value: /\w+/,
                    message: intl.formatMessage({
                      id: 'Error.Required',
                      defaultMessage: 'Required',
                    }),
                  },
                })}
              />
              {errors.city && renderFormGroupError(errors.city.message)}
            </InputsContainer>
          </InputsLabelContainer>
          <InputsLabelContainer>
            <IconContainer>
              <span />
            </IconContainer>
            <select
              as="select"
              name="country_iso2"
              ref={register()}
              style={{
                border: 'none',
                borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
                width: '100%',
              }}
            >
              {countryOptions}
            </select>
          </InputsLabelContainer>

          <InputsLabelContainer>
            <IconContainer>
              <StyledIcon src={Phone} />
            </IconContainer>
            <InputsContainer>
              <StyledInput
                extrabig
                type="text"
                placeholder="Phone"
                name="phone"
                ref={register({
                  required: intl.formatMessage({
                    id: 'Error.Required',
                    defaultMessage: 'Required',
                  }),
                  pattern: {
                    value: /\w+/,
                    message: intl.formatMessage({
                      id: 'Error.Required',
                      defaultMessage: 'Required',
                    }),
                  },
                })}
              />
              {errors.phone && renderFormGroupError(errors.phone.message)}
            </InputsContainer>
          </InputsLabelContainer>

          {
            //   <Button type="submit" variant="success">
            //   {isLoading ? (
            //     <Spinner animation="grow" size="sm" />
            //   ) : (
            //     <FormattedMessage id="OrderAddressEditModal.Update" defaultMessage="Update address" />
            //   )}
            // </Button>
          }
        </Form>
      </CustomBox>
    </>
  );
};

OrderAddressEditModal.propTypes = {
  modalShown: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  isBilling: PropTypes.bool,
  address: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.getOrder.data,
  isLoading: state.updateAddress.loading,
});

export default connect(mapStateToProps)(OrderAddressEditModal);
