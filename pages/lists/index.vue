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
                    <v-form v-model="valid">
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.first_name"
                              label="ชื่อ *"
                              :rules="requireRules"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.last_name"
                              label="นามสกุล *"
                              :rules="requireRules"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.age"
                              label="อายุ *"
                              :rules="ageRules"
                              required
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
                              :rules="emailRules"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.tel"
                              label="เบอร์โทร *"
                              :rules="telRules"
                              required
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
                              v-model="editedItem.remark"
                              label="remark"
                              hint="แสดงความเห็น"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
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
            </v-toolbar>
          </template>

          <!-- firstname and lastname -->
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

          <!-- redios sex -->
          <template v-slot:item.sex="{ item }">{{
            item.sex == 'M' ? 'ชาย' : 'หญิง'
          }}</template>

          <!-- status color-->
          <template v-slot:item.status="{ item }">
            <v-chip :color="getColor(item.status)" dark>{{
              item.status.state == 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'
            }}</v-chip>
          </template>

          <!-- action -->
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"
              >fas fa-pencil-alt</v-icon
            >
            <v-icon small @click="deleteItem(item)">fas fa-trash</v-icon>
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
import DialogGlobalFunction from '~/mixins/dialog-global-functoin'

export default {
  middleware: 'isAuth',
  mixins: [DialogGlobalFunction],

  components: {
    VuetifyLogo
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
    }
  },

  methods: {
    getColor(status) {
      if (status.state == 'active') return 'green'
      else return 'red'
    }

    // initialize() {
    //   // console.log('init')
    // }
  }
}
</script>
