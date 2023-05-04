<template>
  <main>
    <Container class="flex flex-col gap-6 justify-center h-screen">
      <Card>
        <div class="flex flex-row gap-3">
          <input class="text-2xl bg-transparent text-gray-100 w-full" type="text" v-model="passwordText" />
          <button @click="copy(passwordText)" class="text-green-300">Copy!</button>
        </div>
      </Card>
      <Card class="flex flex-col gap-6">
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-3">
            <div class="flex flex-row gap-3 justify-between items-center">
              <label for="length">Character Length</label>
              <span class="text-green-300">{{ options.length }}</span>
            </div>
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
          </div>
          <div class="flex flex-row gap-3">
            <input type="checkbox" id="includeUppercase" v-model="options.includeUppercase" />
            <label for="includeUppercase">Include Uppercase</label>
          </div>
          <div class="flex flex-row gap-3">
            <input type="checkbox" id="includeLowercase" v-model="options.includeLowercase" />
            <label for="includeLowercase">Include Lowercase</label>
          </div>
          <div class="flex flex-row gap-3">
            <input type="checkbox" id="includeNumbers" v-model="options.includeNumbers" />
            <label for="includeNumbers">Include Numbers</label>
          </div>
          <div class="flex flex-row gap-3">
            <input type="checkbox" id="includeSymbols" v-model="options.includeSymbols" />
            <label for="includeSymbols">Include Symbols</label>
          </div>
        </div>
        <div>
          <StrengthDisplay :password-text="passwordText" />
        </div>
        <div>
          <LargePrimaryButton @click="generate">Generate</LargePrimaryButton>
        </div>
      </Card>
    </Container>
  </main>
</template>

<script setup lang="ts">
import Card from "@/components/generic/GenericCard.vue";
import Container from "@/components/generic/WidthContainer.vue";
import StrengthDisplay from "@/components/password/StrengthDisplay.vue";
import {onMounted, reactive, ref} from "vue";
import LargePrimaryButton from "@/components/form/LargePrimaryButton.vue";
import {set, useClipboard} from "@vueuse/core";
import {generatePassword} from "@/lib/generatePassword";
import type {GeneratePasswordOptions} from "@/lib/generatePassword";

const passwordText = ref("");

const { copy } = useClipboard();

const options = reactive<GeneratePasswordOptions>({
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
})

function generate() {
  const res = generatePassword(options);
  set(passwordText, res)
}

onMounted(() => {
  generate();
});
</script>
