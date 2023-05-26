<script>
import { mapActions } from 'pinia'
import { useAccountStore } from '../stores/account'

export default {
  name: 'NavBar',
  props: {
    user: Object
  },
  methods: {
    ...mapActions(useAccountStore, ['logout'])
  }
}
</script>

<template>
  <div class="navbar">
    <div class="innernav">
      <div class="logo link"><a href="/">GRUPPETTO</a></div>
      <div class="link"><a href="/rides">Rides</a></div>
      <div class="link"><a href="/users">Users</a></div>
      <div class="link" v-if="!user"><a href="/login">Log in</a></div>
      <div class="link" v-if="!user"><a href="/signup">Sign up</a></div>
      <div class="link" v-if="user"><a href="/myrides">My Rides</a></div>
      <div class="link" v-if="user"><a href="/profile">My Profile</a></div>
      <div class="link" v-if="user"><a href="/logout" @click="logout">Log out</a></div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 1rem;
  margin-bottom: 1rem;
}

.innernav {
  display: flex;
  justify-content: space-between;
  max-width: 1024px;
  margin-right: 10%;
  margin-left: 10%;
  /* //space between */
  gap: 5rem;
}

.logo a {
  font-size: 2rem;
  font-weight: bold;
  color: black;
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
}

li a {
  cursor: pointer;
}

.nav-item.dropdown {
  justify-content: end;
}
</style>
