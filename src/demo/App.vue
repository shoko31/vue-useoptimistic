<template>
  <div class="demo">
    <DemoSection dark>
      <template #title>Vue-useOptimistic</template>
      <template #default>
        <div>
          <p>
            This page will demonstrate the difference between a regular ref and
            an optimistic ref.
          </p>
          <p>API fail rate : <b>0.3</b></p>
        </div>
      </template>
    </DemoSection>
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
