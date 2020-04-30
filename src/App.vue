<template>
  <div id="app">
    <transition name="fade">
      <div v-if="uiStates.isLoading" class="page-loader">
          <font-awesome-icon size="4x" icon="spinner" color="#FF85B4" pulse />
      </div>
    </transition>
        <!-- eslint-disable-next-line max-len -->
    <nav class="navbar" :class="[{ 'navbar-filled': uiStates.isScrolled }, { 'is-confirmation': $route.matched.some(({ name }) => name === 'Order Confirmation') }]">
      <router-link class="navbar-brand" to="/">
        <!-- eslint-disable-next-line max-len -->
        <svg width="175px" viewBox="0 0 210 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- eslint-disable-next-line max-len -->
        <path d="M205.068 0.292086L200.136 0.275421V5.5742L205.068 5.54788V34.974H210V0.292086H205.068ZM194.017 8.72224C194.017 4.09447 191.84 0 186.71 0C182.596 0 179.309 3.40592 179.309 7.55214V10.2792H184.24V7.44864C184.24 5.84085 185.204 4.96283 186.659 4.96283C189.077 4.96283 189.077 7.05305 189.077 8.8082C189.077 10.709 189.077 11.6808 188.208 13.3842L179.309 30.2857V34.9653H194.017V29.9937H185.118L192.373 15.913C193.922 12.9535 194.017 12.0764 194.017 8.72224ZM147.602 15.7841H144.796V4.97161H147.361C150.993 4.97161 151.57 6.87236 151.57 10.3818C151.57 13.8316 151.045 15.7841 147.602 15.7841ZM156.51 10.4765C156.51 3.75063 153.652 0.292086 147.8 0.292086H139.865V34.974H144.796V20.1706H147.748L152.345 34.9828H157.568L152.25 19.147C155.391 17.3918 156.51 14.4675 156.51 10.4765ZM117.548 34.974H132.257V30.0024H122.488V19.8268H131V15.1473H122.488V4.97161H132.257V0.292086H117.548V34.974ZM100.98 24.5054H100.886L96.9695 0.292086H91.7458L98.7599 34.974H103.115L110.181 0.292086H104.957L100.98 24.5054ZM70.7024 34.974H85.4109V30.0024H75.6339V19.8268H84.1462V15.1473H75.6339V4.97161H85.403V0.292086H70.7024V34.974ZM53.834 15.7841H51.0282V4.97161H53.5927C57.2253 4.97161 57.8019 6.87236 57.8019 10.3818C57.7931 13.8316 57.2683 15.7841 53.834 15.7841ZM62.7334 10.4765C62.7334 3.75063 59.8758 0.292086 54.0236 0.292086H46.0879V34.974H51.0194V20.1706H53.9718L58.5672 34.9828H63.7918L58.4724 19.147C61.6231 17.3918 62.7334 14.4675 62.7334 10.4765ZM33.2216 26.7939C33.2216 29.1849 31.6717 30.3033 29.8821 30.3033C28.0917 30.3033 26.5427 29.1849 26.5427 26.7939V8.47225C26.5427 6.08118 28.0917 4.96283 29.8821 4.96283C31.6717 4.96283 33.2216 6.08118 33.2216 8.47225V26.7939ZM29.8821 0C25.8625 0 21.6112 2.82087 21.6112 8.47225V26.7851C21.6112 32.4365 25.8713 35.2574 29.8821 35.2574C33.9009 35.2574 38.1531 32.4365 38.1531 26.7851V8.47225C38.1531 2.82087 33.9009 0 29.8821 0ZM0 34.974H4.9315V20.1706H13.4438V15.4911H4.9315V4.97161H14.6997V0.292086H0V34.974Z" fill="white"/>
        </svg>
      </router-link>
      <ul class="navbar-nav navbar-main ml-auto">
        <li class="nav-item" style="position: relative;">
          <a href="https://www.instagram.com/forever21/?hl=en" target="_blank" class="social-stats hide-mobile">
            <span class="icon-container"><font-awesome-icon icon="heart"  /></span>
            <span class="copy-container">Liked by 32k</span>
            <span class="icon-container"><font-awesome-icon icon="comment"  /></span>
            <span class="copy-container">312 Comments</span>
          </a>
          <div class="nav-link nav-cart" @click="uiStates.cartVisible = !uiStates.cartVisible">
            <transition name="fade">
              <img v-if="!uiStates.cartVisible"
                src="./assets/cart_icon.svg"
                alt="Shopping cart icon"
              >
              <font-awesome-icon v-else icon="times" />
            </transition>
            <div class="cart-count" v-if="cart.total_items > 0">{{this.cart.total_items}}</div>
          </div>
        </li>
      </ul>
    </nav>
    <transition name="grow">
      <cart
        v-if="uiStates.cartVisible"
        :cart="cart"
        :scrolled="uiStates.isScrolled"
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
import {
  faShoppingCart,
  faSpinner,
  faHeart,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import Cart from './views/Cart.vue';

library.add(faShoppingCart, faSpinner, faHeart, faComment);

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
        isScrolled: false,
      },
    };
  },
  created() {
    this.getProducts();
    this.getMerchantInformation();
    this.getCart();

    window.addEventListener('scroll', this.handleSCroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleSCroll);
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
    handleSCroll() {
      if (window.scrollY > 100 && !this.uiStates.isScrolled) {
        this.uiStates.isScrolled = true;
      } else if (window.scrollY < 100) {
        this.uiStates.isScrolled = false;
      }
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
  transition: all .3s linear;
  background-color: transparent;
  flex-direction: row;
  display: flex;
  position: fixed;
  padding: 20px 30px;
  justify-content: space-between;
  width: 100%;
  z-index: 3;
  &.navbar-filled{
    transition: all .3s linear;
    background-color: #fff;
    border-bottom: 1px solid black;
    .navbar-brand{
      svg{
        path{
          transition: all .3s linear;
          fill:#000;
        }
      }
    }
    .social-stats{
      color:$color-brand;
    }
  }
  &.is-confirmation{
    .navbar-brand {
      svg{
        path{
          transition: all .3s linear;
          fill:#000;
        }
      }
    }
    .nav-cart{
      opacity:0;
      pointer-events: none;
    }
    .social-stats{
      color:$color-brand;
    }
  }
  .navbar-brand {
    svg{
      path{
        transition: all .3s linear;
        fill:#fff;
      }
    }
  }
  .nav-cart {
    transition:background-color .3s linear;
    position: relative;
    cursor: pointer;
    background-color: $color-brand;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    color: #fff;
    text-align: center;
    font-size: 30px;
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
      font-weight: 700;
    }
    &:hover, &:active, &:focus {
      transition:background-color .3s linear;
      background-color: darken($color-brand, 15%);
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
@media only screen and (max-width: 991px) {
  .navbar .navbar-main .nav-item {
      border-top: none;
      margin-top: 0px;
      padding-top: 0;
  }
}
.social-stats{
  transition: color .3s linear;
  position: absolute;
  right: 60px;
  margin-top: 16px;
  width: 395px;
  color:#fff;
  &:hover,
  &:active,
  &:focus{
    transition: color .3s linear;
    text-decoration: none;
    color:$color-accent;
  }
  .copy-container{
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    margin-right: 30px;
  }
}
.icon-container{
  font-size: 20px;
  margin-right: 10px;
}
</style>
