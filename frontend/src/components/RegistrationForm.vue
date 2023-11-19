<template>
  <div class="flex min-h-screen items-center justify-center">
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent="submitForm">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="10"
                label="Name"
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

            <v-col cols="12" md="12">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-container>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const API_URL = "https://crypto-news-mo9o.onrender.com";

export default {
  setup() {
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");

    const nameRules = [(v) => !!v || "Name is required"];

    const passwordRules = [
      (v) => !!v || "Password is required",
      (v) => v.length >= 8 || "Password must be at least 8 characters",
    ];

    const emailRules = [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ];

    const submitForm = async () => {
      const userData = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      try {
        const response = await axios.post(`${API_URL}/register`, userData, {
          withCredentials: true,
        });

        if (response.data.success) {
          // Registration was successful
          console.log(response.data);
          // Redirecting to login
          await router.push("/login");
        } else {
          // Handle the error, maybe show an error message to the user
          console.error("Registration failed", response.data);
        }
      } catch (error) {
        // Handle the error, maybe show an error message to the user
        console.error("An error occurred while registering", error);
      }
    };

    return {
      name,
      email,
      password,
      nameRules,
      passwordRules,
      emailRules,
      submitForm,
    };
  },
};
</script>
