<template>
  <div class="marquee" v-if="!loading">
    <div
      class="marquee-content"
      :style="{ 'animation-duration': `${prices.length * 10}s` }"
    >
      <div
        v-for="(price, i) in [...prices, ...prices]"
        :key="i"
        class="carousel-item"
        ref="carouselItem"
      >
        <div class="border p-1">
          <span class="mr-2 text-black">{{ price.symbol.toUpperCase() }}:</span>
          <span
            :class="{
              'bg-green-400 text-white': price.price_change_24h > 0,
              'bg-red-400 text-white': price.price_change_24h < 0,
            }"
            class="mr-1 p-1"
            >{{ parseFloat(price.price).toFixed(2) }}$</span
          >
          <span
            :class="{
              'text-green-500': price.price_change_24h > 0,
              'text-red-500': price.price_change_24h < 0,
            }"
            class="p-1"
            >{{ parseFloat(price.price_change_24h).toFixed(2) }}%</span
          >
          <span
            :class="{
              'text-green-500': price.price_change_24h > 0,
              'text-red-500': price.price_change_24h < 0,
            }"
            class="p-1"
          >
            {{ price.price_change_24h > 0 ? "↑" : "↓" }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  position: relative;
  display: flex;
}

.marquee-content {
  display: flex;
  animation-name: marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.carousel-item {
  flex-shrink: 0;
  width: 3%;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>

<script>
import axios from "axios";
const API_URL = "https://crypto-news-mo9o.onrender.com";

export default {
  data() {
    return {
      originalPrices: [],
      prices: [],
      loading: true,
    };
  },
  async created() {
    try {
      const response = await axios.get(`${API_URL}/api/live-prices`);
      if (response.data && Array.isArray(response.data)) {
        this.originalPrices = response.data;
        // Clone the first few items and append them to the end of the list
        this.prices = [
          ...this.originalPrices,
          ...this.originalPrices.slice(0, 5),
        ];
      } else {
        console.error("Received invalid data from API");
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    } finally {
      this.loading = false;
    }
  },
  watch: {
    prices() {
      this.calculateCarouselItemsWidth();
    },
  },
  methods: {
    calculateCarouselItemsWidth() {
      let totalItemsWidth = 0;
      this.$nextTick(() => {
        const carouselItems = this.$refs.carouselItem;
        if (carouselItems) {
          // Check if carouselItems is defined
          for (let i = 0; i < carouselItems.length; i++) {
            totalItemsWidth += carouselItems[i].offsetWidth;
          }
          this.totalItemsWidth = totalItemsWidth;
        } else {
          console.error("carouselItems is not defined");
        }
      });
    },
    handleScroll(event) {
      if (
        event.target.scrollLeft >=
        this.originalPrices.length * this.itemWidth
      ) {
        // If it reaches the cloned items, silently switch back to the start of the original list
        event.target.scrollLeft = 0;
      }
    },
  },
};
</script>
