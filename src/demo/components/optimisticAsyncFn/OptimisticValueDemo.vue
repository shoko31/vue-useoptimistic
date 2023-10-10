<template>
  <div class="optimistic-value-demo">
    <ApiResult :status="apiStatus" />
    <LikeButtonCard
      class="demo-component optimistic-demo"
      @click="optimisticLikeDislike()"
      :liked="optimisticValue.hasLiked"
      :number-of-likes="optimisticValue.numberOfLikes"
      >Optimistic:</LikeButtonCard
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { serverLike } from "../LikeApi";
import { useOptimisticAsyncFn } from "../../../main";
import ApiResult from "../shared/ApiResult.vue";
import LikeButtonCard from "../shared/LikeButtonCard.vue";

const apiStatus = ref<undefined | "success" | "error" | "running">(undefined);

const { optimisticValue } = useOptimisticAsyncFn(
  { hasLiked: false as boolean, numberOfLikes: 5 },
  (_, resolve, reject, isCancelled) => {
    apiStatus.value = "running";

    serverLike(optimisticValue.value.hasLiked)
      .then((result) => {
        if (!isCancelled()) {
          resolve({
            hasLiked: result.liked,
            numberOfLikes: result.numberOfLikes,
          });
          apiStatus.value = "success";
        }
      })
      .catch((e) => {
        if (!isCancelled()) {
          apiStatus.value = "error";
          reject(e);
        }
      });
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

<style lang="scss" scoped></style>
