<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <div class="text-center my-auto">
          <VuetifyLogo />
        </div>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon left>fas fa-user-circle</v-icon>
              สวัสดี : {{ user ? user.name : '' }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <v-icon left>fas fa-user</v-icon>
              <span class="headline">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="credentials.name"
                      label="แก้ไขชื่อ"
                      required
                      outlined
                      rounded
                      autofocus
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialog"
                >Close</v-btn
              >
              <v-btn color="blue darken-1" text @click="edit">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn text @click="logout">
          <v-icon left>fas fa-sign-out-alt</v-icon>ออกจากระบบ
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import VuetifyLogo from '~/components/logo/VuetifyLogo.vue'
export default {
  data() {
    return {}
  },

  components: {
    VuetifyLogo
  },

  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/setUserLogout')
        this.$router.replace('/')
      } catch (error) {
        throw error
      }
    },

    async edit() {
      try {
        await this.$store.dispatch('auth/setUser', this.credentials)
        this.dialog = false
        await Swal.fire('Good job!', 'You clicked the button!', 'success')
        this.$router.go('/')
      } catch (error) {
        throw error
      }
    },

    getName() {
      this.credentials.name = this.user.name || ''
    },

    closeDialog() {
      this.getName()
      this.dialog = false
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/loggedInUser']
    },

    drawer: {
      get() {
        return this.$store.getters['navigation/drawer']
      },

      set(val) {
        return this.$store.dispatch('navigation/setDrawer', val)
      }
    },

    dialog: {
      get() {
        return this.$store.getters['navigation/dialog']
      },

      set(val) {
        return this.$store.dispatch('navigation/setDialog', val)
      }
    },

    title() {
      return this.$store.getters['navigation/title']
    },

    items() {
      return this.$store.getters['navigation/items']
    },

    fixed() {
      return this.$store.getters['navigation/fixed']
    },

    credentials() {
      return {
        name: ''
      }
    }
  },

  mounted() {
    this.getName()
  }
}
</script>
