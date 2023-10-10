<template>
  <div class="optimistic-value-demo">
    <ApiResult :status="apiStatus" />
    <LikeButtonCard
      @click="optimisticLike()"
      :liked="hasLikedOptimistic"
      :number-of-likes="numberOfLikesOptimistic"
      :disabled="hasLikedOptimistic"
      dislike-text="You already liked this!"
      class="demo-component optimistic-demo"
      >Optimistic:</LikeButtonCard
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { serverLike } from "../LikeApi";
import { useOptimisticValue as useOptimistic } from "../../../main";
import LikeButtonCard from "../shared/LikeButtonCard.vue";
import ApiResult from "../shared/ApiResult.vue";

const hasLiked = ref(false);
const hasLikedOptimistic = useOptimistic(hasLiked);

const numberOfLikes = ref(5);
const numberOfLikesOptimistic = useOptimistic(numberOfLikes);

const apiStatus = ref<undefined | "success" | "error" | "running">(undefined);

async function optimisticLike() {
  if (hasLikedOptimistic.value) return; // Prevents multiple like
  hasLikedOptimistic.value = true; // Expected value
  numberOfLikesOptimistic.value += 1;
  apiStatus.value = "running";
  try {
    const result = await serverLike();
    hasLiked.value = result.liked;
    numberOfLikes.value = result.numberOfLikes;
    numberOfLikesOptimistic.value = result.numberOfLikes;
    apiStatus.value = "success";
  } catch {
    numberOfLikesOptimistic.value = numberOfLikes.value;
    hasLikedOptimistic.value = false;
    apiStatus.value = "error";
  }
}
</script>

<style lang="scss" scoped></style>
