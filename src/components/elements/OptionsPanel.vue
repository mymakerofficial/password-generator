<template>
  <GenericCard>
    <template #header>
      <RadioGroup
          v-model="type"
          :options="[
          { label: 'Password', key: PasswordType.Password },
          { label: 'Passphrase', key: PasswordType.Passphrase },
        ]"
      />
    </template>
    <FlexVertical>
      <PasswordOptionsForm
        v-if="type === PasswordType.Password"
        v-model="passwordOptions"
      />
      <PassphraseOptionsForm
        v-else-if="type === PasswordType.Passphrase"
        v-model="passphraseOptions"
      />
      <div>
        <LargePrimaryButton @click="generate"><IconMagic class="h-5"/>Generate</LargePrimaryButton>
      </div>
    </FlexVertical>
  </GenericCard>
</template>

<script setup lang="ts">
import GenericCard from "@/components/generic/GenericCard.vue";
import FlexVertical from "@/components/generic/FlexVertical.vue";
import LargePrimaryButton from "@/components/form/LargePrimaryButton.vue";
import type {PassphraseOptions, PasswordOptions} from "@/lib/generatePassword";
import {useVModel} from "@vueuse/core";
import IconMagic from "@/components/icons/IconMagic.vue";
import RadioGroup from "@/components/form/RadioGroup.vue";
import {PasswordType} from "@/lib/generatePassword";
import PasswordOptionsForm from "@/components/elements/PasswordOptionsForm.vue";
import PassphraseOptionsForm from "@/components/elements/PassphraseOptionsForm.vue";

const props = defineProps<{
  type: PasswordType;
  passwordOptions: PasswordOptions;
  passphraseOptions: PassphraseOptions;
}>();

const emit = defineEmits(["update:type", "update:passwordOptions", "update:passphraseOptions", "generate"]);

const type = useVModel(props, "type", emit);

const passwordOptions = useVModel(props, "passwordOptions", emit);
const passphraseOptions = useVModel(props, "passphraseOptions", emit);

function generate() {
  emit("generate");
}
</script>