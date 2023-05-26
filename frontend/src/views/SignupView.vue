<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  name: 'SignupView',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signup']),
    async doSignup() {
      await this.signup(this.name, this.email, this.password)
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <div>
    <h2>Sign up to Gruppetto</h2>
    <form @submit.prevent="doSignup">
      <div id="nameInPut">
        <label for="name">Name:</label>
        <input id="name" v-model="name" type="text" required />
      </div>
      <div id="emailInPut"></div>
      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" required />

      <div id="passwordInPut">
        l
        <!-- label.form-label(for="password") Password: -->
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
        <div class="signupButton">
          <button class="btn btn-primary" type="submit">Sign up</button>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped>
#emailInput,
#nameInput {
  margin-bottom: 1rem;
}
.signupButton {
  margin: auto;
}
.container {
  max-width: 400px;
  margin-top: 2rem;
}
</style>
