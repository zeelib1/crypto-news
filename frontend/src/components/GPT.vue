<template>
  <div class="home border-b border-dashed">
    <v-form ref="form" @submit.prevent="handleSubmitPrompt">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="prompt"
              placeholder="Ask me about crypto ..."
              class="mb-2"
              clear-icon="mdi-close-circle"
              clearable
              :rules="rules"
              :error-count="promptDirty ? 1 : 0"
              @click:clear="handleClear"
              ref="textfield"
              @input="promptDirty = true"
              @blur="promptDirty = false"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn
              type="submit"
              :loading="isLoading"
              :disabled="!prompt"
              color="primary"
              class="submit-button mb-4 mr-2"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-else>Submit Prompt</span>
            </v-btn>
            <v-btn @click="handleClear" color="third" class="clear-button mb-4">
              Clear
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="result" class="text-justify">
          <v-col cols="12">
            <h5 class="mb-2 text-lg">Result:</h5>
            <p class="mb-2 text-lg">
              <span class="first-letter">{{ firstLetter }}</span
              >{{ restOfString }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
const API_URL = "https://crypto-news-mo9o.onrender.com";

export default {
  name: "Home",
  setup() {
    const prompt = ref("");
    const isLoading = ref(false);
    const result = ref("");
    const form = ref(null);
    const textfield = ref(null);
    const promptDirty = ref(false);

    const rules = [(value) => !!value || "Prompt is required."];

    const handleSubmitPrompt = () => {
      if (form.value.validate()) {
        isLoading.value = true;
        axios
          .post(`${API_URL}/api/chat`, { prompt: prompt.value })
          .then((response) => {
            console.log(response);
            result.value = response.data;
            isLoading.value = false;
          })
          .catch((error) => {
            console.error(error);
            isLoading.value = false;
          });
      }
    };

    const handleClear = () => {
      prompt.value = "";
      result.value = "";
      form.value.reset(); // Reset validation
    };

    const firstLetter = computed(() => result.value.charAt(0));
    const restOfString = computed(() => result.value.slice(1));

    return {
      prompt,
      isLoading,
      result,
      handleSubmitPrompt,
      handleClear,
      form,
      textfield,
      rules,
      promptDirty,
      firstLetter,
      restOfString,
    };
  },
};
</script>

<style scoped>
.first-letter {
  font-size: 3.5em;
  font-weight: bold;
}
</style>
