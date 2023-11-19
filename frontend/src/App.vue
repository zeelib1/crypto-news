<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";
const API_URL = "https://crypto-news-mo9o.onrender.com";

export default {
  name: "App",
  setup() {
    const store = useStore();

    const getUserProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile`, {
          withCredentials: true,
        });
        if (response.data) {
          store.commit("setIsLoggedIn", true);
          store.commit("setUsername", response.data.user.name); // Change made here
          store.commit("setUserId", response.data.user._id); // <-- Add user ID here
          store.dispatch("fetchSavedNews"); // Fetch saved news
        }
      } catch (err) {
        console.error("An error occurred:", err);
        store.commit("setIsLoggedIn", false);
        store.commit("setUsername", null);
      }
    };

    onMounted(getUserProfile);
  },
};
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
