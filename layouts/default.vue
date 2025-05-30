<script setup lang="ts">
import { Toast } from "~/components/common";
</script>

<template>
  <header></header>
  <main class="max-w-7xl mx-auto p-8">
    <slot />
  </main>
  <footer></footer>
  <Toast />
</template>
