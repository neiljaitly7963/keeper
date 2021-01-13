import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCountryName } from '../../utility/country';

class Country extends Component {
  render() {
    return (
      <span>
        {getCountryName(this.props.countryIs2)}
      </span>
    );
  }
}

Country.propTypes = {
  countryIs2: PropTypes.string.isRequired,
};

export default Country;
