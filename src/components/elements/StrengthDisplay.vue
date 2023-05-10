<template>
  <GenericCard>
    <FlexVertical>
      <FlexHorizontal between>
        <h3 class="text-gray-400 dark:text-gray-500 font-bold uppercase">Strength</h3>
        <div class="flex gap-1">
          <span
              v-for="i in 4"
              :key="i"
              class="block h-8 w-2"
              :class="{ 'bg-gray-900': score < i, 'bg-indigo-400': score >= i }"
          />
        </div>
      </FlexHorizontal>
      <FlexHorizontal between>
        <h3 class="text-gray-400 dark:text-gray-500 font-bold uppercase">Guessed in</h3>
        <div>
          <span class="font-medium">{{ crackTimeDisplay }}</span>
        </div>
      </FlexHorizontal>
    </FlexVertical>
  </GenericCard>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import zxcvbn from "zxcvbn-typescript";
import {set} from "@vueuse/core";
import GenericCard from "@/components/generic/GenericCard.vue";
import FlexVertical from "@/components/generic/FlexVertical.vue";
import FlexHorizontal from "@/components/generic/FlexHorizontal.vue";

const props = defineProps<{
  passwordText: string;
}>();

const crackTimeDisplay = ref<string>();
const score = ref<number>();

watch(() => props.passwordText, (newVal) => {
  const res = zxcvbn(newVal);
  set(crackTimeDisplay, res.crack_times_display.offline_slow_hashing_1e4_per_second);
  set(score, res.score);
});
</script>