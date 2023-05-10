<template>
  <main>
    <Container>
      <FlexVertical>
        <FlexHorizontal between class="px-6">
          <h1 class="text-md text-gray-300 font-medium">Simple Password</h1>
          <SmallSecondaryButton href="https://github.com/mymakerofficial/password-generator" target="_blank"><IconGithub class="h-5"/>Star on GitHub</SmallSecondaryButton>
        </FlexHorizontal>
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
import FlexHorizontal from "@/components/generic/FlexHorizontal.vue";
import StrengthDisplay from "@/components/elements/StrengthDisplay.vue";
import OptionsPanel from "@/components/elements/OptionsPanel.vue";
import PasswordDisplay from "@/components/elements/PasswordDisplay.vue";
import {onMounted, ref} from "vue";
import {get, set, watchIgnorable} from "@vueuse/core";
import {defaultPasswordOptions, password, passwordToOptions} from "@/lib/password";
import type {PasswordOptions} from "@/lib/password";
import SmallSecondaryButton from "@/components/form/SmallSecondaryButton.vue";
import IconGithub from "@/components/icons/IconGithub.vue";

const passwordText = ref("");

const options = ref<PasswordOptions>({
  ...defaultPasswordOptions
})

function generate() {
  const res = password(get(options));
  passwordTextIgnoreUpdates(() => {
    set(passwordText, res);
  });
}

const { ignoreUpdates: passwordTextIgnoreUpdates } = watchIgnorable(passwordText, (newVal) => {
  const res = passwordToOptions(newVal);

  optionsIgnoreUpdates(() => {
    if (res.length > 0) {
      set(options, res);
    } else {
      set(options, defaultPasswordOptions);
    }
  })
});

const { ignoreUpdates: optionsIgnoreUpdates } = watchIgnorable(options, () => {
  generate();
}, {deep: true});

onMounted(() => {
  generate();
});
</script>
