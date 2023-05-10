<template>
  <Component :is="$attrs.href ? 'a' : $attrs.to ? RouterLink : 'button'" class="secondary-button-outer">
    <span class="secondary-button-inner">
      <slot />
    </span>
  </Component>
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";
</script>

<style scoped>
.secondary-button-outer {
  @apply h-10 bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-500 dark:to-gray-800 p-[0.1em] rounded-full;
}

span.secondary-button-inner {
  @apply h-full text-xs font-medium flex gap-3 justify-center items-center bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 px-6 rounded-full;
}
</style>