<template>
  <div class="optimistic-value-demo">
    <ApiResult :status="apiStatus" />
    <LikeButtonCard
      class="demo-component regular-demo"
      @click="regularLikeDislike()"
      :liked="value.hasLiked"
      :number-of-likes="value.numberOfLikes"
      :disabled="apiStatus === 'running'"
      >Regular:</LikeButtonCard
    >
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { serverLike } from "../LikeApi";
import ApiResult from "../shared/ApiResult.vue";
import LikeButtonCard from "../shared/LikeButtonCard.vue";

const apiStatus = ref<undefined | "success" | "error" | "running">(undefined);

const value = reactive({ hasLiked: false as boolean, numberOfLikes: 5 });

async function regularLikeDislike() {
  apiStatus.value = "running";
  try {
    const result = await serverLike(!value.hasLiked);
    value.hasLiked = result.liked;
    value.numberOfLikes = result.numberOfLikes;
    apiStatus.value = "success";
  } catch {
    apiStatus.value = "error";
  }
}
</script>

<style lang="scss" scoped></style>
