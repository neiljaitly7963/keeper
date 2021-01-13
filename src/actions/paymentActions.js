import { UPDATE_PAYMENT_ID } from './types';

/**
 * @internal
 * @param paymentId
 * @return {function(...[*]=)}
 */
export const updatePaymentId = (paymentId) => (dispatch) => {
  dispatch({
    type: UPDATE_PAYMENT_ID,
    payload: paymentId,
  });
};
