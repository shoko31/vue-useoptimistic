<template>
  <div class="demo">
    <DemoSection>
      <template #title>Optimistic Value</template>
      <template #default>
        <OptimisticValue />
      </template>
    </DemoSection>
    <DemoSection dark>
      <template #title>Optimistic Async Function</template>
      <template #default>
        <OptimisticAsyncFn />
      </template>
    </DemoSection>
  </div>
</template>

<script setup lang="ts">
import OptimisticValue from "./components/optimisticValue/OptimisticValue.vue";
import OptimisticAsyncFn from "./components/optimisticAsyncFn/OptimisticAsyncFn.vue";
import DemoSection from "./components/shared/DemoSection.vue";
</script>

<style scoped></style>
