<template>
  <GenericCard>
    <FlexVertical>
      <FlexHorizontal between v-if="refreshRequired">
        <h3 class="text-gray-400 dark:text-gray-500 font-bold uppercase">Strength</h3>
        <SmallSecondaryButton @click="calcStrength">Calculate</SmallSecondaryButton>
      </FlexHorizontal>
      <FlexVertical slim class="text-rose-500" v-else-if="!expand && warning">
        <h3 class="font-bold uppercase flex items-center gap-3"><IconWarning class="h-6 fill-current inline" /> Warning</h3>
        <p class="text-sm font-medium">{{ warning }}</p>
      </FlexVertical>
      <FlexHorizontal between v-else>
        <h3 class="text-gray-400 dark:text-gray-500 font-bold uppercase">Strength</h3>
        <div class="flex gap-1">
          <StrengthBar
            v-for="i in 4"
            :key="i"
            :active="score >= i"
          />
        </div>
      </FlexHorizontal>
    </FlexVertical>
  </GenericCard>
  <GenericCard v-show="expand">
    <FlexVertical>
      <FlexVertical slim>
        <h3 class="text-gray-400 dark:text-gray-500 font-bold uppercase">Tips</h3>
        <FlexVertical slim>
          <span v-for="(item, index) in suggestions" :key="index" class="font-medium">{{ item }}</span>
        </FlexVertical>
      </FlexVertical>
      <FlexVertical slim>
        <h3 class="text-gray-400 dark:text-gray-500 font-bold uppercase">Warning</h3>
        <div>
          <span class="font-medium">{{ warning || "-" }}</span>
        </div>
      </FlexVertical>
      <FlexVertical slim>
        <FlexHorizontal slim class="text-gray-400 dark:text-gray-500">
          <h3 class="font-bold uppercase">Crack time</h3>
          <small>(offline)</small>
        </FlexHorizontal>
        <div>
          <span class="font-medium">{{ crackTimeOfflineDisplay }}</span>
        </div>
      </FlexVertical>
      <FlexVertical slim>
        <FlexHorizontal slim class="text-gray-400 dark:text-gray-500">
          <h3 class="font-bold uppercase">Crack time</h3>
          <small>(online)</small>
        </FlexHorizontal>
        <div>
          <span class="font-medium">{{ crackTimeOnlineDisplay }}</span>
        </div>
      </FlexVertical>
      <FlexVertical slim>
        <h3 class="text-gray-400 dark:text-gray-500 font-bold uppercase">Guesses</h3>
        <div>
          <span class="font-medium">{{ guesses }}</span>
        </div>
      </FlexVertical>
      <FlexVertical slim>
        <h3 class="text-gray-400 dark:text-gray-500 font-bold uppercase">Sequence</h3>
        <CodeBlock>
          <FlexVertical slim>
            <span v-for="(item, index) in sequence" :key="index" class="text-xs font-medium">{{index + 1 }}. {{ item.pattern }} "{{ item.token }}" ({{ item.guesses }} guesses)</span>
          </FlexVertical>
        </CodeBlock>
      </FlexVertical>
      <div>
        <small class="text-gray-400 dark:text-gray-500">strength estimation calculated in {{ calcTime }} ms using zxcvbn</small>
      </div>
    </FlexVertical>
  </GenericCard>
  <div class="flex justify-center px-6">
    <SmallSecondaryButton @click="expand = !expand"><IconExpand class="h-6" :class="{'rotate-180': expand}" />Show {{ expand ? "Less" : "More" }}</SmallSecondaryButton>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import zxcvbn from "zxcvbn-typescript";
import {set} from "@vueuse/core";
import GenericCard from "@/components/generic/GenericCard.vue";
import FlexVertical from "@/components/generic/FlexVertical.vue";
import FlexHorizontal from "@/components/generic/FlexHorizontal.vue";
import StrengthBar from "@/components/goodies/StrengthBar.vue";
import SmallSecondaryButton from "@/components/form/SmallSecondaryButton.vue";
import IconExpand from "@/components/icons/IconExpand.vue";
import CodeBlock from "@/components/generic/CodeBlock.vue";
import IconWarning from "@/components/icons/IconWarning.vue";

const props = defineProps<{
  passwordText: string;
}>();

const expand = ref(false);

const refreshRequired = ref(false);

const crackTimeOfflineDisplay = ref<string>("");
const crackTimeOnlineDisplay = ref<string>("");
const score = ref<number>(0);
const guesses = ref<number>(0);
const suggestions = ref<string[]>([]);
const warning = ref<string>("");
const sequence = ref<any[]>([]);
const calcTime = ref<number>(0);

watch(() => props.passwordText, (newVal) => {
  if(newVal.length < 42) {
    calcStrength();
  } else {
    set(refreshRequired, true)
  }
});

function calcStrength() {
  set(refreshRequired, false)

  const res = zxcvbn(props.passwordText);

  set(crackTimeOfflineDisplay, res.crack_times_display.offline_fast_hashing_1e10_per_second);
  set(crackTimeOnlineDisplay, res.crack_times_display.online_no_throttling_10_per_second)
  set(score, res.score);
  set(guesses, res.guesses);
  set(suggestions, res.feedback.suggestions)
  set(warning, res.feedback.warning);
  set(sequence, res.sequence)
  set(calcTime, res.calc_time)
}
</script>