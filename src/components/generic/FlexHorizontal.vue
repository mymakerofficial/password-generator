<template>
  <div class="flex-horizontal" :class="{'gap-6': !slim, 'gap-3': slim, 'justify-between': between, 'items-top': itemsTop, 'items-center': !itemsTop}">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  slim?: boolean;
  between?: boolean;
  itemsTop?: boolean;
}>()
</script>

<style scoped>
div.flex-horizontal {
  @apply flex flex-row
}
</style>