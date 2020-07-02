<template>
  <div>
    <!-- <h1>Default</h1>
    <TestProps @input="parentFc" :value="text" />
    <hr />
    <h1>V-Model test</h1>
    <TestProps v-model="text" />
    <v-btn @click="onClickBtn">ClickParent</v-btn>
    <br />
    <hr /> -->

    {{ testLodash }}

    <v-btn @click="findGtArray">find</v-btn>
  </div>
</template>

<script>
import _ from 'lodash'
import TestProps from '~/components/TestProps'

export default {
  components: {
    TestProps
  },

  data() {
    return {
      text: 'UU',
      testLodash: []
    }
  },

  methods: {
    parentFc(value) {
      // console.log('parentFc', value)
      this.text = value
    },

    onClickBtn() {
      this.text = 'Parent'
    },

    findGtArray() {
      var images = [
        { src: 'http://www.placehold.it/600x200', like: 10 },
        { src: 'http://www.placehold.it/600x200', like: 30 },
        { src: 'http://www.placehold.it/600x200', like: 40 }
      ]
      this.testLodash = _.filter(images, function(img) {
        return img.like > 20
      })
      // console.log('object')
    }
  }
}
</script>

<style lang="scss" scoped></style>
