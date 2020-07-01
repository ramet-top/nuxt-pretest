<template>
  <div>
    <h1>Default</h1>
    <TestProps @input="parentFc" :value="text" />

    <h1>V-Model test</h1>
    <TestProps v-model="text" />

    <v-btn @click="onClickBtn">ClickParent</v-btn>
  </div>
</template>

<script>
import TestProps from '~/components/TestProps'
export default {
  components: {
    TestProps
  },

  data() {
    return {
      text: 'UU'
    }
  },

  methods: {
    parentFc(value) {
      // console.log('parentFc', value)
      this.text = value
    },

    onClickBtn() {
      this.text = 'Parent'
    }
  }
}
</script>

<style lang="scss" scoped></style>
