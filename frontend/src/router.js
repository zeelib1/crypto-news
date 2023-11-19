import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";
import LoginForm from "./components/LoginForm.vue";
import RegistrationForm from "./components/RegistrationForm.vue";
import NewsPage from "./components/NewsPage.vue";
import ProfilePage from "./components/ProfilePage.vue";

const routes = [
  { path: "/login", component: LoginForm, name: "login" },
  { path: "/register", component: RegistrationForm, name: "register" },
  { path: "/news", component: NewsPage, name: "news" },
  { path: "/btc", component: NewsPage, name: "btc" },
  { path: "/eth", component: NewsPage, name: "eth" },
  { path: "/matic", component: NewsPage, name: "matic" },
  { path: "/", component: HomePage, name: "homepage" },
  { path: "/profile-page", component: ProfilePage, name: "profile-page" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
