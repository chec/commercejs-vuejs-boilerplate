<template>
    <section>
        <h1>404</h1>
        <h3>holy guacamole! Looks like this page doesnt exist.</h3>
        <a href="/" class="button-primary">
            <span>Back to Home</span>
        </a>
        <p>
            Contact us by email at
            <a :href="'mailto:' + merchant.support_email">
            {{merchant.support_email}}
        </a>
        </p>
    </section>
</template>

<script>
export default {
  name: 'Error',
  props: ['merchant'],
};
</script>
