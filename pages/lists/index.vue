<template>
  <v-layout>
    <v-flex class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <h1>{{ user ? user.name : '' }}</h1>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
  <!-- <div>dd</div> -->
</template>
<script>
export default {
  middleware: 'isAuth',
  head() {
    return {
      title: 'รายการ'
    }
  },
  data() {
    return {}
  },

  computed: {
    user() {
      return this.$store.getters['auth/loggedInUser']
    }
  }
}
</script>
