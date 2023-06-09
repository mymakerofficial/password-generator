<template>
  <main>
    <Container>
      <FlexVertical>
        <FlexHorizontal between class="px-6">
          <h1 class="text-md text-gray-500 dark:text-gray-300 font-medium">Simple Password</h1>
          <SmallSecondaryButton href="https://github.com/mymakerofficial/password-generator" target="_blank"><IconGithub class="h-5"/>Star on GitHub</SmallSecondaryButton>
        </FlexHorizontal>
        <PasswordDisplay v-model:password-text="passwordText" />
        <OptionsPanel
          v-model:type="type"
          v-model:password-options="passwordOptions"
          v-model:passphrase-options="passphraseOptions"
          @generate="generate"
        />
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
import {onMounted, ref, watch} from "vue";
import {get, set, useStorage, watchIgnorable} from "@vueuse/core";
import {
  defaultPassphraseOptions,
  defaultPasswordOptions,
  generatePassword,
  passwordToOptions,
  PasswordType, generatePassphrase
} from "@/lib/generatePassword";
import type {PasswordOptions, PassphraseOptions} from "@/lib/generatePassword";
import SmallSecondaryButton from "@/components/form/SmallSecondaryButton.vue";
import IconGithub from "@/components/icons/IconGithub.vue";
import {useRouteQuery} from "@vueuse/router";

const passwordText = ref("");

const type = ref<PasswordType>(PasswordType.Password);
const passwordOptions = ref<PasswordOptions>(defaultPasswordOptions);
const passphraseOptions = ref<PassphraseOptions>(defaultPassphraseOptions);

// sync with local storage
// listen... i know there is an easier way to do this, but the easier way doesn't work with ignorable watchers

// so we make refs that are gonna be synced with local storage
const typeStorage = ref(get(type));
const passwordOptionsStorage = ref(get(passwordOptions));
const passphraseOptionsStorage = ref(get(passphraseOptions));

// and then we sync them
// use storage will use the values as defaults and merges them with the local storage value
useStorage("passwordType", typeStorage);
useStorage("passwordOptions", passwordOptionsStorage);
useStorage("passphraseOptions", passphraseOptionsStorage);

// set the normal refs to the local storage values
set(type, get(typeStorage));
set(passwordOptions, get(passwordOptionsStorage));
set(passphraseOptions, get(passphraseOptionsStorage));

// we watch for changes in the normal refs and set the local storage values. don't forget to do deep otherwise it won't work
watch(type, () => {
  set(typeStorage, get(type));
});
watch(passwordOptions, () => {
  set(passwordOptionsStorage, get(passwordOptions));
}, {deep: true});
watch(passphraseOptions, () => {
  set(passphraseOptionsStorage, get(passphraseOptions));
}, {deep: true});

const resetOptions = useRouteQuery('reset');

if (get(resetOptions) === 'true') {
  set(passwordOptions, defaultPasswordOptions);
  set(passphraseOptions, defaultPassphraseOptions);
}

function generate() {
  let res = '';

  if(get(type) === PasswordType.Password) {
    res = generatePassword(get(passwordOptions));
  } else {
    res = generatePassphrase(get(passphraseOptions));
  }

  // we set the password text in a ignoreUpdates block to prevent an infinite loop
  passwordTextIgnoreUpdates(() => {
    set(passwordText, res);
  });
}

const { ignoreUpdates: passwordTextIgnoreUpdates } = watchIgnorable(passwordText, (newVal) => {
  // getting options from password text is only supported for passwords, for now
  if (get(type) === PasswordType.Passphrase) {
    return;
  }

  const res = passwordToOptions(newVal);

  // we set the options in a ignoreUpdates block to prevent an infinite loop
  optionsIgnoreUpdates(() => {
    if (res.length > 0) {
      set(passwordOptions, res);
    } else {
      // if the given password is empty, use the default options
      set(passwordOptions, defaultPasswordOptions);
    }
  })
});

// when the options change, we want to generate a new password
const { ignoreUpdates: optionsIgnoreUpdates } = watchIgnorable([passwordOptions, passphraseOptions, type], () => {
  generate();
}, {deep: true});

onMounted(() => {
  generate();
});
</script>
