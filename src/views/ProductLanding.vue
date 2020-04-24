<template>
  <div class="product-landing-page">
    <div class="hero-banner" style="background-image: url('./images/outfit.jpeg');">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="copy-container">
              <h1>Shop the Look</h1>
              <!-- eslint-disable-next-line max-len -->
              <h4>Include an add all products. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti excepturi eaque veritatis provident enim sint vero sit accusamus consequatur! Beatae esse odit non dolore eius distinctio veritatis consequatur minus laudantium.</h4>
              <a class="btn btn-primary"
                href="#productListing"
                v-smooth-scroll="{ duration: 1000, updateHistory: false }"
              >See Items</a>
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
.hero-banner {
  height: calc(100vh - 56px);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  .copy-container{
    margin-top: 30vh;
    color:white;
  }
}
.form-categories{
  width:200px;
  float: right;
  margin-top: .3rem;
}
.btn-clear{
  float:right;
  margin-top:2px;
  margin-left:.5rem;
  margin-top: .3rem;
}
</style>
