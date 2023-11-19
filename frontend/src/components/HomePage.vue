<template>
  <!-- Header -->
  <Header class="w-full" />
  <PriceCarousel class="mt-4" />

  <!-- Main Area and Sidebar -->
  <div class="flex h-full min-h-screen w-full flex-col lg:flex-row">
    <!-- Main Area -->
    <main class="flex flex-col px-4 sm:w-full md:flex-row lg:w-2/3">
      <div class="first-col xlg:w-full mt-4 md:w-1/2">
        <div class="bg-purple-400 text-center text-white">Latest news</div>
        <TabCrypto @updateNewsData="handleNewsDataUpdate" />
      </div>

      <v-divider
        :thickness="3"
        class="mx-4 mt-4 border-opacity-50"
        color="success"
        vertical
      ></v-divider>

      <div class="second-column xlg:w-full mt-4 md:w-1/2">
        <div class="bg-purple-400 text-center text-white">
          Q&A/Tweets/Regulations
        </div>
        <GPT />
        <v-card>
          <v-tabs color="deep-purple-accent-4" align-tabs="left">
            <v-tab :value="1">Editor's Choice </v-tab>
          </v-tabs>
        </v-card>
        <TwitterPost />

        <div class="bg-purple-400 text-center text-white">Regulation</div>
        <RegulationsNews
          v-for="(news, index) in regulationsData"
          :key="index"
          :imageUrl="news.image"
          :title="news.title"
          :preview="truncateText(news.preview, 15)"
          :readMore="news.readMore"
          :_id="news._id"
        />
      </div>

      <v-divider
        :thickness="3"
        class="mx-4 mt-4 border-opacity-50"
        color="success"
        vertical
      ></v-divider>
    </main>

    <!-- Sidebar -->
    <aside class="mt-4 min-h-screen pr-4 sm:w-full md:w-full lg:w-1/3">
      <div class="bg-purple-400 text-center text-white">Digital art</div>
      <v-list lines="three">
        <v-list-item
          v-for="item in NFTData"
          :key="item.title"
          :prepend-avatar="item.image"
          class="border-b border-dashed"
        >
          <a :href="item.readMore" target="_blank">
            {{ item.title }}
          </a>
        </v-list-item>
      </v-list>
    </aside>
  </div>

  <!-- Footer -->
  <Footer class="w-full" />
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
import NewsCard from "./NewsCard.vue";
import Prices from "./Prices.vue";
import PriceCarousel from "./PriceCarousel.vue";
import GPT from "./Gpt.vue";
import TwitterPost from "./TwitterPost.vue";
import RegulationsNews from "./RegulationsNews.vue";
import Footer from "./Footer.vue";
import TabCrypto from "./TabCrypto.vue";
import { v4 as uuidv4 } from "uuid";
const id = uuidv4();
const API_URL = "https://crypto-news-mo9o.onrender.com";

export default {
  name: "HomePage",
  components: {
    Header,
    NewsCard,
    Prices,
    PriceCarousel,
    GPT,
    TwitterPost,
    RegulationsNews,
    Footer,
    TabCrypto,
  },
  data() {
    return {
      newsData: [],
      tickerData: [],
      NFTData: [],
      regulationsData: [],
      window: 0, // Assuming you have a 'window' property
    };
  },
  mounted() {
    const apiUrl = `${API_URL}/api/news`;
    const apiNFT = `${API_URL}/api/nft`;
    const apiRegulations = `${API_URL}/api/regulations`;

    axios
      .get(apiUrl)
      .then((response) => {
        this.newsData = response.data;
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
    axios
      .get(apiNFT)
      .then((response) => {
        this.NFTData = response.data;
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
    axios.get(apiRegulations).then((response) => {
      const newData = response.data.map((item) => ({
        ...item,
      }));
      this.regulationsData = newData;
      // console.log(this.regulationsData);
    });

    //     axios.get('http://localhost:5001/profile')
    // .then(response => {
    //   console.log(response); // User's profile information
    // })
    // .catch(error => {
    //   console.error(error);
    // });
  },
  methods: {
    truncateText(text, maxWords) {
      const words = text.split(" ");
      if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + "...";
      }
      return text;
    },
    handleNewsDataUpdate(newData) {
      this.tickerData = newData;
    },
  },
  // async created() {
  //   try {
  //     const response = await axios.get('http://localhost:5001/isLoggedIn', { withCredentials: true });

  //     this.isLoggedIn = response.data.isLoggedIn;
  //     this.username = response.data.username;
  //   } catch (error) {
  //     console.error('An error occurred while checking if user is logged in', error);
  //   }
  // },
};
</script>

<style scoped>
#app > div > div > div {
  padding: 1em !important;
}
.v-carousel .v-carousel__controls .v-btn {
  background-color: transparent;
}

/* Adjust the styles for mobile responsiveness */
@media (max-width: 767px) {
  .flex-col-reverse {
    flex-direction: column-reverse;
  }
}
.v-card {
  height: max-content !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  box-shadow: none !important;
}
.my-font {
  font-family: "Roboto Mono", monospace;
}
</style>
