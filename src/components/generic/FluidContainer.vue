<template>
  <div class="fluid-container">
    <slot />
  </div>
</template>

<style scoped>
div.fluid-container {
  @apply px-6 md:mx-auto md:w-3/4 lg:w-1/2 xl:w-1/3 flex flex-col justify-center h-screen;
}
</style>