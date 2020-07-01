<template>
  <clientOnly>
    <div class="mt-5">
      <v-flex class="text-center mb-5">
        <Logo />
      </v-flex>

      <v-card class="mx-auto" max-width="800" raised>
        <div class="container mb-5 px-5">
          <h3 class="text-center">
            <h1>กรุณากรอกข้อมูล</h1>
          </h3>

          <v-form @submit.prevent="login" ref="form">
            <v-card-text>
              <v-text-field
                prepend-icon="fas fa-user-lock"
                v-model.trim="credentials.name"
                type="text"
                :rules="[rules.required, rules.min]"
                label="ชื่อเล่น"
                placeholder="ชื่อเล่น `John`"
                outlined
                dense
                autofocus
              ></v-text-field>

              <div class="text-center">
                <v-row>
                  <v-col col="12">
                    <v-btn type="submit" rounded block color="primary" large>
                      <v-icon left>fas fa-sign-in-alt</v-icon>ตกลง
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-form>
        </div>
      </v-card>
    </div>
  </clientOnly>
</template>

<script>
import Logo from '~/components/logo/Logo.vue'

export default {
  layout: 'index-layout',
  middleware: 'isNotAuth',
  head() {
    return {
      title: 'เข้าสู่ระบบ'
    }
  },
  components: {
    Logo
  },

  data() {
    return {
      credentials: {
        name: ''
      },

      rules: {
        required: value => !!value || 'กรุณากรอกข้อมูล!',
        min: v => v.length >= 2 || 'Min 2 characters'
      }
    }
  },

  methods: {
    async login() {
      try {
        if (this.$refs.form.validate()) {
          await this.$store.dispatch('auth/setUser', this.credentials)
          this.$router.push('/lists')
        } else {
          return alert('กรุณากรอกข้อมูลให้ครบ')
        }
      } catch (err) {
        throw err
      }
    }
  }
}
</script>
<style scoped></style>
