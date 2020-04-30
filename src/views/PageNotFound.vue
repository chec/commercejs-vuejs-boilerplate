<template>
    <section class="no-page" style="background-image: url('./images/hero-img.jpg');">
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-md-4 text-center">
                    <div class="page-not-found-copy">
                        <div class="icon-container">
                            <font-awesome-icon size="" icon="frown" />
                        </div>
                        <h1>404</h1>
                        <h3>holy guacamole! Looks like this page doesnt exist.</h3>
                        <br>
                        <a href="/" class="button-primary">
                            <span>Back to Home</span>
                        </a>
                        <br>
                        <br>
                        <!-- eslint-disable-next-line max-len -->
                        <p>Contact us by email at <a :href="'mailto:' + merchant.support_email">{{merchant.support_email}}</a></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFrown } from '@fortawesome/free-solid-svg-icons';

library.add(faFrown);
export default {
  name: 'About',
  props: ['merchant'],
};
</script>
<style scoped lang="scss">
@import "../styles/_variables.scss";
    .no-page{
        height: 100vh;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        position: relative;
    }
    h1{
        font-size: 130px;
    }
    .page-not-found-copy{
        position: absolute;
        padding: 50px 25px;
        top: calc(50vh - 340px);
        background: url("../assets/404_bg_white.svg");
        width: 445px;
        height: 681px;
        @media only screen and (max-width: 991px) {
          h1{
            font-size: 3rem;
          }
          h3{
            font-size: 1.3rem;
          }
        }
    }
    .button-primary{
        display: inline-block;
    }
    .icon-container{
        font-size: 120px;
        color: $color-brand;
    }
</style>
