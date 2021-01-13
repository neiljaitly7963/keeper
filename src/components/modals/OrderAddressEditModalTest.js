import React, { useState } from 'react';
import './modal-styles.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';

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

  const [street, setStreet] = useState('');

  const [city, setCity] = useState('');

  const [received, setReceived] = useState(false);

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
    console.log(updatedAddress, 'updatedAddress');
    // Reset error
    setError(false);

    try {
      // Update address
      const newAddress = getAddressForUpdate(order, updatedAddress, isBilling);
      // console.log(newAddress, 'newAddress');
      await updateAddress(newAddress);
      const newAddressContact = getContactDetailsForUpdate(order, updatedAddress, isBilling);
      console.log(newAddressContact, 'newAddressContact');
      await updateAddress(newAddressContact);
      // Resets internal form cache
      reset(updatedAddress);
      await closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

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
      {error}
    </Alert>
  );

  const handleChange = () => {
    const values = getValues();

    onSubmit(values);
    // Do something with values, in my case I have used the 'setActiveFilter' function above.
  };

  const getStreetAndCity = () => {
    const values = getValues();
    const postcode = values.zipcode;
    const housenumber = values.streetnumber;
    fetch(`https://postcode.storekeeper.nl/?postcode=${postcode}&housenumber=${housenumber}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 'ok') {
            setValue('street', 'result.details.city', { shouldValidate: true });
            setValue('city', 'result.details.street', { shouldValidate: true });

            setReceived(true);
          }
        },
        (err) => {
          console.log('error in getting city and street', err);
        },
      );
  };

  return (
    <>
      {error ? showError() : ''}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <CustomBox>
          <span
            style={{
              fontSize: '18px',
              color: 'rgba(0, 0, 0, 0.6)',
              fontWeight: '500',
            }}
          >
            Verzendadres
          </span>
          <AddressFormGrid>
            <InputsLabelContainer>
              <IconContainer>
                <StyledIcon src={User} />
              </IconContainer>
              <InputsContainer style={{ justifyContent: 'flex-start' }}>
                <StyledInput
                  small
                  placeholder="Voornaam"
                  style={{ marginRight: '27px' }}
                  type="text"
                  name="firstName"
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
                {errors.firstName && renderFormGroupError(errors.firstName.message)}
                <StyledInput
                  extrasmall
                  type="text"
                  name="middleName"
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
                {errors.middleName && renderFormGroupError(errors.middleName.message)}
                <StyledInput
                  medium
                  placeholder="Achternaam"
                  style={{ marginLeft: 'auto' }}
                  type="text"
                  name="lastName"
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
                {errors.lastName && renderFormGroupError(errors.lastName.message)}
              </InputsContainer>
            </InputsLabelContainer>
            <InputsLabelContainer>
              <IconContainer>
                <StyledIcon src={Map} />
              </IconContainer>
              <InputsContainer>
                <StyledInput
                  onChange={getStreetAndCity}
                  type="text"
                  big
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
                  onChange={getStreetAndCity}
                  medium
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
              <InputsContainer>
                <Form.Control
                  as="select"
                  name="country_iso2"
                  ref={register()}
                  className="modaldropdown"
                  style={{ border: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.3)' }}
                >
                  {countryOptions}
                </Form.Control>
                {errors.country_iso2 && renderFormGroupError(errors.country_iso2.message)}
              </InputsContainer>
            </InputsLabelContainer>
            <InputsLabelContainer>
              <IconContainer>
                <StyledIcon src={Phone} />
              </IconContainer>
              <InputsContainer>
                <StyledInput
                  type="number"
                  extrabig
                  placeholder="Telefoonnummer"
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
              //   <InputsLabelContainer>
              //   <IconContainer style={{ alignItems: 'center' }}>
              //     <StyledIcon src={Ellipse} style={{ height: '12px', width: '12px' }} />
              //   </IconContainer>
              //   <InputsContainer>
              //     <span style={{ fontWeight: '400', fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}>
              //       Factuur adres anders dan bezorgadres
              //     </span>
              //   </InputsContainer>
              // </InputsLabelContainer>
            }
            <Button type="submit" variant="success">
              {isLoading ? (
                <Spinner animation="grow" size="sm" />
              ) : (
                <FormattedMessage
                  id="OrderAddressEditModal.Update"
                  defaultMessage="Update address"
                />
              )}
            </Button>
          </AddressFormGrid>
        </CustomBox>
      </Form>
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
