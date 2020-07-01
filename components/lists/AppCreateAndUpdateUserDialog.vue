<template>
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
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return {
      valid: false,
      requireRules: [v => !!v || 'กรุณากรอกข้อมูล!'],
      editedItem: {
        id: uuidv4(),
        first_name: '',
        last_name: '',
        age: 0,
        sex: 'M',
        email: '',
        tel: '',
        status: { state: 'deactive', text: 'ปิดใช้งาน' },
        remark: ''
      },

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      ageRules: [
        v => v !== 0 || 'age must be valid value 0',
        v => !!v || 'age is required',
        v => /^[0-9]+$/.test(v) || 'age must be valid number 0-9 only'
      ],
      telRules: [
        v => !!v || 'tel is required',
        v =>
          /^(([0-9]{10}))/.test(v) ||
          'tel must be valid number 0-9 and 10 lenght only'
      ]
    }
  },

  computed: {
    formTitle() {
      return this.$store.getters['items/editedIndex'] === -1
        ? 'New Item'
        : 'Edit Item'
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
    },

    defaultItem() {
      return {
        id: '',
        first_name: '',
        last_name: '',
        age: 0,
        sex: 'M',
        email: '',
        tel: '',
        status: { state: 'deactive', text: 'ปิดใช้งาน' },
        remark: ''
      }
    },

    items() {
      return [
        { state: 'active', text: 'เปิดใช้งาน' },
        { state: 'deactive', text: 'ปิดใช้งาน' }
      ]
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  methods: {
    editItem(item) {
      let valItem = this.desserts.indexOf(item)
      this.$store.dispatch('items/setEditedIndex', valItem)

      this.editedItem = Object.assign({}, item)
      this.dialog = true
      console.log('editItem in child')
    },

    passEmit() {
      // this.$emit('input', this.editItem())
    },

    deleteItem(item) {
      this.$store.dispatch('items/setDeleteItem', item)
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.$store.dispatch('items/setEditedIndex', -1)
      })
    },

    save() {
      if (this.formTitle == 'Edit Item') {
        this.$store.dispatch('items/setSave', this.editedItem)
        this.close()
      }

      if (this.formTitle == 'New Item') {
        if (this.valid) {
          this.$store.dispatch('items/setSave', this.editedItem)
          this.close()
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณาเพิ่มข้อมูลให้ครบ!',
            footer: '<a href>Why do I have this issue?</a>'
          })
        }
      }
    }
  }
}
</script>
