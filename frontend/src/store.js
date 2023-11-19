import { createStore } from "vuex";
import Vuex from "vuex";
import axios from "axios"; // Make sure you import axios
const API_URL = "https://crypto-news-mo9o.onrender.com";

export default createStore({
  state: {
    isLoggedIn: false,
    username: null,
    userId: null,
    savedNews: [],
    savedArticleIds: [], // New state property
  },
  mutations: {
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setUserId(state, userId) {
      // New mutation
      state.userId = userId;
    },
    setSavedNews(state, news) {
      state.savedNews = news;
      state.savedArticleIds = news.map((article) => article._id); // Extract IDs and store in savedArticleIds
    },
    addNews(state, news) {
      state.savedNews.push(news);
      state.savedArticleIds.push(news._id); // Add ID to savedArticleIds
    },
    removeNews(state, newsId) {
      state.savedNews = state.savedNews.filter((news) => news._id !== newsId);
    },
    setSavedDigitalArtArticles(state, articles) {
      state.savedDigitalArtArticles = articles;
    },
    addDigitalArtArticle(state, article) {
      state.savedDigitalArtArticles.push(article);
    },
    removeDigitalArtArticle(state, articleId) {
      state.savedDigitalArtArticles = state.savedDigitalArtArticles.filter(
        (article) => article._id !== articleId
      );
    },
    setSavedRegulations(state, regulations) {
      state.savedRegulations = regulations;
    },
    addRegulation(state, regulation) {
      state.savedRegulations.push(regulation);
    },
    removeRegulation(state, regulationId) {
      state.savedRegulations = state.savedRegulations.filter(
        (regulation) => regulation._id !== regulationId
      );
    },
    addSavedArticleId(state, id) {
      if (!state.savedArticleIds.includes(id)) {
        state.savedArticleIds.push(id);
      }
    },
  },
  actions: {
    // Other actions...
    async fetchSavedNews({ commit }) {
      try {
        // Fetch saved news from server and commit to state
        const response = await axios.get(`${API_URL}/profile`, {
          withCredentials: true,
        });
        commit("setSavedNews", response.data.savedNews);
      } catch (error) {
        console.error("Error fetching saved news:", error);
      }
    },
    async saveNews({ commit, state }, news) {
      // First check if the article is already saved for the current user
      const response = await axios.get(
        `${API_URL}/user/${state.userId}/saved-news/${news._id}`,
        { withCredentials: true }
      );

      // If the article is already saved, return an appropriate message
      if (response.data.isSaved) {
        alert("This article is already saved!");
        return;
      }

      // If not, proceed with saving the article
      const saveResponse = await axios.post(
        `${API_URL}/user/${state.userId}/save-news`,
        news,
        { withCredentials: true }
      );
      commit("addNews", news); // Add news to state directly
    },

    async removeNews({ commit, state }, newsId) {
      // Remove news article from server and commit to state
      const response = await axios.delete(
        `${API_URL}/user/${state.userId}/save-news/${newsId}`,
        { withCredentials: true }
      );
      commit("removeNews", newsId);
    },
    async fetchSavedDigitalArtArticles({ commit }) {
      const response = await axios.get(
        `${API_URL}/profile/digital-art-articles`,
        { withCredentials: true }
      );
      commit(
        "setSavedDigitalArtArticles",
        response.data.savedDigitalArtArticles
      );
    },
    async removeDigitalArtArticle({ commit, state }, articleId) {
      const response = await axios.delete(
        `${API_URL}/user/${state.username}/save-digital-art-articles/${articleId}`,
        { withCredentials: true }
      );
      commit("removeDigitalArtArticle", articleId);
    },
    async fetchSavedRegulations({ commit }) {
      const response = await axios.get(`${API_URL}/profile/regulations`, {
        withCredentials: true,
      });
      commit("setSavedRegulations", response.data.savedRegulations);
    },
    async removeRegulation({ commit, state }, regulationId) {
      const response = await axios.delete(
        `${API_URL}/user/${state.username}/save-regulations/${regulationId}`,
        { withCredentials: true }
      );
      commit("removeRegulation", regulationId);
    },
    async fetchUserProfile({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/profile`, {
          withCredentials: true,
        });
        const { user } = response.data;
        commit("setIsLoggedIn", true);
        commit("setUsername", user.name);
        // ... commit other necessary data to the state
      } catch (error) {
        console.error("An error occurred while fetching user profile:", error);
        // Handle error if needed
      }
    },
  },
  getters: {
    // Other getters...
    username: (state) => state.username,
    userId: (state) => state.userId,
    isLoggedIn: (state) => state.isLoggedIn,
    savedNews: (state) => state.savedNews,
    savedDigitalArtArticles: (state) => state.savedDigitalArtArticles,
    savedRegulations: (state) => state.savedRegulations,
  },
  modules: {},
});
