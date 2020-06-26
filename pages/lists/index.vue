<template>
  <v-layout>
    <clientOnly>
      <v-flex>
        <div class="text-center">
          <vuetify-logo />
          <h1>รายชื่อลูกค้า</h1>
          <!-- uuid test:: {{ defaultItem.id }} -->
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

              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >เพิ่มข้อมูล</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.id"
                            label="Test-uuid"
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.first_name"
                            label="ชื่อ"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.last_name"
                            label="นามสกุล"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.age"
                            label="อายุ"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <p>เพศ</p>
                          <v-radio-group v-model="editedItem.sex" row>
                            <v-radio label="ชาย" value="M"></v-radio>
                            <v-radio label="หญิง" value="F"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.email"
                            label="email"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.tel"
                            label="เบอร์โทร"
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
                            label="สถานะ"
                          ></v-select>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12">
                          <v-textarea
                            v-model="editedItem.remark"
                            label="remark"
                            hint="แสดงความเห็น"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- <CreateUserDialog /> -->
              <!-- <CreateUserDialog :editedItem="item" /> -->
            </v-toolbar>
          </template>

          <!-- firstname and lastname -->
          <template v-slot:item.first_name="{ item }">
            <nuxt-link
              :to="{
                name: 'lists-id',
                params: { id: item.id }
              }"
              tag="a"
              class="black--text text-decoration-none"
            >
              {{ item.first_name }} {{ item.last_name }}
            </nuxt-link>
          </template>

          <!-- redios sex -->
          <template v-slot:item.sex="{ item }">
            {{ item.sex == 'M' ? 'ชาย' : 'หญิง' }}
          </template>

          <!-- status color-->
          <template v-slot:item.status="{ item }">
            <div v-if="item.status == 'active' || item.status == 'deactive'">
              <v-chip :color="getColor(item.status)" dark>
                {{ item.status == 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}
              </v-chip>
            </div>
            <div v-else>
              <v-chip :color="getColor(item.status.state)" dark>
                {{ item.status.state == 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}
              </v-chip>
            </div>
          </template>

          <!-- action -->
          <template v-slot:item.actions="{ item }">
            <!-- <v-icon small class="mr-2" @click="editItem(item)">
              fas fa-pencil-alt
            </v-icon> -->
            <v-icon small class="mr-2" @click="editItem(item)">
              fas fa-pencil-alt
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              fas fa-trash
            </v-icon>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </clientOnly>
  </v-layout>
</template>
<script>
import VuetifyLogo from '~/components/logo/VuetifyLogo.vue'
import CreateUserDialog from '~/components/dialog/CreateUserDialog.vue'
import { uuid } from 'vue-uuid'

export default {
  middleware: 'isAuth',

  components: {
    VuetifyLogo,
    CreateUserDialog
  },

  head() {
    return {
      title: 'รายการ'
    }
  },

  data: () => ({
    editedItem: {
      id: '',
      first_name: '',
      last_name: '',
      age: 0,
      sex: 'M',
      email: '',
      tel: '',
      status: 'deactive',
      remark: ''
    },

    defaultItem: {
      id: uuid.v4(),
      first_name: '',
      last_name: '',
      age: 0,
      sex: 'M',
      email: '',
      tel: '',
      status: 'deactive',
      remark: ''
    },

    items: [
      { state: 'active', text: 'เปิดใช้งาน' },
      { state: 'deactive', text: 'ปิดใช้งาน' }
    ]
  }),

  computed: {
    user() {
      return this.$store.getters['auth/loggedInUser']
    },

    formTitle() {
      return this.$store.state.items.editedIndex === -1
        ? 'New Item'
        : 'Edit Item'
    },

    headers() {
      return this.$store.state.items.headers
    },

    desserts() {
      return this.$store.state.items.desserts || []
    },

    dialog: {
      get() {
        return this.$store.state.items.dialog
      },

      set(val) {
        return this.$store.commit('items/setDialog', val)
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  methods: {
    editItem(item) {
      let valItem = this.$store.state.items.desserts.indexOf(item)
      this.$store.commit('items/setEditedIndex', valItem)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.$store.commit('items/deleteItem', item)
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.$store.commit('items/setEditedIndex', -1)
      })
    },

    save() {
      this.$store.commit('items/save', this.editedItem)
      this.close()
    },

    getColor(status) {
      if (status == 'active') return 'green'
      else return 'red'
    }
  }
}
</script>
