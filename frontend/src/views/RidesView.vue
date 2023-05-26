<script setup>
import axios from 'axios'
const { data: rides } = await axios.get('http://localhost:3000/rides')
</script>

<template lang="pug">

p Welcome to the Ride page!
p Here you can see all the Rides that have been created by users.

button(type="button") Create a new Ride

ul
  li(v-for="ride in rides" :key="ride._id")
    RouterLink(:to="`/rides/${ride._id}`")
      | {{ ride.name }} at {{ ride.location }} on {{ ride.date }}

</template>
