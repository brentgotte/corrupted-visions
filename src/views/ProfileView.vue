<template>
  <main class="min-h-screen px-4 py-10 bg-[#0f0f1a]">
    <div class="max-w-3xl mx-auto space-y-6" v-if="profile">
      <section class="rounded-2xl bg-[#1a1a2e] border border-[#2e2e45] p-6 shadow-lg">
        <div class="text-center">
          <h1 class="text-xl font-medium text-[#e8e8f0]">Profile Detected</h1>

          <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mt-6 overflow-hidden bg-[#252535] border border-[#3a3a55]">
            <img v-if="profile.image" :src="profile.image" alt="Profile image" class="w-full h-full object-cover" />
            <span v-else class="text-lg text-[#6060a0]">{{ profile.initials }}</span>
          </div>

          <h2 class="text-xl font-medium text-[#e8e8f0] mt-[18px]">{{ profile.name }}</h2>
          <p class="text-sm text-[#a0a0c0] mt-1">{{ profile.displayRole }}</p>

          <div class="mt-5 rounded-md p-4 bg-[#1e1e30] border border-[#3a3a55]">
            <p class="text-[10px] tracking-widest uppercase text-[#6060a0]">Match confidence</p>
            <p class="text-lg font-medium text-[#e05a40] mt-1.5">{{ profile.matchConfidence }}%</p>
          </div>
        </div>
      </section>

      <section class="rounded-2xl bg-[#1a1a2e] border border-[#2e2e45] p-6 shadow-lg">
        <h2 class="text-[11px] tracking-widest uppercase text-[#6060a0]">Professional</h2>
        <div class="mt-4 space-y-3">
          <div v-for="item in profile.professional" :key="item.label" class="flex justify-between border-b border-[#2e2e45] pb-2">
            <span class="text-sm text-[#6060a0]">{{ item.label }}</span>
            <span class="text-sm text-[#e8e8f0]">{{ item.value }}</span>
          </div>
        </div>
      </section>

      <section class="rounded-2xl bg-[#1a1a2e] border border-[#2e2e45] p-6 shadow-lg">
        <h2 class="text-[11px] tracking-widest uppercase text-[#6060a0] mb-4">Student reviews</h2>

        <div class="space-y-3 mb-4">
          <div class="flex justify-between text-sm">
            <span class="text-[#6060a0]">Overall rating</span>
            <span class="text-[#e8a020]">★ {{ profile.reviews.overallRating }}/5.0</span>
          </div>

          <div class="flex justify-between text-sm">
            <span class="text-[#6060a0]">Total reviews</span>
            <span class="text-[#e8e8f0]">{{ profile.reviews.totalReviews }}</span>
          </div>

          <div class="flex justify-between text-sm">
            <span class="text-[#6060a0]">{{ profile.role === 'student' ? 'Level of effort' : 'Difficulty level' }}</span>
            <span class="text-[#e8e8f0]">{{ profile.reviews.difficultyLevel }}/5.0</span>
          </div>
        </div>

        <div class="mb-4">
          <p class="text-[11px] text-[#6060a0] mb-1.5">Common tags:</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in profile.reviews.commonTags" :key="tag" class="px-2.5 py-1 text-xs bg-[#1e1e2e] text-[#a0a0c0] border border-[#3a3a50] rounded">
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="bg-[#1e1e30] border border-[#2e2e45] rounded-md p-3 mb-4">
          <p class="text-sm text-[#a0a0c0] italic">"{{ profile.reviews.list[0].text }}"</p>
          <p class="text-[11px] text-[#6060a0] mt-1.5">— Recent review, {{ profile.reviews.list[0].date }}</p>
        </div>

        <button
          @click="toggleSpeak"
          class="w-full flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-colors"
          :style="speaking
            ? 'background-color: #2a1a1a; color: #e05a40; border: 1px solid #4a2a2a;'
            : 'background-color: #1e1e30; color: #a0a0c0; border: 1px solid #2e2e45;'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path v-if="!speaking" stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-3-3m3 3l3-3M9 12H3m18 0h-2" />
            <path v-if="!speaking" stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 000-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            <path v-if="speaking" stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 005 0" />
          </svg>
          {{ speaking ? 'Stop voorlezen' : 'Pagina voorlezen' }}
        </button>
      </section>
    </div>

    <div v-else class="max-w-3xl mx-auto text-[#e8e8f0]">
      Profile not found.
    </div>
  </main>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { profiles } from '../data/profiles.js';

const route = useRoute();

const profile = computed(() => {
  const id = Number(route.params.id);
  if (!Number.isInteger(id)) return null;
  return profiles.find((p) => p.id === id) ?? null;
});

const speaking = ref(false);
let currentAudio = null;

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  speaking.value = false;
}

async function toggleSpeak() {
  if (speaking.value) {
    stopAudio();
    return;
  }

  speaking.value = true;

  try {
    const apiBase = import.meta.env.VITE_API_BASE_URL ?? '';
    const res = await fetch(`${apiBase}/api/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'ik houd van peren' }),
    });

    if (!res.ok) throw new Error('TTS request failed');

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    currentAudio = new Audio(url);
    currentAudio.onended = () => { speaking.value = false; URL.revokeObjectURL(url); };
    currentAudio.onerror = () => { speaking.value = false; URL.revokeObjectURL(url); };
    currentAudio.play();
  } catch {
    speaking.value = false;
  }
}

onMounted(() => {
  // Auto-trigger only on desktop — mobile browsers block audio without a user gesture
  if (!/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
    toggleSpeak();
  }
});
onUnmounted(() => { stopAudio(); });
</script>