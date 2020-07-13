<template>
  <div class="cart-item">
    <hr>
    <img :src="item.media.source" alt="">
    <h5>{{item.name}}</h5>
    <p>Quantity: {{item.quantity}}</p>
    <p
      v-if="item.variants.length"
    >Size: {{item.variants[0].option_name}}</p>
    <button @click="$emit('remove-from-cart', item.id)">
      Remove
    </button>
    <p><strong>{{item.line_total.formatted_with_symbol}}</strong></p>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: ['item'],
  data() {
    return {
      cartVisible: false,
    };
  },
};
</script>

<style lang="scss">
  .cart-item{
    max-width: 200px;
    img{
      max-width: 100%;
    }
  }
</style>
