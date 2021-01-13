import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import appConfig from './appConfig';

const baseUrl = appConfig.getApiBaseUrl();
const options = {
  headers: {
    'X-API-KEY': appConfig.get('api.apiKey', {}),
  },
};

const ReduxApi = reduxApi({

  getOrder: {
    url: baseUrl+'order',
    options,
    reducer(state, action) {
      switch (action.type) {
        case '@@redux-api@updateAddress_success':
          return {
            ...state,
            data: action.data,
          };
        default:
          return state;
      }
    },
  },

  orderPdf: {
    url: baseUrl+'orderPdf',
    options,
  },

  listOrderPayments: {
    url: baseUrl+'orderPayments',
    options,
  },

  syncPayment: {
    url: baseUrl+'syncPayment',
    options: {
      ...options,
      method: 'post',
    },
  },

  updateAddress: {
    url: baseUrl+'order/:target',
    options: {
      ...options,
      method: 'post',
    },
  },

  payOrder: {
    url: baseUrl+'orderPayment',
    options: {
      ...options,
      method: 'post',
    },
  },

});

// Make the mirage wrapper work
const mirageFetch = (path, options) => fetch(path, options);
ReduxApi
  .use('fetch', adapterFetch(mirageFetch));

export default ReduxApi;
