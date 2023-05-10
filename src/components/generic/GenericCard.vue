<template>
  <section class="card-outer">
    <div class="card-inner">
      <slot />
    </div>
  </section>
</template>

<style scoped>
section.card-outer {
  @apply bg-gradient-to-b from-gray-500 to-gray-800 rounded-xl p-[0.1em]
}
div.card-inner {
  @apply bg-gray-800 rounded-xl p-6;
}
</style>