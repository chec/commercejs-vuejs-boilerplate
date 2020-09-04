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
      uiStates: {
        isLoading: true,
      },
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
    getProducts() {
      this.$commerce.products.list().then((result) => {
        this.products = result.data.map((product) => product);
        this.uiStates.isLoading = false;
      }).catch((error) => {
        console.error(`Product Error: ${error.message}`);
      });
    },
    getMerchantInformation() {
      this.$commerce.merchants.about().then((result) => {
        this.merchant = result;
        document.title = `${this.merchant.business_name} - Boilerplate`;
      }).catch((error) => {
        console.error(`Merchant Error: ${error.message}`);
      });
    },
    getCart() {
      this.$commerce.cart.retrieve().then((result) => {
        this.cart = result;
      }).catch((error) => {
        console.error(`Cart Error: ${error.message}`);
      });
    },
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
    clearCart() {
      this.$commerce.cart.empty().then((result) => {
        this.cart = result.cart;
      }).catch((error) => {
        console.error(`Clear Cart Error: ${error.message}`);
      });
    },
    removeFromCart(itemId) {
      this.$commerce.cart.remove(itemId).then((result) => {
        this.cart = result.cart;
      }).catch((error) => {
        console.error(`Remove from Cart Error: ${error.message}`);
      });
    },
    checkout() {
      this.$router.push('/checkout');
    },
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
