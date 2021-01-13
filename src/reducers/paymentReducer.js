import { UPDATE_PAYMENT_ID } from '../actions/types';

const initialState = {
  paymentId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAYMENT_ID:
      return {
        ...state,
        paymentId: action.payload,
      };
    default:
      return state;
  }
}
