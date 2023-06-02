<template>
  <GenericCard>
    <FlexHorizontal>
      <TextInput v-model="passwordText" class="text-2xl w-full" />
      <button @click="copy(passwordText)" class="text-indigo-400"><IconCopy class="h-5" /></button>
    </FlexHorizontal>
  </GenericCard>
</template>

<script setup lang="ts">
import GenericCard from "@/components/generic/GenericCard.vue";
import FlexHorizontal from "@/components/generic/FlexHorizontal.vue";
import {useClipboard, useVModel} from "@vueuse/core";
import IconCopy from "@/components/icons/IconCopy.vue";
import TextInput from "@/components/form/TextInput.vue";

const props = defineProps<{
  passwordText: string;
}>();

const emit = defineEmits(["update:passwordText"]);

const passwordText = useVModel(props, "passwordText", emit);

const { copy } = useClipboard();
</script>