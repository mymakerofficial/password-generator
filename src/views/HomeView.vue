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
import {onMounted, ref} from "vue";
import {get, set, watchIgnorable} from "@vueuse/core";
import {defaultPasswordOptions, password, passwordToOptions} from "@/lib/password";
import type {PasswordOptions} from "@/lib/password";

const passwordText = ref("");

const options = ref<PasswordOptions>({
  ...defaultPasswordOptions
})

function generate() {
  const res = password(get(options));
  ignoreUpdates(() => {
    set(passwordText, res);
  });
}

const { ignoreUpdates } = watchIgnorable(passwordText, (newVal) => {
  const res = passwordToOptions(newVal);

  if (res.length > 0) {
    set(options, res);
  } else {
    set(options, defaultPasswordOptions);
  }
});

onMounted(() => {
  generate();
});
</script>
