<template>
  <section>
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
    <div v-if="cart.line_items.length">
      <CartItem
        @remove-from-cart="$emit('remove-from-cart', $event)"
        v-for="(item, index) in cart.line_items"
        :key="index"
        :item="item"
      />
      <div>
        <strong>Total:</strong> {{cart.subtotal.formatted_with_symbol}}
      </div>
    </div>
    <div v-else>
      <h5>Your cart appears to be empty</h5>
    </div>
    <button
      @click="captureCheckout()"
    >Confirm Order</button>
  </section>
</template>

<script>
import CartItem from './CartItem.vue';

export default {
  name: 'Checkout',
  props: ['cart', 'merchant'],
  components: {
    CartItem,
  },
  data() {
    return {
      fields: {
        line_items_foo: null,
        line_items: this.cart.line_items,
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
      checkoutToken: null,
      shippingOptions: [],
      message: {
        status: 'alert-danger',
        copy: '',
      },
    };
  },
  watch: {
    cart() {
      this.generateToken();
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
  mounted() {
    if (this.cart.id) {
      this.generateToken();
    }
  },
  methods: {
    generateToken() {
      this.$commerce.checkout.generateToken(
        this.cart.id,
        { type: 'cart' },
      ).then((result) => {
        this.checkoutToken = result.id;
        this.getShippingMethods(this.checkoutToken, this.fields.shipping.country);
      }).catch((error) => {
        console.error(`Token Error: ${error.message}`);
      });
    },
    getShippingMethods(orderKey, country) {
      this.$commerce.checkout.getShippingOptions(orderKey, { country }).then((result) => {
        this.shippingOptions = result;
      }).catch((error) => {
        console.error(`Product Error: ${error.message}`);
      });
    },
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
        console.log(error);
        this.message.copy = `<strong>${error.data.status_code}</strong>: ${error.data.error.message}`;
        console.error(`Product Error: ${error.message}`);
      });
    },
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
  },
};
</script>
