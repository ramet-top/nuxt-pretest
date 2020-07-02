<template>
  <v-layout>
    <v-flex class="text-center">
      <vuetify-logo />
      <div v-if="filteredDesserts['0']">
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
                <v-col cols="12" md="6">
                  <v-text-field
                    :value="filteredDesserts['0'].first_name"
                    disabled
                    filled
                    label="ชื่อ"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    :value="filteredDesserts['0'].last_name"
                    disabled
                    filled
                    label="นามสกุล"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    :value="filteredDesserts['0'].age"
                    disabled
                    filled
                    label="อายุ"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    :value="filteredDesserts['0'].sex == 'M' ? 'ชาย' : 'หญิง'"
                    disabled
                    filled
                    label="เพศ"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="filteredDesserts['0'].email"
                    disabled
                    filled
                    label="อีเมล์"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="filteredDesserts['0'].tel"
                    filled
                    disabled
                    label="เบอร์โทร"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="filteredDesserts['0'].status.text"
                    disabled
                    filled
                    label="status"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-textarea
                    v-model="filteredDesserts['0'].remark"
                    label="remark"
                    disabled
                    hint="แสดงความเห็น"
                  ></v-textarea>
                </v-col>
                <v-col></v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              :loading="isUpdating"
              depressed
              @click="$router.push('/lists')"
            >
              <v-icon left>fas fa-chevron-circle-left</v-icon>Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="blue"
              :loading="isUpdating"
              depressed
              @click="parentEditItem(filteredDesserts['0'])"
            >
              <v-icon left>far fa-edit</v-icon>Update
            </v-btn>

            <v-btn
              :loading="isUpdating"
              depressed
              color="red accent-4"
              @click="parentDeleteItem(filteredDesserts['0'])"
            >
              <v-icon left>fas fa-trash</v-icon>Delete
            </v-btn>
          </v-card-actions>
        </v-card>

        <div>
          <AppCreateAndUpDateUser
            ref="AppCreateAndUpDateUser"
            :type_id="true"
          />
        </div>
      </div>

      <div v-else>
        Show Params
        <p class="red--text">{{ $route.params.id }}</p>
        Not match
        <br />
        <v-btn :loading="isUpdating" depressed @click="$router.push('/lists')">
          <v-icon left>fas fa-chevron-circle-left</v-icon>Back
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import _ from 'lodash'

import VuetifyLogo from '~/components/logo/VuetifyLogo.vue'
import AppCreateAndUpDateUser from '~/components/lists/AppCreateAndUpdateUserDialog'

export default {
  middleware: ['isAuth'],

  components: {
    VuetifyLogo,
    AppCreateAndUpDateUser
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
      this.$refs.AppCreateAndUpDateUser.editItem(value)
    },

    parentDeleteItem(value) {
      this.$router.replace('/lists')
      this.$refs.AppCreateAndUpDateUser.deleteItem(value)
    }
  },

  computed: {
    desserts() {
      return this.$store.getters['items/desserts'] || []
    },

    filteredDesserts() {
      let id = this.$route.params.id
      return _.filter(this.desserts, function(des) {
        return des.id == parseInt(id)
      })
    }
  }
}
</script>
