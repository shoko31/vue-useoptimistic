<template>
  <div class="like-btn-card">
    <span class="title"><slot /></span>
    <LikeButton
      @click="emit('click')"
      :liked="liked"
      :number-of-likes="numberOfLikes"
      :disabled="disabled"
      :dislike-text="dislikeText"
      :like-text="likeText"
    />
  </div>
</template>

<script lang="ts" setup>
import LikeButton, { type Props as LikeButtonProps } from "./LikeButton.vue";

export interface Events {
  (e: "click"): void;
}
const emit = defineEmits<Events>();

defineProps<LikeButtonProps>();
</script>

<style lang="scss" scoped>
.like-btn-card {
  .title {
    display: block;
    margin-top: 0;
    text-decoration: underline;
    margin-bottom: 10px;
    text-align: center;
  }
}
</style>
