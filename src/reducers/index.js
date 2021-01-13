import { combineReducers } from 'redux';
import paymentReducer from './paymentReducer';
import webApi from '../utility/webApi';

export default combineReducers({
  payment: paymentReducer,
  ...webApi.reducers,
});
