<template>
  <div class="max-w-md mx-auto shadow-md overflow-hidden m-4 rounded-none">
    <img
      :src="imageUrl"
      alt="News image"
      class="object-cover object-center h-full w-full"
    />
    <div class="p-8">
      <div
        class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
      >
        {{ title }}
      </div>
      <p class="mt-2 text-gray-500">{{ preview }}</p>
      <div class="mt-2">
        <a
          :href="readMore"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline"
          >Read more</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
    readMore: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
