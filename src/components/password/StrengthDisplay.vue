<template>
  <div class="bg-gray-800 p-6">
    <div class="flex flex-col gap-6">
      <div class="flex justify-between gap-3">
        <h3 class="text-gray-500 font-bold uppercase">Strength</h3>
        <div class="flex gap-1">
          <span
            v-for="i in 4"
            :key="i"
            class="block h-8 w-2"
            :class="{ 'bg-gray-900': score < i, 'bg-green-300': score >= i }"
          />
        </div>
      </div>
      <div class="flex justify-between gap-3">
        <h3 class="text-gray-500 font-bold uppercase">Guessed in</h3>
        <div>
          <span class="text-gray-100 font-medium">{{ crackTimeDisplay }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import zxcvbn from "zxcvbn-typescript";
import {set} from "@vueuse/core";

const props = defineProps<{
  passwordText: string;
}>();

const crackTimeDisplay = ref("");
const score = ref(0);

watch(() => props.passwordText, (newVal) => {
  const res = zxcvbn(newVal);
  set(crackTimeDisplay, res.crack_times_display.offline_slow_hashing_1e4_per_second);
  set(score, res.score);
});
</script>