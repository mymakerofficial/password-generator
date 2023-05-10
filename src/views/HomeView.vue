<template>
  <main>
    <Container>
      <FlexVertical>
        <div class="flex justify-center">
          <h1 class="text-lg text-gray-300 font-medium">Simple Password Generator</h1>
        </div>
        <PasswordDisplay v-model:password-text="passwordText" />
        <OptionsPanel v-model:options="options" @generate="generate" />
        <StrengthDisplay :password-text="passwordText" />
      </FlexVertical>
    </Container>
  </main>
</template>

<script setup lang="ts">
import Container from "@/components/generic/FluidContainer.vue";
import FlexVertical from "@/components/generic/FlexVertical.vue";
import StrengthDisplay from "@/components/elements/StrengthDisplay.vue";
import OptionsPanel from "@/components/elements/OptionsPanel.vue";
import PasswordDisplay from "@/components/elements/PasswordDisplay.vue";
import {onMounted, reactive, ref} from "vue";
import {set} from "@vueuse/core";
import {defaultPasswordOptions, generatePassword} from "@/lib/generatePassword";
import type {GeneratePasswordOptions} from "@/lib/generatePassword";

const passwordText = ref("");

const options = reactive<GeneratePasswordOptions>({
  ...defaultPasswordOptions
})

function generate() {
  const res = generatePassword(options);
  set(passwordText, res)
}

onMounted(() => {
  generate();
});
</script>
