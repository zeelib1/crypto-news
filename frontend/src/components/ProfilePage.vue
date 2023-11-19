<template>
  <v-card>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
      class="mt-4"
    >
      <v-tab :value="1">Profile</v-tab>
      <v-tab :value="4">News</v-tab>
      <v-tab :value="3">Digital art</v-tab>
      <v-tab :value="2">Regulations</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-alert
          type="warning"
          title="Info"
          text="The feature you're eagerly searching for is almost here! Our team of coding wizards is working their magic behind the scenes to bring you the most incredible functionality. But alas, it's not quite ready for prime time just yet.

So, please sit tight, grab a cup of virtual coffee ☕️, and prepare for the excitement that awaits you in the near future. We promise it'll be worth the wait! 🎉"
        ></v-alert>
      </v-window-item>
      <v-window-item :value="2">
        <v-container fluid class="flex flex-wrap">
          <v-row v-for="article in categories[0].articles" :key="article._id">
            <v-card class="mx-auto" max-width="500" outlined>
              <NewsCard
                :imageUrl="article.image"
                :title="article.title"
                :readMore="article.url"
                :preview="article.preview"
              />
              <v-card-actions>
                <v-btn
                  color="red"
                  @click="removeArticle('News Articles', article._id)"
                  >Remove</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-row>
        </v-container>
      </v-window-item>
      <v-window-item :value="3">
        <v-container fluid>
          <v-alert
            type="success"
            title="Info"
            text="The feature you're eagerly searching for is almost here! Our team of coding wizards is working their magic behind the scenes to bring you the most incredible functionality. But alas, it's not quite ready for prime time just yet.

So, please sit tight, grab a cup of virtual coffee ☕️, and prepare for the excitement that awaits you in the near future. We promise it'll be worth the wait! 🎉"
          ></v-alert>
        </v-container>
      </v-window-item>
      <v-window-item :value="4">
        <v-container fluid>
          <v-alert
            type="success"
            title="Info"
            text="Stay tuned, and keep your eyes peeled for updates. We'll make sure to sound the alert once the feature is unleashed upon the world!

Thank you for your patience and for being an awesome user. We appreciate you! 🙌😄"
          ></v-alert>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import NewsCard from "./NewsCard.vue";

export default {
  name: "Profile",
  components: {
    NewsCard,
  },
  setup() {
    const store = useStore();
    let tab = ref(1);

    onMounted(() => {
      store.dispatch("fetchSavedNews");
    });

    const categories = computed(() => [
      {
        name: "News Articles",
        articles: store.state.savedNews,
      },
      {
        name: "Digital Art Articles",
        articles: store.state.savedDigitalArtArticles,
      },
      {
        name: "Regulations",
        articles: store.state.savedRegulations,
      },
      {
        name: "AI Articles",
        articles: store.state.savedAIArticles,
      },
    ]);

    const removeArticle = (categoryName, articleId) => {
      if (categoryName === "News Articles") {
        store.dispatch("removeNews", articleId);
      } else if (categoryName === "Digital Art Articles") {
        store.dispatch("removeDigitalArtArticle", articleId);
      } else if (categoryName === "Regulations") {
        store.dispatch("removeRegulation", articleId);
      }
    };

    return {
      tab,
      categories,
      removeArticle,
    };
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 16px;
}
</style>
