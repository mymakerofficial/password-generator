<template>
  <button class="fancy-button">
    <slot />
  </button>
</template>

<style scoped>
button.fancy-button {
  @apply flex gap-2 justify-center items-center h-14 bg-gradient-to-b from-indigo-500 to-indigo-600 text-gray-100 font-bold uppercase p-4 w-full rounded-full;
}
</style>

<style>
button.fancy-button svg {
  @apply fill-gray-100;
}
</style>