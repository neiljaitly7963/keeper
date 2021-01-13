import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class SetChangeAddressText extends Component {
  render() {
    const { isBilling } = this.props;

    const buttonText = isBilling
      ? <FormattedMessage id="SetChangeAddressText.SetShipping" defaultMessage="Same as billing address" />
      : <FormattedMessage id="SetChangeAddressText.SetBilling" defaultMessage="Same as shipping address" />;

    return (
      <span>
        {buttonText}
      </span>
    );
  }
}

SetChangeAddressText.propTypes = {
  isBilling: PropTypes.bool.isRequired,
};

export default SetChangeAddressText;
