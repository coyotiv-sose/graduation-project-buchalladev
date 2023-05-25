<script>
import User from '../components/User.vue'
import { mapState, mapActions } from 'pinia'
import { useAccountStore } from '../stores/account'
import { useRideStore } from '../stores/ride'
import { onUnmounted } from 'vue'

export default {
  name: 'RideDetail',
  components: {
    CounterOptionsApi,
    User
  },
  async created() {
    await this.fetchRide(this.$route.params.id)

    this.joinRide(this.ride._id)
  },
  unmounted() {
    this.leaveRide(this.ride._id)
  },
  computed: {
    ...mapState(useAccountStore, ['user']),
    ...mapState(useRideStore, ['ride'])
  },
  methods: {
    ...mapActions(useRideStore, ['fetchRide', 'joinRide', 'leaveRide'])
  }
}
</script>

<template lang="pug">
div(v-if="!ride")
  p Loading...
div(v-else)
  h2 {{ride.name}}
  p(v-if="user && user._id == ride?.attendees?.[0]?._id")
    RouterLink(to="/rides/:id/edit") Edit ride

  h3 at {{ride.location}} on {{ride.date}}

  p This Ride is hosted by: {{ ride.attendees?.[0].name }}

  p {{ ride.description }}

  p {{ride.attendees?.length}} people are attending:

  ul
    li(v-for="attendee in ride.attendees" :key="attendee._id")
      User(:user="attendee")



</template>
