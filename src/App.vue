<template>
  <div id="app">
    <transition name="fade">
      <div v-if="uiStates.isLoading" class="page-loader">
          <font-awesome-icon size="4x" icon="spinner" pulse />
      </div>
    </transition>
    <nav class="navbar">
      <router-link class="navbar-brand" to="/">
        <img src="./assets/logo_forever.svg" alt="Forever21 logo">
      </router-link>
      <ul class="navbar-nav navbar-main ml-auto">
        <li class="nav-item hide-mobile" style="position: relative;">
          <div class="nav-link nav-cart" @click="uiStates.cartVisible = !uiStates.cartVisible">
              <img src="./assets/cart_icon.svg" alt="Shopping cart icon">
            <div class="cart-count" v-if="cart.total_items > 0">{{this.cart.total_items}}</div>
          </div>
        </li>
      </ul>
    </nav>
    <transition name="grow">
      <cart
        v-if="uiStates.cartVisible"
        :cart="cart"
        @checkout="checkout"
        @clear-cart="clearCart"
        @remove-from-cart="removeFromCart"
      />
    </transition>
    <router-view
      @add-to-cart="addToCart"
      @remove-from-cart="removeFromCart"
      :products="products"
      :merchant="merchant"
      :cart="cart"
      :orderRef="orderRef"
    />
    <!-- <Footer/> -->
  </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Cart from './views/Cart.vue';

library.add(faShoppingCart, faSpinner);

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
      cart: [],
      orderRef: null,
      checkoutToken: null,
      uiStates: {
        isLoading: true,
        cartVisible: false,
      },
    };
  },
  created() {
    this.getProducts();
    this.getMerchantInformation();
    this.getCart();
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
        document.title = `${this.merchant.business_name} - Summer Look`;
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
      this.uiStates.cartVisible = false;
    },
  },
};
</script>
<style lang="scss">
@import 'styles/index.scss';
@import 'styles/_variables.scss';
#app {
  font-family: 'Muli', sans-serif;
  letter-spacing: 1.25px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.navbar {
  background-color: transparent;
  flex-direction: row;
  display: flex;
  position: fixed;
  padding: 20px 30px;
  justify-content: space-between;
  width: 100%;
  z-index: 1;

  .navbar-brand {
    img{
      width: 175px;
    }
  }
  .nav-cart {
    position: relative;
    cursor: pointer;
    background-color: $color-brand;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    -webkit-box-shadow: 4px 4px 0px $color-accent;
    -moz-box-shadow:    4px 4px 0px $color-accent;
    box-shadow:         4px 4px 0px $color-accent;

    img{
      position: absolute;
      top: 30%;
      left: 22%;
    }

    .cart-count{
      background-color: white;
      border: 1.5px solid $color-brand;
      width: 24px;
      height: 24px;
      font-size: 13px;
      color: black;
      border-radius: 50%;
      text-align: center;
      padding-left: 2px;
      position: absolute;
      top: -3px;
      right: -2px;
    }
  }

  .navbar-main .nav-item{
    @media only screen and (max-width: 991px) {
        border-top: 1px solid grey;
        margin-top: 6px;
        padding-top: 5px;
    }
  }
}


.grow-enter-active, .grow-leave-active {
  transition: all .5s;
}
.grow-enter, .grow-leave-to {
  opacity: 0;
  height: 1px;
  padding: 0rem 0rem !important;
}
.page-loader{
  margin-top: 56px;
  width: 100%;
  position: fixed;
  z-index: 2;
  background-color: #fff;
  top:0px;
  bottom:0px;
  text-align: center;
  padding-top:20rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

</style>
