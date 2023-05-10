<template>
  <GenericCard>
    <FlexHorizontal>
      <input class="text-2xl bg-transparent w-full" type="text" v-model="passwordText" />
      <button @click="copy(passwordText)" class="text-indigo-400">Copy!</button>
    </FlexHorizontal>
  </GenericCard>
</template>

<script setup lang="ts">
import GenericCard from "@/components/generic/GenericCard.vue";
import FlexHorizontal from "@/components/generic/FlexHorizontal.vue";
import {useClipboard, useVModel} from "@vueuse/core";

const props = defineProps<{
  passwordText: string;
}>();

const emit = defineEmits(["update:passwordText"]);

const passwordText = useVModel(props, "passwordText", emit);

const { copy } = useClipboard();
</script>