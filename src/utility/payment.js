import webApi from './webApi.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function ensurePaymentIsPaid(dispatch, payment_trx, retries = 0) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ payment_trx });
    dispatch(webApi.actions.syncPayment({}, { body }))
      .then(async (data) => {
        // Checking the payment status
        if (data.status === 'paid') {
          resolve();
        } else if (data.status === 'cancelled') {
          resolve();
        } else {
          // Re-trying
          await wait(5000);
          ensurePaymentIsPaid(dispatch, payment_trx, ++retries)
            .then(resolve, reject);
        }
      })
      .catch(reject);
  });
}
