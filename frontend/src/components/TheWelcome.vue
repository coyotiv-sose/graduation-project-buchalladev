<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

import axios from 'axios'

const { data: rides } = await axios.get('http://localhost:3000/rides')
</script>

<template>
  <div>
    <h1>Rides</h1>
    <ul>
      <li v-for="ride in rides" :key="ride.id">
        {{ ride.name }} at {{ ride.location }} on {{ ride.date }}
      </li>
    </ul>
  </div>
</template>
