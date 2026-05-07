<template>
  <div class="flex gap-1">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      @mouseenter="hovered = star"
      @mouseleave="hovered = 0"
      @click="emit('update:modelValue', star)"
      class="text-3xl leading-none transition-colors focus:outline-none"
      :style="star <= (hovered || modelValue) ? 'color: #e8a020' : 'color: #3a3a55'"
    >
      ★
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ modelValue: Number })
const emit = defineEmits(['update:modelValue'])

const hovered = ref(0)
</script>
