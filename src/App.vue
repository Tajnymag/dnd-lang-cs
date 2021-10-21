<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import { useTranslator } from "./translator";
import ReloadPrompt from './ReloadPrompt.vue'

const translator = useTranslator();

const direction = reactive<{from: 'cs' | 'dnd', to: 'cs' | 'dnd'}>({
  from: 'cs',
  to: 'dnd'
});

const inputText = ref('');
const outputText = ref('');

const swapDirection = () => {
  const { from: newTo, to: newFrom } = direction;
  direction.from = newFrom;
  direction.to = newTo;

  inputText.value = outputText.value;
}

watchEffect(() => {
  translator.translate(inputText.value, { from: direction.from, to: direction.to }).then(translatedText => outputText.value = translatedText);
});
</script>

<template>
  <div class="container h-100">
    <div class="row">
      <div class="col"/>
      <div class="col-auto text-auto">
        <span style="min-width: 3ch; display: inline-block">{{ direction.from }}</span>
        <button class="btn" @click="swapDirection">
          <i class="bi-arrow-left-right"></i>
        </button>
        <span style="min-width: 3ch; display: inline-block">{{ direction.to }}</span>
      </div>
      <div class="col"/>
    </div>

    <div class="row h-50">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <textarea class="form-control h-100" v-model="inputText"></textarea>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-control h-100" readonly>
          <span v-if="outputText">
            {{ outputText }}
          </span>
          <span v-else>
            překlad
          </span>
        </div>
      </div>
    </div>
  </div>

  <ReloadPrompt/>
</template>

<style>
html, body, #app {
  height: 100%;
}
</style>
