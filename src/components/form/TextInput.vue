<template>
  <input
    ref="input"
    v-model="value"
    type="text"
    class="bg-transparent border-transparent focus:border-transparent focus:ring-0 !outline-none"
    @focus="focus"
  >
</template>

<script setup lang="ts">
import {defineProps, ref} from "vue";
import {get, useVModel} from "@vueuse/core";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const value = useVModel(props, "modelValue", emit);

const input = ref<HTMLInputElement | null>(null);

function focus() {
  // when focusing the input select everything
  if (get(input)) {
    get(input)!.select();
  }
}
</script>