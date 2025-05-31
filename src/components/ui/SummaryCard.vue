<template>
  <div :class="`p-4 rounded-2xl shadow ${color}`">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-semibold text-gray-600">{{ title }}</p>
        <p class="text-2xl font-bold">{{ value }}</p>
        <p v-if="change" class="text-xs text-gray-500">{{ change }}</p>
      </div>
      <div class="text-3xl">{{ icon }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  icon: String,
  color: String,
  change: String
})
</script>
