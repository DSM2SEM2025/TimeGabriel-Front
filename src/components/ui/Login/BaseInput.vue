<template>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      v-if="icon"
    >
      <component :is="icon" class="h-5 w-5 text-gray-400" />
    </div>

    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
      :class="{ 'pl-10': icon, 'pl-3': !icon }"
      :placeholder="placeholder"
      autocomplete="new-password"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  icon: {
    type: [Object, Function],
    default: null,
  },
});

defineEmits(["update:modelValue"]);
</script>
