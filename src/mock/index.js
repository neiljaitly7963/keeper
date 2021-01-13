import { Server } from 'miragejs';

export function makeServer() {
  return new Server({
    environment: 'development',
    routes() {
      this.namespace = 'api';

      /**
       * Gets the order object
       */
      this.get('order', () => require('./data/orderMissingShipment.json'));

      /**
       * Updates the order and returns the new order
       * This will mainly be used to update an orders address.
       */
      this.post('order/:target', (addressData) => require('./data/order.json'));

      /**
       * Returns the payments available for that order
       */
      this.get('orderPayments', () => require('./data/orderPayments.json'));

      /**
       * Returns the payments available for that order
       */
      this.post('syncPayment', () => require('./data/orderPayment.json'));

      /**
       * Returns order's pdf
       */
      this.get('orderPdf', () => require('./data/orderPdf.json'));

      /**
       * Creates a payment and returns the payment url
       */
      this.post('orderPayment', (payment_method_id) => require('./data/orderPayment.json'));
    },
  });
}
