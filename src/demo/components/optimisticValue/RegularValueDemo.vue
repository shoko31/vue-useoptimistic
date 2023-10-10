<template>
  <div class="optimistic-value-demo">
    <ApiResult :status="apiStatus" />
    <LikeButtonCard
      @click="regularLike()"
      :liked="hasLiked"
      :number-of-likes="numberOfLikes"
      :disabled="apiStatus === 'success' || apiStatus === 'running'"
      dislike-text="You already liked this!"
      class="demo-component regular-demo"
      >Regular:</LikeButtonCard
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { serverLike } from "../LikeApi";
import LikeButtonCard from "../shared/LikeButtonCard.vue";
import ApiResult from "../shared/ApiResult.vue";

const hasLiked = ref(false);
const numberOfLikes = ref(5);

const apiStatus = ref<undefined | "success" | "error" | "running">(undefined);

async function regularLike() {
  if (
    hasLiked.value ||
    apiStatus.value === "success" ||
    apiStatus.value === "running"
  )
    return; // Prevents multiple like
  apiStatus.value = "running";
  try {
    const result = await serverLike();
    hasLiked.value = result.liked;
    numberOfLikes.value = result.numberOfLikes;
    apiStatus.value = "success";
  } catch {
    apiStatus.value = "error";
  }
}
</script>

<style lang="scss" scoped></style>
