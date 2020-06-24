<template>
  <!-- <v-layout column justify-center align-center> </v-layout> -->
  <clientOnly>
    <div class="mt-5">
      <v-flex class="text-center mb-5">
        <!-- <img src="/v.png" alt="Vuetify.js" class="mb-5" /> -->
        <Logo />
      </v-flex>

      <v-card class="mx-auto" max-width="800" raised>
        <div class="container mb-5 px-5">
          <h3 class="text-center">
            <h1>กรุณากรอกข้อมูล</h1>
            <Notification :message="error" v-if="error" />
          </h3>

          <v-form @submit.prevent.stop="login">
            <v-card-text>
              <v-text-field
                label="ชื่อเล่น"
                prepend-icon="fas fa-user-lock"
                v-model.trim="credentials.identifier"
                type="text"
                :rules="[rules.required, rules.min]"
                autofocus
                requireed
              ></v-text-field>

              <div class="text-center">
                <v-row>
                  <v-col col="12">
                    <v-btn
                      type="submit"
                      @keyup.enter="submit"
                      rounded
                      block
                      color="primary"
                      large
                    >
                      <v-icon left>fas fa-sign-in-alt</v-icon>ตกลง
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>

            <!-- <div v-if="submitting" class="text-center">
              <v-progress-circular
                :size="30"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div> -->
          </v-form>
        </div>
      </v-card>
    </div>
  </clientOnly>
</template>

<script>
import Notification from '~/components/Notification'
import Logo from '~/components/Logo.vue'
export default {
  layout: 'index-layout',
  head() {
    return {
      title: 'เข้าสู่ระบบ'
    }
  },
  components: {
    Notification,
    Logo
  },
  // middleware: 'guest',
  data() {
    return {
      btnDis: false,
      submitting: false,
      error: null,
      credentials: {
        identifier: ''
        // password: '123456789'
      },

      show1: false,
      rules: {
        required: value => !!value || 'กรุณากรอกข้อมูล!',
        min: v => v.length >= 2 || 'Min 2 characters'
      }
    }
  },

  methods: {
    login() {
      // try {
      //   await this.$auth.loginWith('local', {
      //     data: {
      //       email: this.email,
      //       password: this.password
      //     }
      //   })

      //   this.$router.push('/')
      // } catch (e) {
      //   this.error = e.response.data.message
      // }
      console.log('test login')
      // if (rules) {
      //   this.$router.push('/lists')
      // }
    }

    // computed: {
    //   btnDisable() {
    //     if (
    //       this.credentials.identifier == '' ||
    //       this.credentials.password == ''
    //     ) {
    //       return (this.btnDis = true)
    //     } else {
    //       return (this.btnDis = false)
    //     }
    //   }
    // }
  }
}
</script>
<style scoped></style>
