<template>
  <section class="checkout-section">
    <div class="checkout-bg" style="background-image: url('./images/hero-img.jpg');"></div>
    <div class="container checkout-container">
      <div class="row">
        <div class="col-md-7 order-sm-2 order-md-1">
          <div class="form-container">
            <div class="col-md-12" style="z-index: 2;">
              <div class="row">
                <div class="col-12">
                  <h1 class="checkout-heading">Checkout</h1>
                  <h4 class="form-subheading">Customer Details</h4>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                      <label for="">First Name</label>
                      <input v-model="fields.customer.firstname" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <label for="">Last Name</label>
                      <input v-model="fields.customer.lastname" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <label for="">Email</label>
                      <input v-model="fields.customer.email" type="text" class="form-control">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <h4 class="form-subheading">Shipping Details</h4>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                      <label for="">Name</label>
                      <input v-model="fields.shipping.name" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <label for="">Street</label>
                      <input v-model="fields.shipping.street" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <label for="">City/Town</label>
                      <input v-model="fields.shipping.town_city" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <label for="">Province</label>
                      <input v-model="fields.shipping.county_state"
                        type="text"
                        class="form-control"
                      >
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <label for="">Country</label>
                      <!-- eslint-disable-next-line max-len -->
                      <input v-model="fields.shipping.country" type="text" class="form-control" disabled="">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <label for="">Postal/Zip</label>
                      <input
                        v-model="fields.shipping.postal_zip_code"
                        type="text"
                        class="form-control"
                      >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <h4 class="form-subheading">Shipping Options</h4>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                      <label for="">Shipping Method</label>
                      <select
                        v-model="fields.fulfillment.shipping_method"
                        name=""
                       class="form-control">
                          <option value="">Choose...</option>
                          <option
                            :key="index"
                            v-for="(option, index) in shippingOptions"
                            :value="option.id"
                          >
                            {{option.description}}
                          </option>
                      </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <h4 class="form-subheading">Payment Details</h4>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                      <label for="">Card Number</label>
                      <!-- eslint-disable-next-line max-len -->
                      <input v-model="fields.payment.card.number" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <label for="">Expiry Month</label>
                      <!-- eslint-disable-next-line max-len -->
                      <input v-model="fields.payment.card.expiry_month" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <label for="">Expiry Year</label>
                      <!-- eslint-disable-next-line max-len -->
                      <input v-model="fields.payment.card.expiry_year" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <label for="">CVC</label>
                      <!-- eslint-disable-next-line max-len -->
                      <input v-model="fields.payment.card.cvc" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                      <label for="">Postal Code</label>
                      <!-- eslint-disable-next-line max-len -->
                      <input v-model="fields.payment.card.postal_zip_code" type="text" class="form-control">
                  </div>
                </div>
                <div class="col-12 show-mobile">
                  <div class="btn btn-primary mb-4" @click="captureCheckout()">Confirm Order</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5 order-sm-1 order-md-2">
          <div class="cart-outer-container">
            <div v-if="cart.line_items" class="cart-container">
              <div class="cart-item" v-for="(item, index) in cart.line_items" :key="index">
                <div class="row">
                  <div class="col-4">
                    <div class="thumb-container">
                      <img class="cart-thumb" :src="item.media.source" alt="">
                    </div>
                  </div>
                  <div class="col-8">
                    <div>
                      <div class="name">{{item.name}}</div>
                      <div class="quantity"><strong>Quantity:</strong> {{item.quantity}}</div>
                      <div
                        v-if="item.variants.length"
                        class="quantity"
                      ><strong>Size:</strong> {{item.variants[0].option_name}}</div>
                    </div>
                    <div class="price">
                      <!-- eslint-disable-next-line max-len -->
                      ${{item.price.formatted * item.quantity}}
                    </div>
                    <button
                      class="badge badge-danger"
                      @click="$emit('remove-from-cart', item.id)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div class="cart-item total text-right">
                <strong>Total:</strong> {{cart.subtotal.formatted_with_symbol}}
              </div>
            </div>
          </div>
          <div
            class="btn btn-primary hide-mobile"
            @click="captureCheckout()"
          >Confirm Order</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Checkout',
  props: ['cart', 'merchant'],
  data() {
    return {
      fields: {
        line_items_foo: null,
        line_items: this.cart.line_items,
        customer: {
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@example.com',
        },
        shipping: {
          name: 'John Doe',
          street: '123 Fake St',
          town_city: 'San Francisco',
          county_state: 'CA',
          postal_zip_code: '94103',
          country: 'US',
        },
        fulfillment: {
          shipping_method: '',
        },
        payment: {
          gateway: 'test_gateway',
          card: {
            number: '4242 4242 4242 4242',
            expiry_month: '01',
            expiry_year: '2023',
            cvc: '123',
            postal_zip_code: '94103',
          },
        },
      },
      checkoutToken: null,
      shippingOptions: [],
    };
  },
  watch: {
    cart() {
      this.generateToken();
    },
  },
  mounted() {
    if (this.cart.id) {
      this.generateToken();
    }
  },
  methods: {
    generateToken() {
      this.$commerce.checkout.generateToken(
        this.cart.id,
        { type: 'cart' },
      ).then((result) => {
        this.checkoutToken = result.id;
        this.getShippingMethods(this.checkoutToken, this.fields.shipping.country);
      }).catch((error) => {
        console.error(`Token Error: ${error.message}`);
      });
    },
    getShippingMethods(orderKey, country) {
      this.$commerce.checkout.getShippingOptions(orderKey, { country }).then((result) => {
        this.shippingOptions = result;
      }).catch((error) => {
        console.error(`Product Error: ${error.message}`);
      });
    },
    captureCheckout() {
      this.$commerce.checkout.capture(
        this.checkoutToken,
        {
          line_items: this.lineItemsSanitized(this.cart.line_items),
          customer: this.fields.customer,
          shipping: this.fields.shipping,
          fulfillment: this.fields.fulfillment,
          payment: this.fields.payment,
        },
      ).then((result) => {
        this.$parent.orderRef = result.customer_reference;
        this.$parent.getCart();
        this.$router.push('/order-confirmation');
      }).catch((error) => {
        console.error(`Product Error: ${error.message}`);
      });
    },
    lineItemsSanitized(lineItems) {
      return lineItems.reduce((data, lineItem) => {
        const item = data;
        let variantData = null;
        if (lineItem.variants.length) {
          variantData = {
            [lineItem.variants[0].variant_id]: lineItem.variants[0].option_id,
          };
        }
        item[lineItem.id] = {
          quantity: lineItem.quantity,
          variants: variantData,
        };
        return item;
      }, {});
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../styles/_variables.scss";

  input {
    border: 1px solid #858585;
    border-radius: 0;
  }

  select {
    border-radius: 0;
    appearance: none;
    background-color: transparent;
    background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='13.446px' height='8.076px' enable-background='new 0 0 13.446 8.076' xml:space='preserve'%3E%3Cpolyline fill='none' stroke='%23535453' stroke-width='3' stroke-miterlimit='10' points='13.269,0.177 6.723,6.723 0.177,0.177 '/%3E%3C/svg%3E");
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
    cursor: pointer;
  }

  h4{
    color: #1c1c1c;
  }
  .badge-danger{
    position: absolute;
    right: 22px;
    color:#fff;
    top: 8px;
  }
  .total{
    padding: 1rem .5rem !important;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
  }
  .btn{
      width: 100%;
  }
  .form-control{
      width: 100%;
  }
    .cart-outer-container{
      background-color: $color-accent;
      width: 445px;
      min-height: 677px;
      padding:15px 0 0 15px;
      background: url("../assets/cart_bg_yellow.svg");
      background-repeat: no-repeat;
      margin-bottom: 32px;
    }
  .cart-container{
    background-color: $color-brand;
    background: url("../assets/cart_bg_pink.svg");
    background-repeat: no-repeat;
    width: 445px;
    min-height: 677px;
    padding:50px 8px 10px 10px;

    .cart-item{
      position: relative;
      padding:.5rem 5px;
      background-color: $color-brand;
      border-bottom: 1px solid #FFA0C4;
      color:#fff;
      &:last-of-type{
        border-bottom: none;
      }
    }
    .thumb-container{
      text-align: center;
      position: relative;
      width: 137px;
      height: 138px;
      background:transparent url('../assets/cart_thumb.svg') center center no-repeat;
      &:before{
        position: absolute;
        top:0;
        left:0;
        width: 94.92px;
        height: 106.24px;
      }
    }
    .cart-thumb{
      margin-top: 14px;
      height:96px;
    }
    .name{
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;

    }
    .quantity{
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
    }
  }
  .form-control{
    background-color: white;
    &:disabled{
      background-color: #e9ecef;
    }
  }
  h4{
    margin-top: 2rem;
  }
  .checkout-bg{
    min-height: 900px;
    background-size: cover;
  }

  .checkout-container{
    position: relative;
    top:-480px;
  }
  .btn-primary{
    text-align: center;
    color: white;
    border-color: $color-green;
    background-color: $color-green;
    padding: 15px 22px;
    font-weight: 800;
    text-transform: uppercase;
    position: relative;
    cursor: pointer;
    border-radius: 0;
    &:active,
    &:focus,
    &:hover{
      border-color: darken($color-green, 20%);
      background-color: darken($color-green, 20%);
    }
    &:after{
      content:"Button";
      padding: 15px 22px;
      font-weight: 800;
      background-color: #fff;
      position: absolute;
      left:20px;
      top:10px;
      bottom:-10px;
      right:-20px;
      z-index:-1;
    }
  }

  .form-container{
    background-color: #fff;
    position: relative;
    margin-top: 70px;
    &:before{
      content:'';
      width:100%;
      background-color: #fff;
      height:75px;
      position: absolute;
      top:-75px;
      left:0;
      right:0;
      clip-path: polygon(0 0, 0% 100%, 100% 100%);
    }
    &:after{
      z-index:1;
      position: absolute;
      top:13px;
      right:13px;
      content:'';
      background:transparent url('../assets/checkout_bg.svg') center center no-repeat;
      width: 89px;
      height: 170px;
    }
  }
  .checkout-heading{
    position: relative;
    top:-20px;
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    line-height: 55px;
  }
  .form-subheading{
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.2px;
    margin-bottom: 30px;
  }
</style>
