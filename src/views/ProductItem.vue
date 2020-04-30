<template>
    <!-- eslint-disable-next-line max-len -->
    <div class="product-item-container" v-if="product" :class="{dark: index % 2, light: !(index % 2)}">
      <img class="sprinkles-2" src="../assets/sprinkles-2.svg">
      <img class="sprinkles-3" src="../assets/sprinkles-3.svg">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="row">
                  <div class="col-6 text-center"  v-if="index % 2 === 0">
                    <img class="card-img" :src="product.media.source" alt="Product Image">
                  </div>
                  <div class="col-6">
                    <div class="card-body">
                      <h3 class="card-title">{{product.name}}</h3>
                      <div
                        class="card-text"
                        v-html="product.description"
                      >Loading...</div>
                      <div class="row justify-content-center" style="margin-top:2rem">
                          <div class="col-md-12 text-left"  v-if="product.variants">
                              <div class="form-group"
                                  :key="index"
                                  v-for="(variant, index) in product.variants">
                                  <label>${{product.price.formatted}}</label>
                                  <select
                                      v-model="selectedVariant"
                                      class="form-control option-select"
                                      :name="variant.name"
                                      placeholder="Choose..."
                                  >
                                      <option value="">Choose...</option>
                                      <option
                                          :value="option"
                                          :key="index"
                                          v-for="(option, index) in variant.options">
                                          {{ option.name }}
                                      </option>
                                  </select>
                              </div>
                          </div>
                          <div class="col-md-12 text-left">
                              <div class="form-group clearfix">
                                  <input
                                    v-model="selectedAmount"
                                    class="form-control quantity-input"
                                    type="text"
                                  >
                                  <div
                                    @click="addToCart()"
                                    :disabled="quantityWarning.enabled"
                                    class="button-primary btn-add-to-cart "
                                  >
                                    <span>Add to Cart</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 text-center" v-if="index % 2 !== 0">
                    <img class="card-img" :src="product.media.source" alt="Card image cap">
                  </div>
                </div>
              </div>
            </div>
          </div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/_variables.scss";

.product-item-container {
  padding: 20vh 0;
  width: 95%;
  margin: 0 auto;
  top: -40px;
  position: relative;

  &.light {
    background-color: #fff;

    &:before{
      content:'';
      width:100%;
      background-color: inherit;
      height:90px;
      position: absolute;
      top:-80px;
      left:0;
      right:0;
      clip-path: polygon(0 60%, 100% 0%, 100% 100%, 0% 100%);
    }

    &:after {
      z-index:1;
      position: absolute;
      top:-2em;
      right:2em;
      content:'';
      background:url('../assets/sprinkles-1.svg') top right no-repeat;
      width: 100%;
      height: 100%;
    }

    .sprinkles-2 {
      position: absolute;
      bottom: 5em;
      left: 2em;
    }
  }

  &.light:not(:last-child) {
    .sprinkles-3 {
      display: none;
    }
  }

  &.light:last-of-type {
    .sprinkles-2 {
      display: none;
    }

    .sprinkles-3 {
      position: absolute;
      bottom: 2em;
      left: 2em;
    }
  }

  &.light:not(:first-of-type) {
     filter: drop-shadow(0px -20px 0px rgb(253, 251, 117));
    // &:before{
    //   content:'';
    //   width:100%;
    //   background-color: $color-accent;
    //   height:90px;
    //   position: absolute;
    //   top:-80px;
    //   left:0;
    //   right:0;
    //   clip-path: polygon(0% 60%, 100% 0%, 100% 50%, 0% 100%);
    // }
  }

  &.dark {
    background-color: $color-brand;
    color: white;
    // filter: drop-shadow(0px -40px 0px rgb(253, 251, 117));

    .sprinkles-2, .sprinkles-3 {
      display: none;
    }

    .btn-add-to-cart {
      background-color: $color-accent;
      color: black;
      z-index: 0;
    }

    &:before{
      content:'';
      width:100%;
      background-color: $color-accent;
      height:120px;
      position: absolute;
      top:-120px;
      padding-bottom: 50px;
      left:0;
      right:0;
      clip-path: polygon(0% 60%, 100% 90%, 100% 100%, 0% 100%);
    }

    &:after{
      content:'';
      width:100%;
      background-color: inherit;
      height:90px;
      position: absolute;
      top:-80px;
      left:0;
      right:0;
      clip-path: polygon(0 60%, 100% 90%, 100% 100%, 0% 100%);
    }
  }


  .card {
    border:0;
    background-color: transparent;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-around;

    .card-body {
      margin: 6em 5em 4em;

      .card-title {
        font-weight: 900;
        margin-bottom: 25px;
      }

      .card-text{
        margin-bottom: 0;
        text-align:justify;
      }
    }

    .button-primary{
      font-size: 12px;
    }

    .btn-add-to-cart{
      width: calc(100% - 58px);
      float: right;
      margin-right:0px;
      border-radius: 0px;
    }
  }
}

    .form-control{
        width: 100%;
    }

    .quantity-remaining{
        text-align: right;
        margin-top:2px;
        font-size: 11px;
        color: #dc3545;
    }

    .form-group {
      label{
        float: right;
        font-weight: 700;
      }
    }
    .option-select{
      border: 2px solid black;
      border-radius: 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: white;
      background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='13.446px' height='8.076px' enable-background='new 0 0 13.446 8.076' xml:space='preserve'%3E%3Cpolyline fill='none' stroke='%23535453' stroke-width='3' stroke-miterlimit='10' points='13.269,0.177 6.723,6.723 0.177,0.177 '/%3E%3C/svg%3E");
      background-repeat: no-repeat, repeat;
      background-position: right .7em top 50%, 0 0;
      background-size: .65em auto, 100%;
      cursor: pointer;
    }
    .quantity-input{
      width: 48px;
      text-align: center;
      float: left;
      border: 2px solid black;
      border-radius: 0;
    }

</style>
