<template>
  <v-layout>
    <v-flex>
      <div class="text-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />

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
                  <v-container>
                    <v-row>
                      <!-- <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.id"
                          label="id"
                          disabled
                        ></v-text-field>
                      </v-col> -->
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
                        <!-- <v-text-field
                          v-model="editedItem.sex"
                          label="เพศ"
                        ></v-text-field> -->
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
                        <!-- showstate: {{ editedItem.status.state }} -->
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
  </v-layout>
</template>
<script>
export default {
  middleware: 'isAuth',

  head() {
    return {
      title: 'รายการ'
    }
  },

  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'ชื่อ-นามสกุล',
        align: 'start',
        sortable: false,
        value: 'first_name'
      },
      { text: 'อายุ', value: 'age' },
      { text: 'เพศ', value: 'sex' },
      { text: 'สถานะ', value: 'status' },
      // { text: 'remark (g)', value: 'remark' },
      { text: 'การจัดการ', value: 'actions', sortable: false }
    ],

    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      first_name: '',
      last_name: '',
      name: '',
      age: 0,
      sex: 'M',
      email: '',
      tel: '',
      status: 'deactive',
      remark: ''
    },

    defaultItem: {
      id: '',
      first_name: '',
      last_name: '',
      name: '',
      age: 0,
      sex: 'M',
      email: '',
      tel: '',
      status: 'deactive',
      remark: ''
    },

    // select: { status: 'active' },
    items: [
      { state: 'active', text: 'เปิดใช้งาน' },
      { state: 'deactive', text: 'ปิดใช้งาน' }
    ],

    valRadio: 'M'
  }),

  computed: {
    user() {
      return this.$store.getters['auth/loggedInUser']
    },

    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          id: 1,
          first_name: 'Frozen',
          last_name: 'Yogurt',
          name: 'Frozen Yogurt',
          age: 20,
          sex: 'M',
          email: '',
          tel: '0990009090',
          status: 'active',
          remark: ''
        },
        {
          id: 2,
          first_name: 'Ice cream',
          last_name: 'sandwich',
          name: 'Ice cream sandwich',
          age: 27,
          sex: 'F',
          email: '',
          tel: '',
          status: 'active',
          remark: ''
        },
        {
          id: 3,
          first_name: 'Eclair',
          last_name: 'Eclairer',
          name: 'Eclair',
          age: 26,
          sex: 'M',
          email: '',
          tel: '',
          status: 'active',
          remark: ''
        },
        {
          id: 4,
          first_name: 'Cupcake',
          last_name: 'pi ',
          name: 'Cupcake',
          age: 30,
          sex: 'M',
          email: '',
          tel: '',
          status: 'deactive',
          remark: ''
        },
        {
          id: 5,
          first_name: 'Gingerbread',
          last_name: 'sweet ',
          name: 'Gingerbread',
          age: 56,
          sex: 'F',
          email: '',
          tel: '',
          status: 'deactive',
          remark: ''
        }
        // {
        //   id: 6,
        //   name: 'Jelly bean',
        //   age: 375,
        //   sex: 0.0,
        //   status: 94,
        //   remark: 0.0
        // },
        // {
        //   id: 7,
        //   name: 'Lollipop',
        //   age: 392,
        //   sex: 0.2,
        //   status: 98,
        //   remark: 0
        // },
        // {
        //   id: 8,
        //   name: 'Honeycomb',
        //   age: 408,
        //   sex: 3.2,
        //   status: 87,
        //   remark: 6.5
        // },
        // {
        //   id: 9,
        //   name: 'Donut',
        //   age: 452,
        //   sex: 25.0,
        //   status: 51,
        //   remark: 4.9
        // },
        // {
        //   id: 10,
        //   name: 'KitKat',
        //   age: 518,
        //   sex: 26.0,
        //   status: 65,
        //   remark: 7
        // }
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      // confirm('Are you sure you want to delete this item?') &&
      //   this.desserts.splice(index, 1)

      Swal.fire({
        title: 'Are you sure?',
        text: `คุณต้องการที่จะลบข้อมูลของ ${item.name} ใชหรือไม่ ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          this.desserts.splice(index, 1)
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        }
      })
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)

        let timerInterval
        Swal.fire({
          title: 'Updated!',
          html: 'I will close in <b></b> milliseconds.',
          timer: 1000,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              const content = Swal.getContent()
              if (content) {
                const b = content.querySelector('b')
                if (b) {
                  b.textContent = Swal.getTimerLeft()
                }
              }
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then(result => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },

    getColor(status) {
      if (status == 'active') return 'green'
      else return 'red'
    }
  }
}
</script>
