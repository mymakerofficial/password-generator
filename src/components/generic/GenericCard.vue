<template>
  <section>
    <div>
      <slot />
    </div>
  </section>
</template>

<style scoped>
section {
  @apply bg-gradient-to-b from-gray-500 to-gray-800 rounded-xl p-[0.1em]
}
div {
  @apply bg-gray-800 rounded-xl p-6;
}
</style>