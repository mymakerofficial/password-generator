<template>
  <span
    class="bar-outer"
    :data-active="active"
  >
    <span
      class="bar-inner"
      :data-active="active"
    />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean;
}>()
</script>

<style scoped>
span.bar-outer {
  @apply block h-8 w-2 p-[0.1em] rounded-full;
}

span.bar-outer[data-active="false"] {
  @apply bg-gradient-to-b from-gray-300 to-gray-200 dark:from-gray-900 dark:to-gray-700 shadow-inner;
}

span.bar-outer[data-active="true"] {
  @apply bg-gradient-to-b from-indigo-500 dark:from-indigo-600 to-indigo-200 shadow-md shadow-indigo-500/50;
}

span.bar-inner {
  @apply block w-full h-full rounded-full
}

span.bar-inner[data-active="false"] {
  @apply bg-gray-200 dark:bg-gray-900;
}

span.bar-inner[data-active="true"] {
  @apply bg-gradient-to-b from-indigo-300 to-indigo-400;
}
</style>