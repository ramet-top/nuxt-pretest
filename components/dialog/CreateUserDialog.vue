<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
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

            props::{{ editedItem }}
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
</template>

<script>
import { uuid } from 'vue-uuid'

export default {
  data() {
    return {
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
    }
  },

  computed: {
    formTitle() {
      return this.$store.state.items.editedIndex === -1
        ? 'New Item'
        : 'Edit Item'
    },

    dialog: {
      get() {
        return this.$store.state.items.dialog
      },

      set(val) {
        return this.$store.commit('items/setDialog', val)
      }
    },

    desserts() {
      return this.$store.state.items.desserts || []
    }
  },

  // watch: {
  //   dialog(val) {
  //     val || this.close()
  //   }
  // },

  methods: {
    // editItem(item) {
    //   let valItem = this.$store.state.items.desserts.indexOf(item)
    //   this.$store.commit('items/setEditedIndex', valItem)
    //   this.editedItem = Object.assign({}, item)
    //   this.dialog = true
    // },
    // deleteItem(item) {
    //   this.$store.commit('items/deleteItem', item)
    // },
    // close() {
    //   this.dialog = false
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem)
    //     this.$store.commit('items/setEditedIndex', -1)
    //   })
    // },
    // save() {
    //   this.$store.commit('items/save', this.editedItem)
    //   this.close()
    // }
  }
}
</script>

<style lang="scss" scoped></style>
