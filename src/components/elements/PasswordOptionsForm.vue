<template>
  <FlexVertical>
    <FlexVertical slim>
      <FlexHorizontal between>
        <label for="length">Character Length</label>
        <SmallNumberInput id="length" v-model="options.length" :hard-min="1" :min="3" :max="128" :hard-max="1000" class="text-right w-auto" />
      </FlexHorizontal>
      <div>
        <RangeInput
          :min="3"
          :max="128"
          v-model.number="options.length"
        />
      </div>
    </FlexVertical>
    <FlexVertical slim>
      <FlexHorizontal slim>
        <CheckboxInput type="checkbox" id="includeUppercase" v-model="options.includeUppercase" />
        <label for="includeUppercase">Include Uppercase</label>
      </FlexHorizontal>
      <FlexHorizontal slim>
        <CheckboxInput type="checkbox" id="includeLowercase" v-model="options.includeLowercase" />
        <label for="includeLowercase">Include Lowercase</label>
      </FlexHorizontal>
      <FlexHorizontal slim>
        <CheckboxInput type="checkbox" id="includeNumbers" v-model="options.includeNumbers" />
        <label for="includeNumbers">Include Numbers</label>
      </FlexHorizontal>
      <FlexHorizontal slim>
        <CheckboxInput type="checkbox" id="includeSymbols" v-model="options.includeSymbols" />
        <label for="includeSymbols">Include Symbols</label>
      </FlexHorizontal>
      <FlexHorizontal slim>
        <CheckboxInput type="checkbox" id="avoidAmbiguous" v-model="options.avoidAmbiguous" />
        <label for="avoidAmbiguous">Avoid Ambiguous Characters</label>
      </FlexHorizontal>
    </FlexVertical>
  </FlexVertical>
</template>

<script setup lang="ts">
import FlexVertical from "@/components/generic/FlexVertical.vue";
import FlexHorizontal from "@/components/generic/FlexHorizontal.vue";
import RangeInput from "@/components/form/RangeInput.vue";
import CheckboxInput from "@/components/form/CheckboxInput.vue";
import type {PasswordOptions} from "@/lib/generatePassword";
import {useVModel} from "@vueuse/core";
import SmallNumberInput from "@/components/form/SmallNumberInput.vue";

const props = defineProps<{
  modelValue: PasswordOptions;
}>();

const emit = defineEmits(["update:modelValue"]);

const options = useVModel(props, "modelValue", emit);
</script>