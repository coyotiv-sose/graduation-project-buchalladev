import { defineStore } from 'pinia'
import axios from 'axios'

export const useRideStore = defineStore('Ride', {
  state: () => ({
    ride: null
  }),
  actions: {
    async fetchRide(id) {
      this.ride = (await axios.get('/rides/' + id)).data
    },
    async createRide(name, location, date) {
      return (
        await axios.post('/rides', {
          name: name,
          location: location,
          date: date
        })
      ).data
    }
  }
})
