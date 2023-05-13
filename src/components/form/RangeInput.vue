<template>
  <input
    type="range"
    v-model.number="value"
    :min="min"
    :max="max"
    :style="{backgroundSize: `${(value - min) / (max - min) * 100}% 100%`}"
  />
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = withDefaults(
    defineProps<{
      modelValue: number;
      min?: number;
      max?: number;
    }>(),
    {
      min: 0,
      max: 100,
    }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: number): void;
}>();

const value = useVModel(props, "modelValue", emit);
</script>

<style scoped>

input[type="range"] {
  @apply appearance-none h-1 w-full bg-gray-300 dark:bg-gray-500 bg-gradient-to-b from-indigo-400 to-indigo-500 rounded-full bg-no-repeat;
}

/* Input Thumb */
input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none h-4 aspect-square rounded-full bg-indigo-400 bg-gradient-to-b from-indigo-400 to-indigo-500 shadow-md shadow-indigo-500/50;
}

input[type="range"]::-moz-range-thumb {
  @apply appearance-none h-4 aspect-square rounded-full bg-indigo-400 bg-gradient-to-b from-indigo-400 to-indigo-500 shadow-md shadow-indigo-500/50;
}

input[type="range"]::-ms-thumb {
  @apply appearance-none h-4 aspect-square rounded-full bg-indigo-400 bg-gradient-to-b from-indigo-400 to-indigo-500 shadow-md shadow-indigo-500/50;
}

/* Input Track */
input[type=range]::-webkit-slider-runnable-track  {
  @apply appearance-none bg-transparent border-none;
}

input[type=range]::-moz-range-track {
  @apply appearance-none bg-transparent border-none;
}

input[type="range"]::-ms-track {
  @apply appearance-none bg-transparent border-none;
}
</style>