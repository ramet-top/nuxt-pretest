<template>
  <v-layout>
    <v-flex class="text-center">
      <Logo />
      <vuetify-logo />

      <blockquote class="blockquote">
        &#8220;this is page normal.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>
<script>
import VuetifyLogo from '~/components/logo/VuetifyLogo.vue'
import Logo from '~/components/logo/Logo.vue'
export default {
  components: {
    VuetifyLogo,
    Logo
  }
}
</script>
