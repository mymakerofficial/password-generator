<template>
  <FlexVertical>
    <FlexVertical slim>
      <FlexHorizontal between>
        <label for="length">Word Count</label>
        <SmallNumberInput id="length" v-model="options.length" :hard-min="1" :min="1" :max="12" :hard-max="100" class="text-right w-auto" />
      </FlexHorizontal>
      <div>
        <RangeInput

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
      <FlexHorizontal slim>
        <SmallTextInput v-model="options.separator" class="w-4 text-center" id="seperator" :maxlength="1" />
        <label for="seperator">Separator</label>
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
import SmallTextInput from "@/components/form/SmallTextInput.vue";
import SmallNumberInput from "@/components/form/SmallNumberInput.vue";

const props = defineProps<{
  modelValue: PassphraseOptions;
}>();

const emit = defineEmits(["update:modelValue"]);

const options = useVModel(props, "modelValue", emit);
</script>