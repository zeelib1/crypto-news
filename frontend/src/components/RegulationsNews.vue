<template>
  <div class="m-4 overflow-hidden rounded-none shadow-md">
    <div
      v-if="isLoggedIn && !isArticleSaved"
      @click="saveArticle"
      class="cursor-pointer"
    >
      <i class="pi pi-star"></i>
    </div>
    <img
      :src="imageUrl"
      alt="News image"
      class="h-full w-full object-cover object-center"
    />
    <div class="p-8">
      <div
        class="text-sm font-semibold uppercase tracking-wide text-indigo-500"
      >
        {{ title }}
      </div>
      <p class="mt-2 text-gray-500">{{ preview }}</p>
      <div class="mt-2">
        <a
          :href="readMore"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline"
          >Read more</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
const API_URL = "https://crypto-news-mo9o.onrender.com";

const props = defineProps({
  imageUrl: String,
  title: String,
  preview: String,
  readMore: String,
  _id: String,
});

let isArticleSaved = ref(false);
const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const userId = computed(() => store.getters.userId);

watch(userId, checkArticleSaved);
watch(props._id, checkArticleSaved);

onMounted(async () => {
  try {
    const response = await axios.get(
      `${API_URL}/user/${userId.value}/saved-news/${props._id}`
    );
    isArticleSaved.value = response.data.isSaved;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

async function saveArticle() {
  try {
    await axios.post(`${API_URL}/user/${userId.value}/save-news`, {
      image: props.imageUrl,
      title: props.title,
      preview: props.preview,
      url: props.readMore,
      _id: props._id,
    });
    isArticleSaved.value = true;
    alert("Article saved!");
  } catch (error) {
    console.error(`Error: ${error}`);
    if (error.response && error.response.data && error.response.data.message) {
      alert(`Error: ${error.response.data.message}`);
    } else {
      alert("An error occurred while saving the article.");
    }
  }
}

async function checkArticleSaved() {
  try {
    const response = await axios.get(
      `${API_URL}/user/${userId.value}/saved-news/${props._id}`
    );
    isArticleSaved.value = response.data.isSaved;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
</script>

<style scoped>
.full-width {
  width: 100% !important;
}
</style>
