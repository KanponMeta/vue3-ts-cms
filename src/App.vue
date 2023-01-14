<template>
  <div class="app">
    <h2>{{ commonStore.background }}</h2>
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/commonStore";

const commonStore = useCounterStore();
</script>

<style scoped></style>
