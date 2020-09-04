<template>
    <div class="product-item" v-if="product">
      <hr>
      <img :src="product.media.source" alt="">
      <h3>{{product.name}}</h3>
      <div v-html="product.description">
        Loading...
      </div>
      <div v-if="product.variants">
          <div
              :key="index"
              v-for="(variant, index) in product.variants">
              <div>${{product.price.formatted}}</div>
              <select
                  v-model="selectedVariant"
                  :name="variant.name"
                  placeholder="Choose..."
              >
                  <option value="">Choose...</option>
                  <option
                    :value="option"
                    :key="index"
                    v-for="(option, index) in variant.options"
                  >
                    {{ option.name }}
                  </option>
              </select>
          </div>
      </div>
      <div>
        <label for="">Quantity</label>
        <input
          v-model="selectedAmount"
          type="text"
        >
      </div>
      <div>
        <button
          @click="addToCart()"
          :disabled="quantityWarning.enabled"
        >
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['product', 'index'],
  data() {
    return {
      selectedVariant: '',
      selectedAmount: 1,
      quantityWarning: {
        enabled: false,
        amount: '',
      },
    };
  },
  methods: {
    /**
     * Checks the instock quantity for the product
     * and disables the add to cart button if
     * not enough stock is available.
     */
    checkQuantity() {
      this.quantityWarning.enabled = false;
      let amount = this.product.quantity;
      if (this.product.variants) {
        amount = this.selectedVariant.quantity;
      }
      if (amount < this.selectedAmount) {
        this.quantityWarning.enabled = true;
        this.quantityWarning.amount = amount;
      }
    },
    /**
     * Add the product to the cart.
     */
    addToCart() {
      let variant = null;
      if (this.product.variants) {
        variant = { [this.product.variants[0].id]: this.selectedVariant.id };
      }
      this.$emit('add-to-cart', {
        productId: this.product.id,
        productAmount: this.selectedAmount,
        productVariant: variant,
      });
    },
  },
};
</script>

<style lang="scss">
  .product-item{
    margin: 0.5rem 1rem;
    img{
      max-width: 50%;
    }
  }
</style>
