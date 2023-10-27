<template>
  <div class="demo">
    <a
      href="https://github.com/shoko31/vue-useoptimistic"
      title="Github Repository"
      target="_blank"
      ><img :src="githubLogoUrl" height="18" width="18" class="github-logo"
    /></a>
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

const githubLogoUrl = `${import.meta.env.BASE_URL}github-mark.svg`;
</script>

<style scoped lang="scss">
.github-logo {
  position: fixed;
  top: 5px;
  right: 5px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.15s ease-in-out;

  &:hover,
  &:active {
    opacity: 1;
  }
}
</style>
