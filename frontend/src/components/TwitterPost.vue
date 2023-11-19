<template>
  <div class="tweet-carousel">
    <transition-group name="fade" tag="div">
      <div v-for="id in tweetIds" :key="id" v-show="currentTweetId === id">
        <blockquote class="twitter-tweet">
          <a :href="'https://twitter.com/user/status/' + id"></a>
        </blockquote>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tweetIds: [
        "1483552691171127299", // Replace with your actual tweet IDs
        "1641910122485104640",
        "1660696405525278722",
        // ...
      ],
      currentTweetIndex: 0,
    };
  },
  computed: {
    currentTweetId() {
      return this.tweetIds[this.currentTweetIndex];
    },
  },
  mounted() {
    this.startAutoplay();
    this.adjustHeight();
    if (typeof twttr !== "undefined") {
      twttr.widgets.load();
    }
  },
  methods: {
    startAutoplay() {
      setInterval(() => {
        this.currentTweetIndex =
          (this.currentTweetIndex + 1) % this.tweetIds.length;
        this.adjustHeight();
        this.$nextTick(() => twttr.widgets.load());
      }, 5000);
    },
    adjustHeight() {
      this.$nextTick(() => {
        const activeTweet = this.$el.querySelector(
          ".tweet-carousel > div > blockquote"
        );
        if (activeTweet) {
          this.$el.querySelector(
            ".tweet-carousel"
          ).style.height = `${activeTweet.offsetHeight}px`;
        }
      });
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.tweet-carousel {
  position: relative;
}
</style>
