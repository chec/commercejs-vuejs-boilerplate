<template>
  <section>
    <div v-if="liveObject !== null">
      <div v-if="message.copy !== ''"
        style="color:red"
      >
        <strong>Holy guacamole!</strong> an error occured:
        <p v-html="message.copy">Loading...</p>
      </div>
      <h1 class="checkout-heading">Checkout</h1>
      <h4>Customer Details</h4>
      <label for="">First Name</label>
      <input v-model="fields.customer.firstname" type="text">
      <label for="">Last Name</label>
      <label for="">Email</label>
      <input v-model="fields.customer.email" type="text">
      <h4>Shipping Details</h4>
      <label for="">Name</label>
      <input v-model="fields.shipping.name" type="text">
      <label for="">Street</label>
      <input v-model="fields.shipping.street" type="text">
      <label for="">City/Town</label>
      <input v-model="fields.shipping.town_city" type="text">
      <label for="">Province</label>
      <input v-model="fields.shipping.county_state"
        type="text"
      >
      <label for="">Country</label>
      <input v-model="fields.shipping.country" type="text" disabled="">
      <label for="">Postal/Zip</label>
      <input
        v-model="fields.shipping.postal_zip_code"
        type="text"

      >
      <h4>Shipping Options</h4>
      <label for="">Shipping Method</label>
      <select
        v-model="fields.fulfillment.shipping_method"
        name=""
      >
          <option value="">Choose...</option>
          <option
            :key="index"
            v-for="(option, index) in shippingOptions"
            :value="option.id"
          >
            {{option.description}}
          </option>
      </select>
      <h4>Payment Details</h4>
      <label for="">Card Number</label>
      <input v-model="fields.payment.card.number" type="text">
      <label for="">Expiry Month</label>
      <input v-model="fields.payment.card.expiry_month" type="text">
      <label for="">Expiry Year</label>
      <input v-model="fields.payment.card.expiry_year" type="text">
      <label for="">CVC</label>
      <input v-model="fields.payment.card.cvc" type="text">
      <label for="">Postal Code</label>
      <input v-model="fields.payment.card.postal_zip_code" type="text">
      <hr>
      <h1>Cart</h1>
      <div>
        <CartItem
          @remove-from-cart="$emit('remove-from-cart', $event)"
          v-for="(item, index) in cart.line_items"
          :key="index"
          :item="item"
        />
        <div v-if="shippingOptions.length">
          <strong>Shipping:</strong> {{shippingOptions[0].price.formatted_with_symbol}}
        </div>
        <div v-if="liveObject.tax.amount.raw !== 0">
          <strong>Tax:</strong> {{liveObject.tax.amount.formatted_with_symbol}}
        </div>
        <div>
          <strong>Total:</strong> {{liveObject.total_due.formatted_with_symbol}}
        </div>
      </div>
      <button
        @click="captureCheckout()"
      >Confirm Order</button>
    </div>
    <div v-else>
      <h5>Your cart appears to be empty</h5>
      <a href="/">Take me home</a>
    </div>
  </section>
</template>

<script>
import CartItem from './CartItem.vue';

