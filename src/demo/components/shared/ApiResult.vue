<template>
  <span
    class="api-result"
    :class="{
      failed: status === 'error',
      success: status === 'success',
    }"
    >API status : <span class="important">{{ status ?? "" }}</span></span
  >
</template>

<script lang="ts" setup>
export interface Props {
  status?: "error" | "success" | string;
}
defineProps<Props>();
</script>

<style scoped>
.api-result {
  display: block;
}
.api-result > span.important {
  font-weight: 600;
}
.api-result.success > span.important {
  color: rgb(31, 142, 74);
}
.api-result.failed > span.important {
  color: rgb(142, 31, 31);
}
</style>
