<template>
  <TextInput class="text-sm text-indigo-400" v-model="value" />
</template>

<script setup lang="ts">
import {useVModel} from "@vueuse/core";
import TextInput from "@/components/form/TextInput.vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const value = useVModel(props, "modelValue", emit);
</script>