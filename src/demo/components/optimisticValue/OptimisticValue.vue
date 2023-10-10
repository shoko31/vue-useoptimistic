<template>
  <!-- <div class="like-buttons-demo"> -->
  <div class="optimistic-value-demo demo-components">
    <OptimisticValueDemo />
    <RegularValueDemo />
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import OptimisticValueDemo from "./OptimisticValueDemo.vue";
import RegularValueDemo from "./RegularValueDemo.vue";
</script>

<style lang="scss" scoped>
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
