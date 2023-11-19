<template>
  <div
    class="header-background flex items-center px-2 py-1 text-sm sm:text-base lg:px-4 lg:py-4"
  >
    <div class="ml-auto">
      <router-link
        v-if="!isLoggedIn"
        to="/login"
        class="mr-4 mt-4 block text-purple-300 hover:text-purple-400 sm:mt-0 sm:inline-block"
      >
        <v-btn>Login</v-btn>
      </router-link>
      <router-link
        v-if="!isLoggedIn"
        to="/register"
        class="mt-4 block text-purple-300 hover:text-purple-400 sm:mt-0 sm:inline-block"
      >
        <v-btn>Register</v-btn>
      </router-link>
      <template v-if="isLoggedIn && username !== null">
        <v-btn class="mr-4"> Hello, {{ username }}!</v-btn>
      </template>
      <template v-else> </template>
      <v-btn class="" v-if="isLoggedIn" @click="logout">Logout</v-btn>
      <router-link
        v-if="isLoggedIn"
        to="/profile-page"
        class="ml-4 mr-4 mt-4 block text-purple-300 hover:text-purple-400 sm:mt-0 sm:inline-block"
      >
        <v-btn>Profile</v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const API_URL = "https://crypto-news-mo9o.onrender.com";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const isLoggedIn = computed(() => store.state.isLoggedIn);
    const username = computed(() => store.state.username);
    const isNavBarOpen = ref(false);

    const logout = async () => {
      try {
        await axios.get(`${API_URL}/logout`, {
          withCredentials: true,
        });
        store.commit("setIsLoggedIn", false);
        store.commit("setUsername", null);
        // await router.push('/login');
      } catch (error) {
        console.error("An error occurred while logging out:", error);
        // Handle error if needed
      }
    };

    onMounted(async () => {
      try {
        if (isLoggedIn.value) {
          await store.dispatch("fetchUserProfile");
        }
      } catch (error) {
        console.error("An error occurred while fetching user profile:", error);
        // Handle error if needed
      }
    });

    return {
      isLoggedIn,
      username,
      isNavBarOpen,
      logout,
    };
  },
};
</script>

<style scoped>
.header-background {
  background-image: url("../assets/header-image.jpeg");
  background-size: auto;
  background-position: center;
  background-size: 100%;
}
</style>
