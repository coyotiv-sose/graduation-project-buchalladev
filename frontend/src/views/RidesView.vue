<script setup>
import axios from 'axios'
const { data: rides } = await axios.get('http://localhost:3000/rides')
</script>

<template>
  <div>
    <h1>Rides</h1>
    <p>
      Welcome to the Ride page! p Here you can see all the Rides that have been created by users.
    </p>

    <router-link to="/rides/new"><button class="btn btn-primary">Create ride</button></router-link>

    <ul>
      <li v-for="ride in rides" :key="ride._id">
        <router-link :to="`/rides/${ride._id}`">{{ ride.name }}</router-link> at
        {{ ride.location }} on {{ ride.date }}
      </li>
    </ul>
  </div>
</template>
