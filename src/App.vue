<template>
  <div id="app">
    <cart
      :cart="cart"
      @checkout="checkout"
      @clear-cart="clearCart"
      @remove-from-cart="removeFromCart"
    />
    <hr>
    <router-view
      @add-to-cart="addToCart"
      @remove-from-cart="removeFromCart"
      :products="products"
      :merchant="merchant"
      :checkout-token="checkoutToken"
      :cart="cart"
      :orderRef="orderRef"
    />
  </div>
</template>
<script>
import Cart from './views/Cart.vue';

export default {
  name: 'app',
  components: {
    Cart,
  },
  data() {
    return {
      merchant: {
        business_name: 'Loading...',
      },
      products: [],
      cart: null,
      orderRef: null,
      checkoutToken: null,
    };
  },
  created() {
    this.getProducts();
    this.getMerchantInformation();
    this.getCart();
  },
  watch: {
    cart() {
      if (this.cart.line_items.length) {
        this.generateToken();
      }
    },
  },
  methods: {
    /**
     * Retrieves the list of products and stores them in the data object.
     * https://commercejs.com/docs/sdk/products#list-products
     *
     * @return {object} product list object.
     */
    getProducts() {
      this.$commerce.products.list().then((result) => {
        this.products = result.data.map((product) => product);
      }).catch((error) => {
        console.error(`Product Error: ${error.message}`);
      });
    },
    /**
     * Retrieves the the merchant data object and stores it in the data object.
     * https://commercejs.com/docs/sdk/full-sdk-reference#merchants
     *
     * @return {object} merchant data object.
     */
    getMerchantInformation() {
      this.$commerce.merchants.about().then((result) => {
        this.merchant = result;
        document.title = `${this.merchant.business_name} - Boilerplate`;
      }).catch((error) => {
        console.error(`Merchant Error: ${error.message}`);
      });
    },
    /**
     * Creates the cart object and stores it.
     * https://commercejs.com/docs/sdk/cart#retrieve-cart
     *
     * @return {object} The initial cart object.
     */
    getCart() {
      this.$commerce.cart.retrieve().then((result) => {
        this.cart = result;
      }).catch((error) => {
        console.error(`Cart Error: ${error.message}`);
      });
    },
    /**
     * Add's the selected product to the live cart object.
     * https://commercejs.com/docs/sdk/cart#add-to-cart
     *
     * @param {string} Product item Id.
     * @param {number} Quantity of product to be added.
     * @param {string} Product variant id.
     *
     * @return {object} The updated cart object.
     */
    addToCart({ productId, productAmount, productVariant }) {
      this.$commerce.cart.add(
        productId,
        productAmount,
        productVariant,
      ).then((result) => {
        this.cart = result.cart;
      }).catch((error) => {
        console.error(`Add to Cart Error: ${error.message}`);
      });
    },
    /**
     * Clear's all items from the live cart object.
     * https://commercejs.com/docs/sdk/cart#empty-cart
     *
     * @return {object} The updated, now empty, cart object.
     */
    clearCart() {
      this.$commerce.cart.empty().then((result) => {
        this.cart = result.cart;
      }).catch((error) => {
        console.error(`Clear Cart Error: ${error.message}`);
      });
    },
    /**
     * Removes a single item from the cart object.
     * https://commercejs.com/docs/sdk/cart#remove-from-cart
     *
     * @param {string} Product Item Id.
     *
     * @return {object} The updated, cart object.
     */
    removeFromCart(itemId) {
      this.$commerce.cart.remove(itemId).then((result) => {
        this.cart = result.cart;
      }).catch((error) => {
        console.error(`Remove from Cart Error: ${error.message}`);
      });
    },
    /**
     * Navigates to the checkout page.
     */
    checkout() {
      this.$router.push('/checkout');
    },
    /**
     * Generates the checkout token from the cart ID that can be used
     * to initiate the capturing of an order.
     * https://commercejs.com/docs/sdk/checkout#generate-token
     *
     * @return {object} Checkout token object containing everything needed
     * for a checkout page.
     */
    generateToken() {
      this.$commerce.checkout.generateToken(
        this.cart.id,
        { type: 'cart' },
      ).then((result) => {
        this.checkoutToken = result.id;
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>
<style lang="scss">
  @import 'styles/index.scss';
</style>
