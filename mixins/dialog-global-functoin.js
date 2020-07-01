import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return {
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

      valid: false,

      requireRules: [v => !!v || 'กรุณากรอกข้อมูล!'],
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
