<template>
  <div class="cart">
    <div @click="cartVisible = !cartVisible">
      <span v-if="!cartVisible">
        Cart
      </span>
      <span v-else>
        Close
      </span>
      <span v-if="cart !== null">({{this.cart.total_items}})</span>
    </div>
    <div v-if="cartVisible">
      <h3>Cart</h3>
      <button @click="$emit('clear-cart')">Clear Cart</button>
      <div v-if="cart.line_items.length">
        <div class="item-listing">
          <CartItem
          @remove-from-cart="$emit('remove-from-cart', $event)"
          v-for="(item, index) in cart.line_items"
          :key="index"
          :item="item"
        />
        </div>
        <hr>
        <button @click="$emit('checkout')">Checkout</button>
        <div>Total: {{cart.subtotal.formatted_with_symbol}}</div>
      </div>
      <div class="no-cart" v-else>
        <p class="text-center">Your cart appears to be empty</p>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem.vue';

export default {
  name: 'Cart',
  props: ['cart'],
  components: {
    CartItem,
  },
  data() {
    return {
      cartVisible: false,
    };
  },
};
</script>

<style lang="scss">
  .cart{
    .item-listing{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
    background-color: WhiteSmoke;
  }
</style>
