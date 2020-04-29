<template>
  <div class="product-landing">
    <div class="product-landing__hero" style="background-image: url('./images/hero-img.jpg');">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="copy-container">
              <h1>Shop the Look</h1>
              <!-- eslint-disable-next-line max-len -->
              <h3 class="pt-2 pb-3">Include an add all products. Lorem ipsum dolor sit amet, consectetur</h3>
                <div class="button-hero"
                  href="#productListing"
                  v-smooth-scroll="{ duration: 1000, updateHistory: false }"
                >
                  <span>Buy Look</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div id="productListing" v-if="this.filteredItems">
          <ProductItem
            @add-to-cart="$emit('add-to-cart', $event)"
            class="col-md-12"
            v-for="(product, index) in filteredItems" :key="index"
            :product="product"
            :index="index"
          />
      </div>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  name: 'ProductLanding',
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    merchant: {
      type: Object,
      default: () => [],
    },
  },
  data() {
    return {
      selectedCategory: '',
      categories: [],
    };
  },
  components: {
    ProductItem,
  },
  computed: {
    filteredItems() {
      let filteredProducts = this.products;

      if (this.selectedCategory !== '') {
        // eslint-disable-next-line max-len
        filteredProducts = this.products.filter((product) => product.categories[0].name === this.selectedCategory);
      }

      return filteredProducts;
    },
  },
};
</script>
<style scoped lang="scss">
@import "../styles/_variables.scss";

.product-landing {
  &__hero {
    height: 100vh;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    position: relative;
    .copy-container{
      position: absolute;
      margin-top: 30vh;
      color:white;
      width: 575px;
      left: -40px;
    }
  }
}

.form-categories{
  width:200px;
  float: right;
  margin-top: .3rem;
}

</style>
