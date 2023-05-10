<template>
  <GenericCard>
    <FlexVertical>
      <FlexVertical slim>
        <FlexHorizontal between>
          <label for="length">Character Length</label>
          <span class="text-indigo-400">{{ options.length }}</span>
        </FlexHorizontal>
        <div>
          <input
              id="length"
              type="range"
              min="3"
              max="64"
              v-model="options.length"
              class="w-full"
          />
        </div>
      </FlexVertical>
      <FlexVertical slim>
        <FlexHorizontal slim>
          <input type="checkbox" id="includeUppercase" v-model="options.includeUppercase" />
          <label for="includeUppercase">Include Uppercase</label>
        </FlexHorizontal>
        <FlexHorizontal slim>
          <input type="checkbox" id="includeLowercase" v-model="options.includeLowercase" />
          <label for="includeLowercase">Include Lowercase</label>
        </FlexHorizontal>
        <FlexHorizontal slim>
          <input type="checkbox" id="includeNumbers" v-model="options.includeNumbers" />
          <label for="includeNumbers">Include Numbers</label>
        </FlexHorizontal>
        <FlexHorizontal slim>
          <input type="checkbox" id="includeSymbols" v-model="options.includeSymbols" />
          <label for="includeSymbols">Include Symbols</label>
        </FlexHorizontal>
      </FlexVertical>
      <div>
        <LargePrimaryButton @click="generate"><IconMagic class="h-5"/>Generate</LargePrimaryButton>
      </div>
    </FlexVertical>
  </GenericCard>
</template>

<script setup lang="ts">
import GenericCard from "@/components/generic/GenericCard.vue";
import FlexVertical from "@/components/generic/FlexVertical.vue";
import FlexHorizontal from "@/components/generic/FlexHorizontal.vue";
import LargePrimaryButton from "@/components/form/LargePrimaryButton.vue";
import type {PasswordOptions} from "@/lib/password";
import {useVModel} from "@vueuse/core";
import IconMagic from "@/components/icons/IconMagic.vue";

const props = defineProps<{
  options: PasswordOptions;
}>();

const emit = defineEmits(["update:options", "generate"]);

const options = useVModel(props, "options", emit);

function generate() {
  emit("generate");
}
</script>