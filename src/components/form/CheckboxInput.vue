<template>
  <input
    type="checkbox"
    v-model="value"
  />
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const value = useVModel(props, "modelValue", emit);
</script>

<style scoped>
input[type="checkbox"] {
  @apply appearance-none bg-transparent border border-gray-300 dark:border-gray-500 rounded-md w-4 aspect-square grid place-content-center transition-colors duration-200;
}

input[type="checkbox"]:checked {
  @apply bg-gray-900 dark:bg-gray-100 border-transparent;
}

input[type="checkbox"]::before {
  content: "";
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  @apply h-2 aspect-square bg-gray-900 dark:bg-gray-100 rounded-sm scale-0 transition-transform transition-colors duration-200;
}

input[type="checkbox"]:checked::before {
  @apply scale-100 bg-gray-100 dark:bg-gray-900;
}
</style>