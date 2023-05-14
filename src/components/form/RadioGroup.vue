<template>
  <div class="radio-wrapper">
    <template v-for="option in props.options" :key="option.key">
      <input
        type="radio"
        :id="option.key"
        :value="option.key"
        v-model="value"
      />
      <label :for="option.key">{{ option.label }}</label>
    </template>
  </div>
</template>

<script setup lang="ts">
import {useVModel} from "@vueuse/core";

const props = defineProps<{
  options: {
    label: string;
    key: string | number | any;
  }[];
  modelValue: string | number | any;
}>();

const emit = defineEmits(["update:modelValue"]);

const value = useVModel(props, "modelValue", emit);
</script>

<style scoped>
.radio-wrapper {
  @apply flex h-10 text-xs font-medium flex justify-center items-center bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600;
}

.radio-wrapper input[type="radio"] {
  @apply appearance-none absolute opacity-0;
}

.radio-wrapper input[type="radio"] + label {
  @apply h-full grow flex items-center justify-center cursor-pointer px-6;
}

.radio-wrapper input[type="radio"]:checked + label {
  @apply bg-gradient-to-b from-indigo-500 to-indigo-600 text-gray-100 dark:from-gray-600 dark:to-gray-700 font-bold;
}
</style>