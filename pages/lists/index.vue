<template>
  <v-layout>
    <clientOnly>
      <v-flex>
        <div class="text-center">
          <vuetify-logo />
          <h1>รายชื่อลูกค้า</h1>
        </div>
        <v-data-table
          :headers="headers"
          :items="desserts"
          sort-by="age"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>CRUD Users</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <AppCreateAndUpDateUser ref="AppCreateAndUpDateUser" />
            </v-toolbar>
          </template>

          <template v-slot:item.first_name="{ item }">
            <nuxt-link
              :to="{
                name: 'lists-id',
                params: { id: item.id || '' }
              }"
              tag="a"
              class="black--text text-decoration-none"
              >{{ item.first_name }} {{ item.last_name }}</nuxt-link
            >
          </template>

          <template v-slot:item.sex="{ item }">{{
            item.sex == 'M' ? 'ชาย' : 'หญิง'
          }}</template>

          <template v-slot:item.status="{ item }">
            <v-chip :color="getColor(item.status)" dark>{{
              item.status.state == 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'
            }}</v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="parentEditItem(item)"
              >fas fa-pencil-alt</v-icon
            >
            <v-icon small @click="parentDeleteItem(item)">fas fa-trash</v-icon>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="$router.go('.')">Reset</v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </clientOnly>
  </v-layout>
</template>
<script>
import VuetifyLogo from '~/components/logo/VuetifyLogo.vue'
import AppCreateAndUpDateUser from '~/components/lists/AppCreateAndUpdateUserDialog'

export default {
  middleware: 'isAuth',

  components: {
    VuetifyLogo,
    AppCreateAndUpDateUser
  },

  head() {
    return {
      title: 'รายการ'
    }
  },

  data: () => ({}),

  computed: {
    user() {
      return this.$store.getters['auth/loggedInUser']
    },

    headers() {
      return [
        {
          text: 'ชื่อ-นามสกุล',
          align: 'start',
          sortable: false,
          value: 'first_name'
        },
        { text: 'อายุ', value: 'age' },
        { text: 'เพศ', value: 'sex' },
        { text: 'สถานะ', value: 'status' },
        { text: 'การจัดการ', value: 'actions', sortable: false }
      ]
    },

    desserts() {
      return this.$store.getters['items/desserts'] || []
    },

    dialog: {
      get() {
        return this.$store.getters['items/dialog']
      },
      set(val) {
        return this.$store.dispatch('items/setDialog', val)
      }
    }
  },

  methods: {
    getColor(status) {
      if (status.state == 'active') return 'green'
      else return 'red'
    },

    parentEditItem(value) {
      this.$refs.AppCreateAndUpDateUser.editItem(value)
    },

    parentDeleteItem(value) {
      this.$refs.AppCreateAndUpDateUser.deleteItem(value)
    }
  }
}
</script>
