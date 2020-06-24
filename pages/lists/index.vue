<template>
  <v-layout>
    <v-flex>
      <div class="text-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
        <blockquote class="blockquote">
          <footer>
            <h1>รายชื่อลูกค้า</h1>
          </footer>
        </blockquote>
      </div>

      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="calories"
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
                  >New Item</v-btn
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
                          label="id"
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="ชื่อ-นามสกุล"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.calories"
                          label="อายุ"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.fat"
                          label="เพศ"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.carbs"
                          label="สถานะ"
                        ></v-text-field>
                      </v-col>

                      <!-- <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.protein"
                          label="Protein (g)"
                        ></v-text-field>
                      </v-col> -->
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

        <template v-slot:item.carbs="{ item }">
          <v-chip :color="getColor(item.carbs)" dark>{{ item.carbs }}</v-chip>
        </template>

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
        value: 'name'
      },
      { text: 'อายุ', value: 'calories' },
      { text: 'เพศ', value: 'fat' },
      { text: 'สถานะ', value: 'carbs' },
      // { text: 'Protein (g)', value: 'protein' },
      { text: 'การจัดการ', value: 'actions', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0
      // protein: 0
    },
    defaultItem: {
      id: '',
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0
      // protein: 0
    }
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
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          id: 2,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          id: 3,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          id: 4,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          id: 5,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        }
        // {
        //   id: 6,
        //   name: 'Jelly bean',
        //   calories: 375,
        //   fat: 0.0,
        //   carbs: 94,
        //   protein: 0.0
        // },
        // {
        //   id: 7,
        //   name: 'Lollipop',
        //   calories: 392,
        //   fat: 0.2,
        //   carbs: 98,
        //   protein: 0
        // },
        // {
        //   id: 8,
        //   name: 'Honeycomb',
        //   calories: 408,
        //   fat: 3.2,
        //   carbs: 87,
        //   protein: 6.5
        // },
        // {
        //   id: 9,
        //   name: 'Donut',
        //   calories: 452,
        //   fat: 25.0,
        //   carbs: 51,
        //   protein: 4.9
        // },
        // {
        //   id: 10,
        //   name: 'KitKat',
        //   calories: 518,
        //   fat: 26.0,
        //   carbs: 65,
        //   protein: 7
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
        text: `Are you sure you want to delete this item ${item.name}?`,
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
      if (status > 400) return 'red'
      else if (status > 200) return 'orange'
      else return 'green'
    }
  }
}
</script>
