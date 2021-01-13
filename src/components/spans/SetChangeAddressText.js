import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class SetChangeAddressText extends Component {
  render() {
    const { isBilling } = this.props;

    const changeText = isBilling
      ? <FormattedMessage id="SetChangeAddressText.ChangeBilling" defaultMessage="Change billing address" />
      : <FormattedMessage id="SetChangeAddressText.ChangeShipping" defaultMessage="Change shipping address" />;

    return (
      <span>
        {changeText}
      </span>
    );
  }
}

SetChangeAddressText.propTypes = {
  isBilling: PropTypes.bool.isRequired,
};

export default SetChangeAddressText;
