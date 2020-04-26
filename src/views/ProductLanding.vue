<template>
  <div class="product-landing-page">
    <div class="hero-banner">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="copy-container">
              <h1>Shop the Look</h1>
              <!-- eslint-disable-next-line max-len -->
              <h4>Include an add all products. Lorem ipsum dolor sit amet, consectetur</h4>
              <div class="button-group">
                <div class="button-primary">
                  <span>Buy Look</span>
                </div>
                <div class="button-secondary"
                  href="#productListing"
                  v-smooth-scroll="{ duration: 1000, updateHistory: false }"
                >
                  <span>See Items</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 hero-img">
            <img src="/images/hero_img2.png">
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

.hero-banner {
  height: calc(100vh - 50px);
  margin: 30px;
  background: $bg-color;
  .copy-container{
    margin-top: 30vh;
    width: 450px;

    h1{
      padding-bottom: 20px;
    }

    h4{
      padding-bottom: 20px;
    }
  }
  .button-group{
    display: flex;
  }
  // .hero-img{
  //   border: 1px solid red;
  // }
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
