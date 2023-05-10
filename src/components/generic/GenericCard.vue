<template>
  <section class="card-outer">
    <div class="card-inner">
      <slot />
    </div>
  </section>
</template>

<style scoped>
section.card-outer {
  @apply bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-500 dark:to-gray-800 rounded-xl p-[1px]
}
div.card-inner {
  @apply bg-gray-100 dark:bg-gray-800 rounded-xl p-6;
}
</style>