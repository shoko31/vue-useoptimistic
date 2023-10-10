<template>
  <ApiResult :status="apiStatus" />
  <div class="demo-components">
    <LikeButtonCard
      class="demo-component optimistic-demo"
      @click="optimisticLikeDislike()"
      :liked="optimisticValue.hasLiked"
      :number-of-likes="optimisticValue.numberOfLikes"
      >Optimistic:</LikeButtonCard
    >
    <LikeButtonCard
      class="demo-component regular-demo"
      @click="optimisticLikeDislike()"
      :liked="value.hasLiked"
      :number-of-likes="value.numberOfLikes"
      :disabled="apiStatus === 'running'"
      >Regular:</LikeButtonCard
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { serverLike } from "./LikeApi";
import { useOptimisticAsyncFn } from "../../main";
import ApiResult from "./shared/ApiResult.vue";
import LikeButtonCard from "./shared/LikeButtonCard.vue";

const apiStatus = ref<undefined | "success" | "error" | "running">(undefined);

const { value, optimisticValue } = useOptimisticAsyncFn(
  { hasLiked: false as boolean, numberOfLikes: 5 },
  (resolve, reject) => {
    let isCancelled = false;
    apiStatus.value = "running";

    serverLike(optimisticValue.value.hasLiked, 0)
      .then((newLikeCount) => {
        if (!isCancelled) {
          resolve({
            hasLiked: optimisticValue.value.hasLiked,
            numberOfLikes: newLikeCount,
          });
          apiStatus.value = "success";
        }
      })
      .catch((e) => {
        apiStatus.value = "error";
        reject(e);
      });

    return {
      cancel: () => {
        isCancelled = true;
      },
    };
  }
);

function optimisticLikeDislike() {
  const willLike = !optimisticValue.value.hasLiked;
  optimisticValue.value = {
    hasLiked: willLike,
    numberOfLikes: optimisticValue.value.numberOfLikes + (willLike ? 1 : -1),
  };
}
</script>

<style scoped>
img {
  height: 64px;
  width: 64px;
}

.demo-components {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 30px;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
}
</style>
