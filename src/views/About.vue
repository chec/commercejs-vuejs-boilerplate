<template>
    <div class="about container">
        <div class="row">
            <div class="col-md-12 text-center">
                <h1>About Us</h1>
                <h3>Lorem ipsum dolor sit.</h3>
                <br>
                <p>{{merchant.business_description}}</p>
                <!-- eslint-disable-next-line max-len -->
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae repellendus possimus nam earum quaerat nemo, quasi molestias aliquid totam at quia odio consequuntur eos, dolor ratione harum aut enim. Perferendis fuga maxime totam error, iste officiis nisi alias incidunt impedit. Eveniet dolor consectetur, eos obcaecati provident voluptate laborum quis eum. Molestias molestiae deserunt at eaque ad doloremque maiores modi. Culpa voluptatibus voluptatum incidunt eaque reiciendis facere, quisquam tenetur dolore, rerum reprehenderit labore necessitatibus iusto, nihil animi consequatur at asperiores quis aliquid maiores. Maiores, harum quibusdam repellendus et velit consequuntur quasi natus sunt. Nam quae cum, omnis natus dolores molestias debitis fugit officiis, at ullam hic nihil sint similique reiciendis! Aut porro quis molestias, quidem ipsam nisi. Dignissimos obcaecati cum placeat ut expedita nemo excepturi hic, inventore iure ipsam, molestias voluptatum quam, vitae recusandae. Rerum consequuntur commodi cupiditate blanditiis ratione ipsam odio ipsa repellat minima obcaecati asperiores, corporis adipisci, corrupti recusandae at facilis distinctio est quasi deleniti maiores. Unde obcaecati molestias nostrum officiis facilis accusantium doloremque sed quia iusto, rerum eum voluptatum quae, consequatur maiores fugit excepturi vitae quaerat blanditiis id sapiente! Ullam delectus ipsam illum omnis iusto, modi maiores ipsa nihil aperiam dolor dolorem natus eligendi optio mollitia est voluptatem nobis! Consectetur obcaecati reiciendis impedit quaerat ullam ex molestiae voluptas deleniti consequuntur! Minus voluptas exercitationem, repellendus quos numquam quidem magnam libero repellat qui, temporibus, aperiam est culpa expedita officiis odit aliquid sequi! Praesentium ex perferendis veniam et id unde tempora minus, animi reiciendis commodi, consequatur expedita amet nisi possimus, provident officiis perspiciatis, soluta quae sapiente placeat. Magni dolorum incidunt illum reiciendis, repellat modi maxime saepe quae quo iste et quis voluptates, eos voluptas similique enim. Impedit dolor, accusantium. Incidunt facere, perferendis praesentium, perspiciatis repudiandae magni doloribus dignissimos ipsam velit porro inventore molestiae, vel quam aliquid libero corrupti, iusto laudantium numquam!</p>
                <br>
                <!-- eslint-disable-next-line max-len -->
                <p>Contact us by email at <a :href="'mailto:' + merchant.support_email">{{merchant.support_email}}</a></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'About',
  props: ['merchant'],
};
</script>
