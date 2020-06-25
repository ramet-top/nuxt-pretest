<template>
  <v-layout>
    <v-flex class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />

      <h3>รายละเอียดเพิ่มเติม</h3>
      <h3>{{ $route.params.id }}</h3>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  middleware: ['isAuth']
}
</script>
