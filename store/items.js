// import uuid from 'vue-uuid'

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
      email: '',
      tel: '0990009090',
      status: 'active',
      remark: ''
    },
    {
      id: 2,
      first_name: 'Ice cream',
      last_name: 'sandwich',
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
      age: 56,
      sex: 'F',
      email: '',
      tel: '',
      status: 'deactive',
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
      Object.assign(state.desserts[state.editedIndex], newStateEditedItem)

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
      state.desserts.push(newStateEditedItem)
    }
  }
}
