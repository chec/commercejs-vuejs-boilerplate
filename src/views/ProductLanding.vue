<template>
  <div>
    <CategoryFilter
      :categories="categories"
      v-model="selectedCategory"
    />
    <div v-if="this.filteredItems">
        <ProductItem
          @add-to-cart="$emit('add-to-cart', $event)"
          v-for="(product, index) in filteredItems" :key="index"
          :product="product"
          :index="index"
        />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CategoryFilter from './CategoryFilter.vue';
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
    CategoryFilter,
    ProductItem,
  },
  mounted() {
    this.getCategories();
  },
  computed: {
    // Filters the visible products based on the category
    // selected. If no category is selected, it returns
    // all products.
    filteredItems() {
      let filteredProducts = this.products;

      if (this.selectedCategory !== '') {
        // eslint-disable-next-line max-len
        filteredProducts = this.products.filter((product) => product.categories.length > 0
          && product.categories[0].name === this.selectedCategory);
      }

      return filteredProducts;
    },
  },
  methods: {
    // Gets a listing of the available categories.
    getCategories() {
      axios.get(`${process.env.VUE_APP_CHEC_API_URL}/v1/categories`, {
        headers: {
          'X-Authorization': process.env.VUE_APP_CHEC_PUBLIC_KEY,
        },
      }).then((result) => {
        this.categories = result.data;
      }).catch((error) => {
        console.error(`Category Retreval Error: ${error.message}`);
      });
    },
  },
};
</script>
