<template>
  <main>
    <h2>{{ store.counter }}</h2>
    <el-button @click="store.counter++">+1</el-button>
    <el-button @click="store.counter--">-1</el-button>
  </main>
</template>

<script setup lang="ts">
import { useCounterStore } from "../stores/counter";

const store = useCounterStore();
</script>
