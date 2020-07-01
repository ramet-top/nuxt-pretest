<template>
  <div>
    data: {{ value }}
    <v-btn @click="onClickBtn">ClickChild</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: 'OK'
    }
  },

  watch: {
    value(newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  },

  methods: {
    onClickBtn() {
      this.$emit('input', 'child')
    }
  }
}
</script>

<style lang="scss" scoped></style>
