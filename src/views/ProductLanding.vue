<template>
  <div class="product-landing">
    <div class="product-landing__hero" style="background-image: url('./images/hero-img.jpg');">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="copy-container">
              <h1>Creativity Can't be Stopped</h1>
              <!-- eslint-disable-next-line max-len -->
              <h3 class="pt-2 pb-3">Mix and match the outfit for the ultimate street yet stylish look</h3>
                <div class="button-hero"
                  href="#productListing"
                  v-smooth-scroll="{ duration: 1000, updateHistory: false }"
                >
                  <span>Shop Look</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div id="productListing" class="product-listing-container" v-if="this.filteredItems">
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

.product-listing-container{
  margin-top: -90px;
}
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
      @media only screen and (max-width: 991px) {
        text-align: center;
        margin-top: 12vh;
        width: 100%;
        left: auto;
        h1{
          font-size: 3rem;
        }
        h3{
          font-size: 1.3rem;
        }
        .button-hero{
          margin: 0 auto;
        }
      }
    }
    @media only screen and (max-width: 991px) {
        height:50vh;
    }
  }
}

.form-categories{
  width:200px;
  float: right;
  margin-top: .3rem;
}

</style>
