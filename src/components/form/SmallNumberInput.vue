<template>
  <TextInput type="number" class="text-sm text-indigo-400" :min="min" :max="max" :model-value="(value || min).toString()" @update:model-value="value = parseInt($event)" />
</template>

<script setup lang="ts">
import TextInput from "@/components/form/TextInput.vue";
import {defineProps, watch} from "vue";
import {get, set, useVModel} from "@vueuse/core";

const props = withDefaults(
    defineProps<{
      modelValue: number;
      min?: number;
      max?: number;
      hardMin?: number;
      hardMax?: number;
    }>(),
    {
      min: 0,
      max: Infinity,
      hardMin: -Infinity,
      hardMax: Infinity,
    }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: number): void;
}>();

const value = useVModel(props, "modelValue", emit);

watch(value, () => {
  // if the value is less than the min, set it to the min
  if (get(value) < props.hardMin) {
    set(value, props.hardMin);
  }

  // if the value is greater than the max, set it to the max
  if (get(value) > props.hardMax) {
    set(value, props.hardMax);
  }
});
</script>