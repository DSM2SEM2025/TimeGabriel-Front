<template>
  <router-link :to="route" class="block rounded-2xl p-6 shadow hover:shadow-md transition-all" :class="color">
    <div class="text-4xl mb-2">{{ icon }}</div>
    <h3 class="text-lg font-bold">{{ title }}</h3>
    <p class="text-sm text-gray-700">{{ description }}</p>
  </router-link>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  route: String,
  color: String,
  icon: String
})
</script>
