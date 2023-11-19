<template>
  <v-card>
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab :value="'BTC'">BTC</v-tab>
      <v-tab :value="'ETH'">ETH</v-tab>
      <v-tab :value="'MATIC'">MATIC</v-tab>
    </v-tabs>
    <v-list lines="three">
      <v-list-item
        v-for="item in newsData"
        :key="item.title"
        class="border-b border-dashed"
      >
        <v-list-item-avatar>
          <img :src="item.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.preview }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn :href="item.readMore" target="_blank" class="mb-2 mt-2">
            Read more
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import axios from "axios";
const API_URL = "https://crypto-news-mo9o.onrender.com";

export default {
  data: () => ({
    tab: "BTC",
    newsData: [],
  }),
  watch: {
    tab: {
      immediate: true,
      handler(newVal) {
        this.fetchNews(newVal);
      },
    },
  },
  methods: {
    async fetchNews(symbol) {
      try {
        const response = await axios.get(`${API_URL}/api/ticker/${symbol}`);
        this.newsData = response.data;
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    },
  },
};
</script>
