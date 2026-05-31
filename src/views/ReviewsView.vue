<template>
  <main class="max-w-3xl mx-auto px-4 py-10 space-y-8">

    <!-- Header card -->
    <BaseCard>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 style="font-size: 20px; font-weight: 500; color: #e8e8f0;">Reviews</h1>
          <p style="font-size: 13px; color: #a0a0c0; margin-top: 4px;">Honest feedback from the community.</p>
        </div>

        <div class="flex items-center gap-3">
          <!-- Role toggle -->
          <div class="flex items-center gap-1 rounded-[6px] p-1" style="background-color: #252535;">
            <button
              @click="currentRole = 'professor'"
              class="px-3 py-1.5 rounded-[4px] transition-colors"
              :style="currentRole === 'professor'
                ? 'background-color: #1e1e30; color: #e8e8f0; font-size: 13px; font-weight: 500;'
                : 'color: #6060a0; font-size: 13px;'"
            >
              Professor
            </button>
            <button
              @click="currentRole = 'student'"
              class="px-3 py-1.5 rounded-[4px] transition-colors"
              :style="currentRole === 'student'
                ? 'background-color: #1e1e30; color: #e8e8f0; font-size: 13px; font-weight: 500;'
                : 'color: #6060a0; font-size: 13px;'"
            >
              Student
            </button>
          </div>

          <!-- Open popup button -->
          <button
            @click="popupOpen = true"
            class="flex items-center gap-2 rounded-[6px] transition-colors"
            style="padding: 9px 18px; background-color: #b03a2e; color: #ffffff; font-size: 13px; font-weight: 500; border: none;"
            onmouseover="this.style.backgroundColor='#9a3228'"
            onmouseout="this.style.backgroundColor='#b03a2e'"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Write a Review
          </button>
        </div>
      </div>
    </BaseCard>

    <!-- Reviews list -->
    <div v-if="reviews.length" class="space-y-4">
      <div
        v-for="(review, idx) in reviews"
        :key="idx"
        class="rounded-[10px] p-6"
        :style="`background-color: ${cardPalette[idx % cardPalette.length].bg}; border: 0.5px solid ${cardPalette[idx % cardPalette.length].border}; border-left: 3px solid ${cardPalette[idx % cardPalette.length].accent};`"
      >
        <div class="flex items-start justify-between gap-4 mb-3">
          <div class="flex items-center gap-2 flex-wrap">
            <div class="flex gap-1">
              <span
                v-for="s in 5"
                :key="s"
                style="font-size: 16px;"
                :style="s <= review.rating ? 'color: #e8a020' : 'color: #3a3a55'"
              >★</span>
            </div>
            <span style="color: #3a3a55;">·</span>
            <span style="font-size: 13px; color: #a0a0c0;">
              {{ review.role === 'student' ? 'Difficulty' : 'Effort' }}:
              <span style="font-weight: 500; color: #e8e8f0;">{{ review.level }}/5</span>
            </span>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span
              class="rounded-[20px]"
              style="padding: 3px 9px; font-size: 11px; font-weight: 500;"
              :style="review.role === 'student'
                ? 'background-color: #1e2a3a; color: #60a5fa; border: 0.5px solid #2d4a6a;'
                : 'background-color: #2a2a3a; color: #a0a0c0; border: 0.5px solid #3a3a5a;'"
            >
              {{ review.role === 'student' ? 'Student' : 'Professor' }}
            </span>
            <span style="font-size: 11px; font-family: monospace; color: #6060a0;">{{ review.date }}</span>
          </div>
        </div>

        <div v-if="review.tags.length" class="flex flex-wrap gap-1.5 mb-3">
          <span
            v-for="tag in review.tags"
            :key="tag"
            class="rounded-[4px]"
            style="padding: 4px 10px; font-size: 12px; background-color: #1e1e2e; color: #a0a0c0; border: 0.5px solid #3a3a50;"
          >
            {{ tag }}
          </span>
        </div>

        <p style="font-size: 13px; color: #a0a0c0; font-style: italic; line-height: 1.6;">"{{ review.text }}"</p>
      </div>
    </div>

    <!-- Empty state -->
    <BaseCard v-else>
      <div class="text-center py-6">
        <svg class="w-10 h-10 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #3a3a55;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <p style="font-size: 13px; color: #6060a0;">No reviews yet. Be the first to leave one!</p>
      </div>
    </BaseCard>

  </main>

  <ReviewPopup
    :isOpen="popupOpen"
    :currentRole="currentRole"
    @close="popupOpen = false"
    @submitted="onReviewSubmitted"
  />
</template>
<script setup>
import { ref } from 'vue';
import BaseCard from '@/components/ui/cards/BaseCard.vue';
import ReviewPopup from '@/components/ReviewPopup.vue';

const popupOpen = ref(false);
const currentRole = ref('student');
const reviews = ref([]);

const cardPalette = [
  { bg: '#1a1e2e', border: '#2a3a5a', accent: '#3060b0' },
  { bg: '#1e1a2e', border: '#3a2a5a', accent: '#7040b0' },
  { bg: '#1a2420', border: '#2a4a3a', accent: '#309070' },
  { bg: '#201e1a', border: '#4a3a2a', accent: '#b07030' },
  { bg: '#201a1e', border: '#4a2a3a', accent: '#b03060' },
  { bg: '#1a201e', border: '#2a4030', accent: '#409060' },
];

function onReviewSubmitted(review) {
  reviews.value.unshift(review);
}
</script>