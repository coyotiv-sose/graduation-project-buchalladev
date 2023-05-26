<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
import { useRideStore } from '../stores/ride'

export default {
  name: 'CreateRideView',
  data() {
    return {
      date: '',
      distance: ''
    }
  },
  methods: {
    ...mapActions(useRideStore, ['createRide']),
    async doCreateRide() {
      await this.createRide(this.name, this.location, this.date, this.time, this.distance)
      this.$router.push('/rides')
    }
  }
}
</script>

<template>
  <div>
    <h2>Create a new ride</h2>
    <form @submit.prevent="doCreateRide">
      <label for="date">Date:</label>
      <input id="date" v-model="date" type="date" required />

      <label for="name">Name:</label>
      <input id="name" v-model="name" type="text" required />

      <label for="time">Time:</label>
      <input id="time" v-model="time" type="text" required />

      <label for="location">Location:</label>
      <input id="location" v-model="location" type="text" required />

      <label for="distance">Distance:</label>
      <input id="distance" v-model="distance" type="number" required />

      <button class="btn btn-primary" type="submit">Create ride</button>
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
