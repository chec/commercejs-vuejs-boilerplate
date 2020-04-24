<template>
  <footer class="page-footer font-small pt-4">
    <div class="container text-center text-md-left">
      <div class="row">
        <div class="col-md-3 mb-md-0 mb-3">
          <h5 class="text-uppercase">More Looks</h5>
          <ul class="list-unstyled">
            <li>
              <a href="#!">Winter</a>
            </li>
            <li>
              <a href="#!">Fall</a>
            </li>
            <li>
              <a href="#!">Spring</a>
            </li>
            <li>
              <a href="#!">Rainy Day</a>
            </li>
          </ul>
        </div>
        <div class="col-md-3 mb-md-0 mb-3">
          <h5 class="text-uppercase">Social</h5>
          <ul class="list-unstyled">
            <li>
              <a href="#!">Facebook</a>
            </li>
            <li>
              <a href="#!">Instagram</a>
            </li>
            <li>
              <a href="#!">Twitter</a>
            </li>
          </ul>
        </div>
        <hr class="clearfix w-100 d-md-none pb-3">
        <div class="col-md-6 mt-md-0 mt-3">
          <h5 class="text-uppercase">Lorem Ipsum Dolor</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore,
          quaerat soluta perspiciatis vel vero ut adipisci reiciendis! Labore
        cupiditate voluptatibus expedita, qui error assumenda excepturi.</p>
        </div>
      </div>
    </div>
    <div class="footer-copyright text-center py-3">2020 Copyright
      <a href="https://commercejs.com/"> commercejs.com</a>
    </div>
  </footer>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);
export default {
  name: 'Footer',
};
</script>

<style scoped lang="scss">
  .page-footer{
    background-color: #1c1c1c;
    color:white;

    a{
      color:#adadad;
      &:hover,
      &:active,
      &:focus{
        color:#adadad;
        text-decoration: underline;
      }
    }
  }
</style>
