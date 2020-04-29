<template>
  <div class="cart-container" :class="{'is-scrolled': scrolled}">
    <div class="cart-container__heading clearfix">
       <div class="row">
         <div class="col-6">
           <h3>Cart</h3>
         </div>
         <div class="col-6 clear-cart-container" v-if="cart.line_items.length">
           <div class="clear-cart" @click="$emit('clear-cart')">Clear Cart</div>
         </div>
       </div>
    </div>
    <div v-if="cart.line_items.length">
      <div v-for="(item, index) in cart.line_items" :key="index" class="cart-container__item">
        <img class="cart-container__item-thumb" :src="item.media.source" alt="">
        <div class="cart-container__item-details">
          <div class="name">{{item.name}}</div>
          <div class="quantity">Quantity: {{item.quantity}}</div>
          <div
            v-if="item.variants.length"
            class="variant"
          >Size: {{item.variants[0].option_name}}</div>
          <button
          class="badge badge-danger"
          @click="$emit('remove-from-cart', item.id)"
        >
          Remove
        </button>
        </div>
        <div class="cart-container__item-price">${{item.line_total.formatted_with_symbol}}</div>
      </div>
      <div class="cart-container__footer">
        <div class="btn-checkout" @click="$emit('checkout')"><span>Checkout</span></div>
        <!-- eslint-disable-next-line max-len -->
        <div class="cart-container__footer-total"><span>Total:</span> {{cart.subtotal.formatted_with_symbol}}</div>
      </div>
    </div>
    <div class="no-cart" v-else>
      <p class="text-center">Your cart appears to be empty</p>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);
export default {
  name: 'Cart',
  props: ['cart', 'scrolled'],
};
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

  .cart-container{
    background-color: rgba(255, 255, 255, .9);
    position: fixed;
    margin: 40px;
    padding: 1rem 0 1rem;
    overflow-x:auto;
    width: 500px;
    right: 20px;
    z-index: 1;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
    &::after{
      background: url("../assets/cart_bg.svg");
      content:"";
      position: absolute;
      width:75px;
      height:67px;
      bottom:28px;
      right:28px;
    }
    &__heading{
      padding:0 0px 11px;
      margin: 0 20px;
      border-bottom: 1px solid #000;
      h3{
        font-size: 22px;
        text-transform: uppercase;
      }
      .clear-cart-container{
        width:100%;
        text-align: right;
      }
      .clear-cart{
        padding-top:4px;
        font-size: 14px;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    &.is-scrolled{
      margin-top: 101px;
    }
    .no-cart {
      padding: 2.5rem 1rem 0;
    }
    &__item {
      position: relative;
      width:100%;
      padding:20px;
      text-align: left;
      display: flex;
      border-bottom: 1px solid #D4D4D4;
      &-thumb {
        max-width: 25%;
        padding-right: 8px;
      }
      &-details {
        padding-top:11px;
        flex-grow: 1;
        .name {
          font-weight: 700;
          padding-bottom: 5px;
        }
        .quantity, .variant {
          font-size: 14px;
        }
        .badge-danger{
          font-size: 12px;
          padding:5px 0 0 0;
        }
      }
      &-price {
        font-weight: 700;
        padding-top: 11px;
      }
    }
    .close {
      z-index: 999;
      position: absolute;
      right: -22px;
      top: -22px;
      color: white;
      cursor: pointer;
      border-radius: 50%;
      background-color: $color-brand;
      padding: 20px;
      width: 60px;
      height: 60px;
      -webkit-box-shadow: 4px 4px 0px $color-accent;
      -moz-box-shadow:    4px 4px 0px $color-accent;
      box-shadow:         4px 4px 0px $color-accent;
    }

    &__footer{
      display: flex;
      padding: 20px 30px;
      justify-content: space-between;

      &-total {
        padding-top: 12px;
        margin-left: 30px;
        margin-right: auto;

        span{
          font-weight: 700;
        }
      }
    }
  }

</style>
