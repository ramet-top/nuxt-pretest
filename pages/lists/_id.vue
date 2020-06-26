<template>
  <v-layout>
    <v-flex class="text-center">
      <div class="text-center">
        <vuetify-logo />
      </div>

      <!-- <h3>รายละเอียดเพิ่มเติม</h3> -->
      <!-- <h3>{{ $route.params.id }}</h3> -->
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
          <v-row>
            <v-col class="text-right" cols="12">
              <v-menu bottom left transition="slide-y-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="isUpdating = true">
                    <v-list-item-action>
                      <v-icon>mdi-settings</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Update</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
            <v-row class="pa-4" align="center" justify="center">
              <v-col class="text-center">
                <h3 class="grey--text text--lighten-1">{{ name }}</h3>
                <span class="grey--text text--lighten-1">{{ title }}</span>
              </v-col>
            </v-row>
          </v-row>
        </v-img>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  :value="filteredList['0'].first_name"
                  disabled
                  filled
                  label="ชื่อ"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  :value="filteredList['0'].last_name"
                  disabled
                  filled
                  label="นามสกุล"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  :value="filteredList['0'].age"
                  disabled
                  filled
                  label="อายุ"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  :value="filteredList['0'].sex"
                  disabled
                  filled
                  label="เพศ"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="filteredList['0'].email"
                  disabled
                  filled
                  label="อีเมล์"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="filteredList['0'].tel"
                  filled
                  disabled
                  label="เบอร์โทร"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="filteredList['0'].status"
                  disabled
                  filled
                  label="status"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-textarea
                  :value="filteredList['0'].remark"
                  label="remark"
                  disabled
                  hint="แสดงความเห็น"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <!-- <v-switch
            v-model="autoUpdate"
            disabled
            class="mt-0"
            color="green lighten-2"
            hide-details
            label="Auto Update"
          ></v-switch> -->
          <v-btn
            :loading="isUpdating"
            depressed
            @click="$router.push('/lists')"
          >
            <v-icon left>fas fa-chevron-circle-left</v-icon>
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="autoUpdate"
            :loading="isUpdating"
            depressed
            @click="isUpdating = true"
          >
            <v-icon left>far fa-edit</v-icon>
            Update Now::
            {{ filteredList['0'].status }}
          </v-btn>
          <!-- <CreateUserDialog :editedItem="filteredList" /> -->

          <v-btn
            :loading="isUpdating"
            color="red"
            depressed
            @click="deleteItem(filteredList['0'])"
          >
            <v-icon left>fas fa-trash</v-icon>
            Delete Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import VuetifyLogo from '~/components/logo/VuetifyLogo.vue'
import CreateUserDialog from '~/components/dialog/CreateUserDialog.vue'

export default {
  middleware: ['isAuth'],
  components: {
    VuetifyLogo,
    CreateUserDialog
  },

  data() {
    return {
      autoUpdate: true,
      friends: ['Sandra Adams', 'Britta Holt'],
      isUpdating: false,
      name: 'รายละเอียดข้อมูลผู้ใช้งาน',
      title: 'The summer breeze',

      items: [
        { state: 'active', text: 'เปิดใช้งาน' },
        { state: 'deactive', text: 'ปิดใช้งาน' }
      ]
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
    remove(item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    },

    async deleteItem(item) {
      await this.$router.push('/')
      this.$store.commit('items/deleteItem', item)
    }
  },

  computed: {
    filteredList: {
      get() {
        return this.desserts.filter(des => {
          return des.id == this.$route.params.id
        })
      }
    },

    desserts() {
      return this.$store.state.items.desserts || []
    }
  }
}
</script>