export default {
  name: 'Checkout',
  props: ['cart', 'merchant', 'checkoutToken'],
  components: {
    CartItem,
  },
  data() {
    return {
      fields: {
        customer: {
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@example.com',
        },
        shipping: {
          name: 'John Doe',
          street: '123 Fake St',
          town_city: 'San Francisco',
          county_state: 'CA',
          postal_zip_code: '94103',
          country: 'US',
        },
        fulfillment: {
          shipping_method: '',
        },
        payment: {
          gateway: 'test_gateway',
          card: {
            number: '4242 4242 4242 4242',
            expiry_month: '01',
            expiry_year: '2023',
            cvc: '123',
            postal_zip_code: '94103',
          },
        },
      },
      shippingOptions: [],
      message: {
        status: 'alert-danger',
        copy: '',
      },
      liveObject: null,
    };
  },
  watch: {
    checkoutToken() {
      this.generateLiveObject();
      this.getShippingMethods(this.checkoutToken, this.fields.shipping.country);
    },
    selectedCountry() {
      if (this.selectedCountry !== '' && this.selectedCounty !== '') {
        this.getShippingMethods(this.checkoutToken, this.fields.shipping.country);
      }
    },
    selectedPostal() {
      this.calculateTax(this.fields.shipping);
    },
    selectedCounty() {
      this.calculateTax(this.fields.shipping);
    },
    selectedFullfillment() {
      this.checkShippingMethods(this.fields.fulfillment.shipping_method, this.fields.shipping);
    },
    message: {
      handler() {
        setTimeout(() => {
          this.message.copy = '';
        }, 3000);
      },
      deep: true,
    },
  },
  computed: {
    selectedCountry() {
      return this.fields.shipping.country;
    },
    selectedPostal() {
      return this.fields.shipping.postal_zip_code;
    },
    selectedCounty() {
      return this.fields.shipping.county_state;
    },
    selectedFullfillment() {
      return this.fields.fulfillment.shipping_method;
    },
  },
  mounted() {
    if (this.checkoutToken == null) {
      return;
    }
    this.generateLiveObject();
  },
  methods: {
    /**
     * Gets the available shipping options
     * https://commercejs.com/docs/sdk/full-sdk-reference#checkout
     *
     * @param {string} Checkout Token
     * @param {object} Selected Country
     *
     * @return {object} List of available shipping options as defined
     * by the merchant.
     */
    getShippingMethods(checkoutToken, country) {
      this.$commerce.checkout.getShippingOptions(checkoutToken, { country }).then((result) => {
        this.shippingOptions = result;
      }).catch((error) => {
        console.error(`Product Error: ${error.message}`);
      });
    },
    /**
     * Capture the order and payment.
     * https://commercejs.com/docs/sdk/checkout#capture-order
     *
     * @param {string} Checkout Token.
     * @param {object} Selected products, customer information,shipping information,
     * fullfillment option selected and payment information.
     *
     * @return {object} Order object to be used for reciepts.
     */
    captureCheckout() {
      this.$commerce.checkout.capture(
        this.checkoutToken,
        {
          line_items: this.lineItemsSanitized(this.cart.line_items),
          customer: this.fields.customer,
          shipping: this.fields.shipping,
          fulfillment: this.fields.fulfillment,
          payment: this.fields.payment,
        },
      ).then((result) => {
        this.$parent.orderRef = result.customer_reference;
        this.$parent.getCart();
        this.$router.push('/order-confirmation');
      }).catch((error) => {
        this.message.copy = `<strong>${error.data.status_code}</strong>: ${error.data.error.message}`;
      });
    },
    /**
     * Sanitize the line items and get them ready for the order capture.
     */
    lineItemsSanitized(lineItems) {
      return lineItems.reduce((data, lineItem) => {
        const item = data;
        let variantData = null;
        if (lineItem.variants.length) {
          variantData = {
            [lineItem.variants[0].variant_id]: lineItem.variants[0].option_id,
          };
        }
        item[lineItem.id] = {
          quantity: lineItem.quantity,
          variants: variantData,
        };
        return item;
      }, {});
    },
    /**
     * Retrieves the live object for use displaying the live cart,
     * shipping, tax and total costs.
     * https://commercejs.com/docs/sdk/checkout#get-the-live-object
     *
     * @param {string} Checkout token.
     *
     * @return {object} Live checkout object.
     */
    generateLiveObject() {
      this.$commerce.checkout.getLive(this.checkoutToken)
        .then((response) => {
          console.log('liveObject');
          console.log(response);
          this.liveObject = response;
        })
        .catch((error) => {
          this.message.copy = `<strong>${error.data.status_code}</strong>: ${error.data.error.message}`;
        });
    },
    /**
     * Validates the selected shipping method and applies it to the order.
     * https://commercejs.com/docs/sdk/checkout#check-shipping-method
     *
     * @param {string} Shipping option id.
     * @param {string} Country Code eg: US
     * @param {string} Region Code eg: CA
     */
    checkShippingMethods(shippingId, shippingData) {
      this.$commerce.checkout.checkShippingOption(this.checkoutToken, {
        shipping_option_id: shippingId,
        country: shippingData.country,
        region: shippingData.county_state,
      })
        .then(() => {
          this.generateLiveObject();
        })
        .catch((error) => {
          this.message.copy = `<strong>Error:</strong>: ${error.data.error.message}`;
        });
    },
    /**
     * Sets the tax zone to the order based on location.
     * https://commercejs.com/docs/sdk/checkout#set-tax-zone
     *
     * @param {string} Checkout token.
     * @param {string} Country Code eg: US
     * @param {string} Region Code eg: CA
     * @param {string} Postal/ZIP Code
     *
     * @return {object} Live checkout object.
     */
    calculateTax(shippingData) {
      this.$commerce.checkout.setTaxZone(this.checkoutToken, {
        country: shippingData.country,
        region: shippingData.county_state,
        postal_zip_code: shippingData.postal_zip_code,
      })
        .then(() => {
          this.generateLiveObject();
        })
        .catch((error) => {
          this.message.copy = `<strong>Error:</strong>: ${error.data.error.message}`;
        });
    },
  },
};
</script>
