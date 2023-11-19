<template>
  <div>
    <h1>Cryptocurrency Price Fetcher</h1>
    <v-select
      v-model="selectedPair"
      :items="pairs"
      label="Select a trading pair"
      @input="fetchPrice"
    ></v-select>
    <div v-if="price">
      <h2>Current Price:</h2>
      <p>{{ price }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "https://crypto-news-mo9o.onrender.com";

export default {
  data() {
    return {
      pairs: ["MATICUSDT", "ETHUSDT", "XRPUSDT"],
      selectedPair: null,
      price: null,
    };
  },
  methods: {
    async fetchPrice() {
      if (!this.selectedPair) return;
      try {
        const response = await axios.get(
          `${API_URL}/api/prices/${this.selectedPair}`
        );
        this.price = response.data.price;
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    },
  },
  watch: {
    selectedPair() {
      this.fetchPrice();
    },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
