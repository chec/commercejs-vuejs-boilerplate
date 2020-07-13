<template>
  <div v-if="Object.keys(categories).length > 0">
    <button @click="selectedCategory = ''">
      Clear
    </button>
    <div>
      <select v-model="selectedCategory">
        <option value="">Filter Categories...</option>
        <option
          :value="category.name"
          :key="index"
          v-for="(category, index) in categories.data"
        >
          {{category.name}}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryFilter',
  props: ['categories'],
  data() {
    return {
      selectedCategory: '',
    };
  },
  watch: {
    selectedCategory() {
      this.$emit('input', this.selectedCategory);
    },
  },
};
</script>
