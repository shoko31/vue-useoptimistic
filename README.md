# vue-useoptimistic
Vue3 optimistic values' hook, Inspired by react useOptimistic hook

[Demo](https://shoko31.github.io/vue-useoptimistic/)

# Install

`npm install vue-useoptimistic`

# Usage

## OptimisticValue

```vue
<template>
  <div class="optimistic-value-demo">
    <LikeButtonCard
      @click="optimisticLike()"
      :liked="hasLikedOptimistic"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { likeContent } from "../api";
import { useOptimisticValue } from "vue-useoptimistic";
import LikeButtonCard from "./LikeButtonCard.vue";

const hasLiked = ref(false);
const hasLikedOptimistic = useOptimisticValue(hasLiked);

async function optimisticLike() {
  if (hasLikedOptimistic.value) return; // Prevents multiple like
  hasLikedOptimistic.value = true; // Expected value
  try {
    const result = await likeContent(); // Call to API (could fail or take some time depending on network)
    hasLiked.value = result.liked; // Original value change will update optimisticValue too
  } catch {
    // Api failed, reverting to original value
    hasLikedOptimistic.value = false;
  }
}
</script>

<style lang="scss" scoped></style>
```

## OptimisticAsyncFn

OptimisticAsyncFn works in a similar way with OptimisticValue but allows you to have more controls over the behavior and data.

```vue
<template>
  <div class="optimistic-value-demo">
    <LikeButtonCard
      class="demo-component optimistic-demo"
      @click="optimisticLikeDislike()"
      :liked="optimisticValue.hasLiked"
      :number-of-likes="optimisticValue.numberOfLikes"
      />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { likeDislikeContent } from "../api";
import { useOptimisticAsyncFn } from "../../../main";
import LikeButtonCard from "./LikeButtonCard.vue";

const { optimisticValue, value } = useOptimisticAsyncFn(
  { hasLiked: false as boolean, numberOfLikes: 5 },
  (_, resolve, reject, isCancelled) => {

    likeDislikeContent(optimisticValue.value.hasLiked)
      .then((result) => {
        if (!isCancelled()) {
          resolve({
            hasLiked: result.liked,
            numberOfLikes: result.numberOfLikes,
          });
        }
      })
      .catch((e) => {
        if (!isCancelled()) {
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
```
