<template>
  <v-layout>
    <v-flex class="text-center">
      <vuetify-logo />

      <div v-if="filteredList['0']">
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
                    :value="filteredList['0'].sex == 'M' ? 'ชาย' : 'หญิง'"
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
                    v-model="filteredList['0'].status.text"
                    disabled
                    filled
                    label="status"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-textarea
                    v-model="filteredList['0'].remark"
                    label="remark"
                    disabled
                    hint="แสดงความเห็น"
                  ></v-textarea>
                </v-col>
                <v-col> </v-col>
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
              <v-icon left>fas fa-chevron-circle-left</v-icon>
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="blue"
              :loading="isUpdating"
              depressed
              @click="editItem(filteredList['0'])"
            >
              <v-icon left>far fa-edit</v-icon>
              Update
            </v-btn>

            <v-btn
              :loading="isUpdating"
              depressed
              color="red accent-4"
              @click="deleteItem(filteredList['0'])"
            >
              <v-icon left>fas fa-trash</v-icon>
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>

        <div>
          <v-dialog v-model="dialog" max-width="500px">
            <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
              >เพิ่มข้อมูล</v-btn
            >
          </template> -->
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.id"
                        label="Test-uuid"
                        disabled
                      ></v-text-field>
                    </v-col> -->
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.first_name"
                        label="ชื่อ *"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.last_name"
                        label="นามสกุล *"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.age"
                        label="อายุ *"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <p>เพศ *</p>
                      <v-radio-group v-model="editedItem.sex" row>
                        <v-radio labe l="ชาย" value="M"></v-radio>
                        <v-radio label="หญิง" value="F"></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="email *"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.tel"
                        label="เบอร์โทร *"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.status"
                        :items="items"
                        item-text="text"
                        item-value="state"
                        persistent-hint
                        return-object
                        label="สถานะ *"
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        :value="editedItem.remark"
                        label="remark"
                        hint="แสดงความเห็น"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>

      <div v-else>
        Show Params
        <p class="red--text">{{ $route.params.id }}</p>
        Not match
        <br />
        <v-btn :loading="isUpdating" depressed @click="$router.push('/lists')">
          <v-icon left>fas fa-chevron-circle-left</v-icon>
          Back
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import VuetifyLogo from '~/components/logo/VuetifyLogo.vue'
// import CreateUserDialog from '~/components/dialog/CreateUserDialog.vue'
import DialogGlobalFunction from '~/mixins/dialog-global-functoin'

export default {
  middleware: ['isAuth'],
  mixins: [DialogGlobalFunction],
  components: {
    VuetifyLogo
    // CreateUserDialog
  },

  data() {
    return {
      autoUpdate: true,
      friends: ['Sandra Adams', 'Britta Holt'],
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
    remove(item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    },

    async deleteItem(item) {
      await this.$router.replace('/lists')
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
    }
  }
}
</script>
