<template>
    <div class="confirm-container">
      <div class="sprinkles"><img class="" src="../assets/sprinkles-1.svg"></div>
        <div class="row">
            <div class="col-md-12 text-center confirm-container__hero">
              <div class="icon-container">
                <font-awesome-icon size="" icon="laugh-beam" />
              </div>
              <h1>Thank you!</h1>
              <h3>Your order has been received</h3>
              <p><strong>Order Reference:</strong> {{orderRef}}</p>
              <br>
              <!-- eslint-disable-next-line max-len -->
              <p>Contact us by email at <a :href="'mailto:' + merchant.support_email">{{merchant.support_email}}</a></p>
              <br>
              <br>
              <a href="/" class="button-primary">
                <span>Back to Home</span>
              </a>
            </div>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLaughBeam } from '@fortawesome/free-solid-svg-icons';

library.add(faLaughBeam);

export default {
  name: 'Confirmation',
  props: ['orderRef', 'merchant'],
};
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";
@import "../styles/index.scss";

.confirm-container {
  position: relative;
  height: 90vh;

  &:before {
    position: absolute;
    top: -3em;
    right:2em;
    content:'';
    background:url('../assets/sprinkles-1.svg') top right no-repeat;
    width: 198.13px;
    height: 165.3px;
  }
  .sprinkles {
    position: absolute;
    bottom: 3em;
    left: 1.75em;
    transform: rotate(90deg) scaleY(-1);
  }
  &__hero {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%);
    @media only screen and (max-width: 991px) {
      h1{
        font-size: 3rem;
      }
      h3{
        font-size: 1.3rem;
      }
    }
    .button-primary {
      width: 200px;
      position: relative;
      margin: 0 auto;
      margin-top: 30px;
    }

  }
}
.icon-container{
  font-size: 120px;
  color: $color-brand;
}
</style>
