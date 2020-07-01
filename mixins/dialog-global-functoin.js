import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return {
      testLog: true,

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

      defaultItem: {
        id: '',
        first_name: '',
        last_name: '',
        age: 0,
        sex: 'M',
        email: '',
        tel: '',
        status: { state: 'deactive', text: 'ปิดใช้งาน' },
        remark: ''
      },

      items: [
        { state: 'active', text: 'เปิดใช้งาน' },
        { state: 'deactive', text: 'ปิดใช้งาน' }
      ],

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

  mounted() {
    console.log('Log data Mixins: ', this.testLog)
  },

  computed: {
    formTitle() {
      return this.$store.state.items.editedIndex === -1 ? 'NewItem' : 'EditItem'
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
      if (this.formTitle == 'EditItem') {
        this.$store.commit('items/save', this.editedItem)
        this.close()
      }

      if (this.formTitle == 'NewItem') {
        if (this.valid) {
          this.$store.commit('items/save', this.editedItem)
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
