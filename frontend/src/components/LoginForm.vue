<template>
  <div class="flex min-h-screen items-center justify-center">
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent="submitForm">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :counter="10"
                label="Password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn type="submit" block class="mt-2">Submit</v-btn>
          <p v-if="isSubmitFailed" class="text-red-500">
            Invalid input. Please try again.
          </p>

          <!-- Button to return to homepage without logging in -->
          <v-btn @click="returnToHomepage" block class="mt-2"
            >Return to Homepage</v-btn
          >
        </v-container>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const API_URL = "https://crypto-news-mo9o.onrender.com";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const email = ref("");
    const password = ref("");
    const isSubmitFailed = ref(false);

    const emailRules = [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ];

    const passwordRules = [(v) => !!v || "Password is required"];

    const submitForm = async () => {
      const userData = {
        email: email.value,
        password: password.value,
      };

      try {
        const response = await axios.post(`${API_URL}/login`, userData, {
          withCredentials: true,
        });

        if (response.data.message === "Authentication successful.") {
          // Call Vuex mutations to update the store
          store.commit("setIsLoggedIn", true);
          store.commit("setUsername", response.data.user.name); // Replace with actual property
          store.commit("setUserId", response.data.user._id); // New mutation for setting userId
          await router.push("/");
          isSubmitFailed.value = false;
        } else {
          console.error("Login failed", response.data);
          isSubmitFailed.value = true;
        }
      } catch (error) {
        console.error("An error occurred while logging in", error);
        isSubmitFailed.value = true;
      }
    };

    const returnToHomepage = () => {
      router.push("/");
    };

    return {
      email,
      password,
      emailRules,
      passwordRules,
      submitForm,
      isLoggedIn: store.state.isLoggedIn,
      username: store.state.username,
      returnToHomepage,
      isSubmitFailed,
    };
  },
};
</script>
