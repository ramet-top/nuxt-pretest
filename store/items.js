import uuid from 'vue-uuid'

export const state = () => ({
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
    { text: 'การจัดการ', value: 'actions', sortable: false }
  ],
  editedIndex: -1,
  desserts: [
    {
      id: 1,
      first_name: 'Frozen',
      last_name: 'Yogurt',
      age: 20,
      sex: 'M',
      email: 'moc1@gmail.com',
      tel: '0990009090',
      status: { state: 'active', text: 'เปิดใช้งาน' },
      remark: ''
    },
    {
      id: 2,
      first_name: 'Ice cream',
      last_name: 'sandwich',
      age: 27,
      sex: 'F',
      email: 'moc2@gmail.com',
      tel: '0990009091',
      status: { state: 'active', text: 'เปิดใช้งาน' },
      remark: ''
    },
    {
      id: 3,
      first_name: 'Eclair',
      last_name: 'Eclairer',
      age: 26,
      sex: 'M',
      email: 'moc3@gmail.com',
      tel: '0990009092',
      status: { state: 'active', text: 'เปิดใช้งาน' },
      remark: ''
    },
    {
      id: 4,
      first_name: 'Cupcake',
      last_name: 'pi ',
      age: 30,
      sex: 'M',
      email: 'moc4@gmail.com',
      tel: '0990009094',
      status: { state: 'deactive', text: 'ปิดใช้งาน' },
      remark: ''
    },
    {
      id: 5,
      first_name: 'Gingerbread',
      last_name: 'sweet ',
      age: 56,
      sex: 'F',
      email: 'moc5@gmail.com',
      tel: '0990009093',
      status: { state: 'deactive', text: 'ปิดใช้งาน' },
      remark: ''
    }
  ]
})

export const mutations = {
  // data()
  setDialog(state, newStateDialog) {
    state.dialog = newStateDialog
  },

  setEditedIndex(state, newStateItem) {
    state.editedIndex = newStateItem
  },

  // methods

  deleteItem(state, newStateItem) {
    const index = state.desserts.indexOf(newStateItem)
    confirm(
      `คุณต้องการที่จะลบข้อมูลของ ${newStateItem.first_name} ใชหรือไม่ ?`
    ) && state.desserts.splice(index, 1)
  },

  save(state, newStateEditedItem) {
    if (state.editedIndex > -1) {
      // console.log('save if for update')
      Object.assign(state.desserts[state.editedIndex], newStateEditedItem)
    } else {
      // console.log('save else for create')
      // if (newStateEditedItem) {
      //   console.log('validata state else for create items')
      // }
      state.desserts.push(newStateEditedItem)
    }
  }
}
