<template>
  <section class="demo-section" :class="{ dark }">
    <h2 class="title"><slot name="title" /></h2>
    <div class="content"><slot /></div>
  </section>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ dark?: boolean }>(), { dark: false });
</script>

<style lang="scss" scoped>
.demo-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  &.dark {
    background-color: #00000030;
  }

  h2 {
    font-size: 2.5em;
    line-height: 1.1;
    margin-top: 0;
  }
}
</style>
