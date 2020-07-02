<template>
  <div>
    <v-dialog v-model="dialog" max-width="50%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="!type_id"
          color="primary"
          dark
          class="mb-2"
          v-bind="attrs"
          v-on="on"
          rounded
        >
          <v-icon left>fas fa-plus</v-icon>
          เพิ่มข้อมูล
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <v-icon left v-if="formTitle == 'Edit Item'">fas fa-edit</v-icon>
          <v-icon left v-else>fas fa-plus</v-icon>
          <span class="headline">
            {{
              formTitle == 'Edit Item' ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'
            }}
          </span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    v-model="editedItem.email"
                    label="email *"
                    :rules="emailRules"
                    prepend-icon="fas fa-envelope"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="editedItem.first_name"
                    label="ชื่อ *"
                    :rules="requireRules"
                    outlined
                    dense
                    prepend-icon="fas fa-user-shield"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="editedItem.last_name"
                    label="นามสกุล *"
                    :rules="requireRules"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-radio-group class="ml-3" v-model="editedItem.sex" row>
                    <div class="mr-3">
                      <v-icon left>fas fa-venus-mars</v-icon> เพศ *
                      <v-divider class="mx-4" vertical></v-divider>
                    </div>

                    <v-radio label="ชาย" value="M"></v-radio>
                    <v-radio label="หญิง" value="F"></v-radio>
                  </v-radio-group>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="editedItem.age"
                    label="อายุ *"
                    :rules="ageRules"
                    required
                    outlined
                    prepend-icon="fas fa-user-tag"
                    dense
                  ></v-text-field>

                  <v-slider v-model="editedItem.age" thumb-label></v-slider>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="editedItem.tel"
                    label="เบอร์โทร *"
                    :rules="telRules"
                    outlined
                    dense
                    required
                    prepend-icon="fas fa-phone"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-select
                    v-model="editedItem.status"
                    :items="items"
                    item-text="text"
                    item-value="state"
                    persistent-hint
                    prepend-icon="fas fa-shield-alt"
                    return-object
                    dense
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
                    rows="4"
                    prepend-icon="fas fa-comment"
                    outlined
                    dense
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" dark @click="save"
            ><v-icon left>far fa-save</v-icon> Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="text-center">
      <v-dialog v-model="DialogWarnningValid" width="500">
        <v-card>
          <v-alert type="warning">
            I'm a warning alert.
          </v-alert>
          <v-card-text>
            กรุณาเพิ่มข้อมูลให้ครบ!
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="DialogWarnningValid = false">
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDelete" persistent max-width="500">
        <v-card>
          <v-alert type="error">
            <strong>คุณแน่ใจหรือไม่ที่จะลบ?</strong>
          </v-alert>

          <v-card-text>
            คุณต้องการที่จะลบข้อมูลของ
            {{ itemDel ? itemDel.first_name : 'No data' }} ใช่หรือไม่
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogDelete = false"
              >close</v-btn
            >
            <v-btn
              color="green darken-1"
              text
              @click="confirmDeleteItem(itemDel)"
              >Yes</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  props: {
    type_id: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      DialogWarnningValid: false,
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
        v => !!v || 'กรุณากรอกข้อมูล E-mail ',
        v => /.+@.+/.test(v) || 'E-mail example@mail.com'
      ],
      ageRules: [
        v => v !== 0 || 'กรุณากรอกข้อมูล อายุ!',
        v => !!v || 'กรุณากรอกข้อมูล อายุ!',
        v => /^[0-9]+$/.test(v) || 'กรุณากรอกตัวเลขเท่านั้น'
      ],
      telRules: [
        v => !!v || 'กรุณากรอก เบอร์โทร!',
        v =>
          /^(([0-9]{10}))/.test(v) ||
          'กรุณากรอกข้อมูลที่เป็นตัวเลข 10 หลัก ex. 0898765432'
      ],

      itemDel: null
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
    },

    dialogDelete: {
      get() {
        return this.$store.getters['items/dialogDelete']
      },

      set(val) {
        return this.$store.dispatch('items/setDialogDelete', val)
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
      let valItem = this.desserts.indexOf(item)
      this.$store.dispatch('items/setEditedIndex', valItem)

      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.itemDel = item
      this.dialogDelete = true
    },

    confirmDeleteItem() {
      this.$store.dispatch('items/setDeleteItem', this.itemDel)
      this.dialogDelete = false
      this.$router.replace('/lists')
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.$store.dispatch('items/setEditedIndex', -1)
      })
      this.$refs.form.reset()
    },

    save() {
      try {
        if (this.formTitle == 'Edit Item') {
          if (this.$refs.form.validate()) {
            this.$store.dispatch('items/setSave', this.editedItem)
            this.close()
          } else {
            this.DialogWarnningValid = true
          }
        } else if (this.formTitle == 'New Item') {
          if (this.$refs.form.validate()) {
            this.$store.dispatch('items/setSave', this.editedItem)

            this.dialog = false
            this.editedItem = Object.assign({}, this.defaultItem)
            this.$store.dispatch('items/setEditedIndex', -1)
          } else {
            this.DialogWarnningValid = true
          }
        }
      } catch (error) {
        throw error
      }
    }
  }
}
</script>
