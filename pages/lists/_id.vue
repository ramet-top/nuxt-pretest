<template>
  <v-layout>
    <v-flex class="text-center">
      <vuetify-logo class="my-5" />
      <div v-if="findUser">
        <v-card :loading="isUpdating">
          <template v-slot:progress>
            <v-progress-linear
              absolute
              color="green lighten-3"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-img
            height="200"
            src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"
          >
            <v-row class="mt-15" align="center" justify="center">
              <v-col class="text-center">
                <h3 class="grey--text text--lighten-1">{{ name }}</h3>
                <span class="grey--text text--lighten-1">{{ title }}</span>
              </v-col>
            </v-row>
          </v-img>

          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="findUser.email"
                    disabled
                    filled
                    rounded
                    label="อีเมล์"
                  ></v-text-field> </v-col
              ></v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    :value="findUser.first_name"
                    disabled
                    filled
                    label="ชื่อ"
                    rounded
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :value="findUser.last_name"
                    disabled
                    filled
                    rounded
                    label="นามสกุล"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    :value="findUser.sex == 'M' ? 'ชาย' : 'หญิง'"
                    disabled
                    filled
                    rounded
                    label="เพศ"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    :value="findUser.age"
                    disabled
                    filled
                    rounded
                    label="อายุ"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="findUser.tel"
                    filled
                    rounded
                    disabled
                    label="เบอร์โทร"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="findUser.status.text"
                    disabled
                    filled
                    rounded
                    label="status"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-textarea
                    v-model="findUser.remark"
                    label="remark"
                    disabled
                    filled
                    rounded
                    hint="แสดงความเห็น"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn :loading="isUpdating" depressed to="/lists">
              <v-icon left>fas fa-chevron-circle-left</v-icon>Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              dark
              color="blue"
              :loading="isUpdating"
              depressed
              @click="parentEditItem(findUser)"
            >
              <v-icon left>far fa-edit</v-icon>Update
            </v-btn>

            <v-btn
              :loading="isUpdating"
              depressed
              dark
              color="red accent-4"
              @click="parentDeleteItem(findUser)"
            >
              <v-icon left>fas fa-trash</v-icon>Delete
            </v-btn>
          </v-card-actions>
        </v-card>

        <div>
          <DialogCreateUpdateUser
            ref="DialogCreateUpdateUser"
            :type_id="true"
          />
        </div>
      </div>

      <div v-else>
        Show Params
        <p class="red--text">{{ $route.params.id }}</p>
        Not match
        <br />
        <v-btn :loading="isUpdating" depressed to="/lists">
          <v-icon left>fas fa-chevron-circle-left</v-icon>Back
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import VuetifyLogo from '~/components/logo/VuetifyLogo.vue'
import DialogCreateUpdateUser from '~/components/lists/DialogCreateUpdateUser'

export default {
  middleware: ['isAuth'],

  components: {
    VuetifyLogo,
    DialogCreateUpdateUser
  },

  data() {
    return {
      isUpdating: false,
      name: 'รายละเอียดข้อมูลผู้ใช้งาน',
      title: 'The summer breeze'
    }
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    }
  },

  methods: {
    parentEditItem(value) {
      this.$refs.DialogCreateUpdateUser.editItem(value)
    },

    async parentDeleteItem(value) {
      await this.$refs.DialogCreateUpdateUser.deleteItem(value)
    }
  },

  computed: {
    desserts() {
      return this.$store.getters['items/desserts'] || []
    },

    findUser() {
      const id = this.$route.params.id
      return this.desserts.find(user => parseInt(user.id) === parseInt(id))
    }
  }
}
</script>
