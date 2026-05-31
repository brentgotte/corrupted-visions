<template>
  <div class="min-h-screen flex flex-col" style="background-color: var(--color-bg-base);">
    <RouterView />
  </div>
</template>

<script setup>
import QrScanner from './components/qrscanner.vue';
</script>