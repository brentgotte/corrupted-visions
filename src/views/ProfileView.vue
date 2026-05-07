<template>
  <main class="min-h-screen px-4 py-10 bg-[#0f0f1a]">
    <div class="max-w-3xl mx-auto space-y-6">

      <!-- Profile header -->
      <section class="rounded-2xl bg-[#1a1a2e] border border-[#2e2e45] p-6 shadow-lg">
        <div class="text-center">
          <h1 class="text-xl font-medium text-[#e8e8f0]">
            Profile Detected
          </h1>

          <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mt-6 overflow-hidden bg-[#252535] border border-[#3a3a55]">
            <img
              v-if="profile.image"
              :src="profile.image"
              alt="Profile image"
              class="w-full h-full object-cover"
            />

            <span v-else class="text-lg text-[#6060a0]">
              {{ profile.initials }}
            </span>
          </div>

          <h2 class="text-xl font-medium text-[#e8e8f0] mt-[18px]">
            {{ profile.name }}
          </h2>

          <p class="text-sm text-[#a0a0c0] mt-1">
            {{ profile.displayRole }}
          </p>

          <div class="mt-5 rounded-md p-4 bg-[#1e1e30] border border-[#3a3a55]">
            <p class="text-[10px] tracking-widest uppercase text-[#6060a0]">
              Match confidence
            </p>

            <p class="text-lg font-medium text-[#e05a40] mt-1.5">
              {{ profile.matchConfidence }}%
            </p>
          </div>
        </div>
      </section>

      <!-- Professional information -->
      <section class="rounded-2xl bg-[#1a1a2e] border border-[#2e2e45] p-6 shadow-lg">
        <h2 class="text-[11px] tracking-widest uppercase text-[#6060a0]">
          Professional
        </h2>

        <div class="mt-4 space-y-3">
          <div
            v-for="item in profile.professional"
            :key="item.label"
            class="flex justify-between border-b border-[#2e2e45] pb-2"
          >
            <span class="text-sm text-[#6060a0]">{{ item.label }}</span>
            <span class="text-sm text-[#e8e8f0]">{{ item.value }}</span>
          </div>
        </div>
      </section>

      <!-- Reviews summary -->
      <section class="rounded-2xl bg-[#1a1a2e] border border-[#2e2e45] p-6 shadow-lg">
        <h2 class="text-[11px] tracking-widest uppercase text-[#6060a0] mb-4">
          Student reviews
        </h2>

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
            <span class="text-[#6060a0]">
            {{ profile.role === 'student' ? 'Level of effort' : 'Difficulty level' }}
            </span>
            <span class="text-[#e8e8f0]">{{ profile.reviews.difficultyLevel }}/5.0</span>
          </div>
        </div>

        <div class="mb-4">
          <p class="text-[11px] text-[#6060a0] mb-1.5">
            Common tags:
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in profile.reviews.commonTags"
              :key="tag"
              class="px-2.5 py-1 text-xs bg-[#1e1e2e] text-[#a0a0c0] border border-[#3a3a50] rounded"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="bg-[#1e1e30] border border-[#2e2e45] rounded-md p-3 mb-4">
          <p class="text-sm text-[#a0a0c0] italic">
            "{{ profile.reviews.list[0].text }}"
          </p>

          <p class="text-[11px] text-[#6060a0] mt-1.5">
            — Recent review, {{ profile.reviews.list[0].date }}
          </p>
        </div>

        <div class="flex justify-between items-center">
        <router-link
            to="/reviews"
            class="rounded-md px-3.5 py-2 text-xs text-[#a0a0c0] border border-[#3a3a55]"
        >
            View all reviews
        </router-link>

        <router-link
            to="/reviews"
            class="rounded-md px-3.5 py-2 text-xs bg-[#b03a2e] text-white"
        >
            Add review
        </router-link>
        </div>
      </section>

      <!-- Data sources -->
      <section class="rounded-2xl bg-[#1a1a2e] border border-[#2e2e45] p-6 shadow-lg">
        <h2 class="text-[11px] tracking-widest uppercase text-[#6060a0]">
          Data sources
        </h2>

        <p class="text-sm text-[#a0a0c0] mt-3">
          {{ profile.dataSources.join(' · ') }}
        </p>
      </section>

      <!-- Scan another person button -->
      <section class="rounded-2xl bg-[#1a1a2e] border border-[#2e2e45] p-6 shadow-lg">
        <button
          class="w-full rounded-md px-5 py-2.5 text-sm font-medium bg-[#1e1e30] text-[#a0a0c0] border border-[#3a3a55] cursor-pointer transition hover:bg-[#252535]"
        >
          Scan another person
        </button>
      </section>

    </div>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { profiles } from '@/data/profiles'

const route = useRoute()
const profile = profiles[Number(route.params.id)]
</script>