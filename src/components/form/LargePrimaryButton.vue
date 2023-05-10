<template>
  <Component :is="$attrs.href ? 'a' : $attrs.to ? RouterLink : 'button'" class="primary-button">
    <slot />
  </Component>
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";
</script>

<style scoped>
.primary-button {
  @apply flex gap-2 justify-center items-center h-14 bg-gradient-to-b from-indigo-500 to-indigo-600 text-gray-100 font-bold uppercase p-4 w-full rounded-full;
}
</style>

<style>
button.primary-button svg {
  @apply fill-gray-100;
}
</style>