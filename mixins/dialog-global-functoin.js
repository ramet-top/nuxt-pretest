// import { uuid } from 'vue-uuid'
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
        status: { state: 'active', text: 'เปิดใช้งาน' },
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
      ]
    }
  },

  mounted() {
    console.log('Log data Mixins: ', this.testLog)
  },

  computed: {
    formTitle() {
      return this.$store.state.items.editedIndex === -1
        ? 'New Item'
        : 'Edit Item'
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
    }
  }
}
