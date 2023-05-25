<script setup>
import axios from 'axios'

const { data: rides } = await axios.get('http://localhost:3000/rides')
console.log('rides', rides)
</script>

<template>
  <h1>test</h1>
  <ul>
    <li v-for="ride in rides" :key="ride.id">
      {{ ride.date }}
      {{ ride.name }}
      {{ ride.distance }}
      {{ ride.time }}
      {{ ride.averageSpeed }}
    </li>
  </ul>
</template>
