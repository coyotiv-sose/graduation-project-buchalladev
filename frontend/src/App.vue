<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAccountStore } from './stores/account'
import { mapActions, mapState } from 'pinia'
//import axios from 'axios'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    RouterLink,
    RouterView
  },
  async mounted() {
    await this.fetchUser()
  },
  methods: {
    ...mapActions(useAccountStore, ['fetchUser', 'logout'])
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  }
}
</script>

<template>
  <div>
  <NavBar :user="user" />
  <Suspense>
    <RouterView />
  </Suspense>
  </div>
</template>
