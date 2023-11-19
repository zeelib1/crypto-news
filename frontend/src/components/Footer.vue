<template>
  <footer class="bg-gray-200 py-4 text-center footer-background">
    <div class="container mx-auto">
      <div class="flex items-center justify-center">
        <v-btn class="text-white-600">
          &copy; {{ currentYear }} Crypto-News. All rights reserved.
        </v-btn>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
<style scoped>
.footer-background {
  background: url("../assets/header-image.jpeg");
}
</style>
