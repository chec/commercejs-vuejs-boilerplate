<template>
  <div>
    <h1>Thank you!</h1>
    <h3>Your order has been received</h3>
    <p><strong>Order Reference:</strong> {{orderRef}}</p>
    <p>
      Contact us by email at
      <a :href="'mailto:' + merchant.support_email">{{merchant.support_email}}</a>
    </p>
    <button>
      Back to Home
    </button>
  </div>
</template>

<script>
export default {
  name: 'Confirmation',
  props: ['orderRef', 'merchant'],
};
</script>
