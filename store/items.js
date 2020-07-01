export const state = () => ({
  dialog: false,
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
  SET_DIALOG(state, newDialogState) {
    state.dialog = newDialogState
  },

  SET_EDITED_INDEX(state, newStateItem) {
    state.editedIndex = newStateItem
  },

  SET_DELETE_ITEM(state, newStateItem) {
    const index = state.desserts.indexOf(newStateItem)
    confirm(
      `คุณต้องการที่จะลบข้อมูลของ ${newStateItem.first_name} ใชหรือไม่ ?`
    ) && state.desserts.splice(index, 1)
  },

  SET_SAVE(state, newStateEditedItem) {
    if (state.editedIndex > -1) {
      Object.assign(state.desserts[state.editedIndex], newStateEditedItem)
    } else {
      state.desserts.push(newStateEditedItem)
    }
  }
}

export const actions = {
  setDialog({ commit }, newDialogState) {
    commit('SET_DIALOG', newDialogState)
  },
  setEditedIndex({ commit }, newStateItem) {
    commit('SET_EDITED_INDEX', newStateItem)
  },
  setDeleteItem({ commit }, newStateItem) {
    commit('SET_DELETE_ITEM', newStateItem)
  },
  setSave({ commit }, newStateEditedItem) {
    commit('SET_SAVE', newStateEditedItem)
  }
}

export const getters = {
  dialog: state => {
    return state.dialog
  },
  drawer: state => {
    return state.drawer
  },
  editedIndex: state => {
    return state.editedIndex
  },
  desserts: state => {
    return state.desserts
  }
}
