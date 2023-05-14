<template>
  <FlexVertical>
    <FlexVertical slim>
      <FlexHorizontal between>
        <label for="length">Character Length</label>
        <span class="text-indigo-400">{{ options.length }}</span>
      </FlexHorizontal>
      <div>
        <RangeInput
            id="length"
            :min="1"
            :max="12"
            v-model.number="options.length"
        />
      </div>
    </FlexVertical>
    <FlexVertical slim>
      <FlexHorizontal slim>
        <CheckboxInput type="checkbox" id="capitalize" v-model="options.capitalize" />
        <label for="capitalize">Capitalize</label>
      </FlexHorizontal>
      <FlexHorizontal slim>
        <CheckboxInput type="checkbox" id="includeNumbers" v-model="options.includeNumbers" />
        <label for="includeNumbers">Include Numbers</label>
      </FlexHorizontal>
    </FlexVertical>
  </FlexVertical>
</template>

<script setup lang="ts">
import FlexVertical from "@/components/generic/FlexVertical.vue";
import FlexHorizontal from "@/components/generic/FlexHorizontal.vue";
import RangeInput from "@/components/form/RangeInput.vue";
import CheckboxInput from "@/components/form/CheckboxInput.vue";
import type {PassphraseOptions} from "@/lib/generatePassword";
import {useVModel} from "@vueuse/core";

const props = defineProps<{
  modelValue: PassphraseOptions;
}>();

const emit = defineEmits(["update:modelValue"]);

const options = useVModel(props, "modelValue", emit);
</script>