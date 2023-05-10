<template>
  <div class="flex-vertical" :class="{'gap-6': !slim, 'gap-3': slim, 'justify-between': between}">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  slim?: boolean;
  between?: boolean;
}>()
</script>

<style scoped>
div.flex-vertical {
  @apply flex flex-col
}
</style>