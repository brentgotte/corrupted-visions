<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      style="background-color: rgba(0,0,0,0.7);"
      @mousedown.self="handleClose"
    >
      <div
        class="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[10px]"
        style="background-color: #1a1a2e; border: 0.5px solid #2e2e45;"
      >

        <!-- Success state -->
        <div v-if="submitted" class="p-8 text-center">
          <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #1a3a2a;">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="color: #4ade80;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style="font-size: 20px; font-weight: 500; color: #e8e8f0; margin-bottom: 8px;">Review Submitted!</h2>
          <p style="font-size: 13px; color: #a0a0c0; margin-bottom: 24px;">Your review has been posted publicly.</p>
          <button
            @click="handleClose"
            class="rounded-[6px] transition-colors"
            style="padding: 9px 18px; background-color: #b03a2e; color: #ffffff; font-size: 13px; font-weight: 500; border: none; cursor: pointer;"
            onmouseover="this.style.backgroundColor='#9a3228'"
            onmouseout="this.style.backgroundColor='#b03a2e'"
          >
            Close
          </button>
        </div>

        <!-- Form -->
        <div v-else class="p-6">

          <!-- Header -->
          <div class="flex items-center justify-between mb-5">
            <h2 style="font-size: 20px; font-weight: 500; color: #e8e8f0;">{{ currentRole === 'student' ? 'Rate the Professor' : 'Rate The Student' }}</h2>
            <button
              type="button"
              @click="handleClose"
              class="transition-colors p-1 rounded-[6px]"
              style="color: #6060a0; background: transparent; border: none; cursor: pointer;"
              onmouseover="this.style.backgroundColor='#252535'; this.style.color='#a0a0c0'"
              onmouseout="this.style.backgroundColor='transparent'; this.style.color='#6060a0'"
              aria-label="Close"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Role badge -->
          <div class="mb-5">
            <span
              class="inline-flex items-center gap-1.5 rounded-[20px]"
              style="padding: 3px 9px; font-size: 11px; font-weight: 500; background-color: #1e2a3a; color: #60a5fa; border: 0.5px solid #2d4a6a;"
            >
              <span class="w-2 h-2 rounded-full" style="background-color: #60a5fa;"></span>
              Reviewing as {{ currentRole === 'student' ? 'Student' : 'Professor' }}
            </span>
          </div>

          <!-- Overall Rating -->
          <div class="mb-5">
            <label
              class="block mb-2"
              style="font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: #6060a0;"
            >
              Overall Rating <span style="color: #e05a40;">*</span>
            </label>
            <StarInput v-model="form.rating" />
            <p v-if="errors.rating" class="mt-1" style="font-size: 13px; color: #e05a40;">{{ errors.rating }}</p>
          </div>

          <!-- Level of Difficulty / Level of Effort -->
          <div class="mb-5">
            <label
              class="block mb-2"
              style="font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: #6060a0;"
            >
              {{ currentRole === 'student' ? 'Level of Difficulty' : 'Level of Effort' }}
              <span style="color: #e05a40;">*</span>
            </label>
            <StarInput v-model="form.level" />
            <p v-if="errors.level" class="mt-1" style="font-size: 13px; color: #e05a40;">{{ errors.level }}</p>

          </div>

          

          <!-- Tags -->
          <div class="mb-5">
            <label
              class="block mb-2"
              style="font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: #6060a0;"
            >
              Tags <span style="color: #6060a0; text-transform: none; letter-spacing: normal; font-weight: 400;">(optional)</span>
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in availableTags"
                :key="tag"
                type="button"
                @click="toggleTag(tag)"
                class="rounded-[4px] transition-colors"
                :style="form.tags.includes(tag)
                  ? 'padding: 4px 10px; font-size: 12px; background-color: #b03a2e; color: #ffffff; border: 0.5px solid #b03a2e; cursor: pointer;'
                  : 'padding: 4px 10px; font-size: 12px; background-color: #1e1e2e; color: #a0a0c0; border: 0.5px solid #3a3a50; cursor: pointer;'"
              >
                {{ tag }}
              </button>
            </div>
          </div>

          <!-- Review Text -->
          <div class="mb-6">
            <label
              class="block mb-2"
              style="font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: #6060a0;"
            >
              Review <span style="color: #e05a40;">*</span>
            </label>

            <textarea
              v-model="form.text"
              rows="4"
              placeholder="Share your experience..."
              class="w-full resize-none focus:outline-none rounded-[6px]"
              style="background-color: #1a1a2c; padding: 10px 12px; font-size: 13px; color: #a0a0c0; width: 100%;"
              :style="errors.text ? 'border: 0.5px solid #e05a40;' : 'border: 0.5px solid #3a3a55;'"
            />
            <p v-if="errors.text" class="mt-1" style="font-size: 13px; color: #e05a40;">{{ errors.text }}</p>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 justify-end">
            <button
              type="button"
              @click="handleClose"
              class="rounded-[6px] transition-colors"
              style="padding: 9px 18px; font-size: 13px; color: #e8e8f0; background: transparent; border: 0.5px solid #3a3a55; cursor: pointer;"
              onmouseover="this.style.backgroundColor='#252535'"
              onmouseout="this.style.backgroundColor='transparent'"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="submit"
              class="rounded-[6px] transition-colors"
              style="padding: 9px 18px; font-size: 13px; font-weight: 500; color: #ffffff; background-color: #b03a2e; border: none; cursor: pointer;"
              onmouseover="this.style.backgroundColor='#9a3228'"
              onmouseout="this.style.backgroundColor='#b03a2e'"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import StarInput from '@/components/ui/inputs/StarInput.vue'

const props = defineProps({
  isOpen: Boolean,
  woudlTakeAgain: Boolean,
  currentRole: {
    type: String,
    default: 'student',
    validator: (v) => ['student', 'professor'].includes(v),
  },
})
const emit = defineEmits(['close', 'submitted'])


const TAGS = {
  student: ['Engaging', 'Clear Explanations', 'Fair Grading', 'Helpful', 'Accessible', 'Organized', 'Inspiring', 'Strict'],
  professor: ['Participative', 'Creative', 'Hardworking', 'Meets Deadlines', 'Collaborative', 'Communicative', 'Inquisitive'],
}


const availableTags = computed(() => TAGS[props.currentRole])

const emptyForm = () => ({ rating: 0, level: 0, tags: [], text: '', woudlTakeAgain: false })

const form = ref(emptyForm())
const errors = ref({})
const submitted = ref(false)
const isSubmitting = ref(false)
const woudlTakeAgain = ref(false)

function toggleTag(tag) {
  const idx = form.value.tags.indexOf(tag)
  if (idx === -1) form.value.tags.push(tag)
  else form.value.tags.splice(idx, 1)
}

function validate() {
  const e = {}
  if (!form.value.rating) e.rating = 'Please select an overall rating.'
  if (!form.value.level) e.level = `Please select a level.`
  if (!form.value.text.trim()) e.text = 'Please write a review.'
  errors.value = e
  return Object.keys(e).length === 0
}

console.log(props.currentRole)

async function submit() {
  if (!validate() || isSubmitting.value) return

  isSubmitting.value = true

  try {
    await fetch('http://localhost:3000/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        profile_id: "3e1d94bb-ff51-4ff4-a31e-7b407db2e3de",
        overall_rating: form.value.rating,
        secondary_rating: form.value.level,
        comment: form.value.text.trim(),
        tags: [...form.value.tags],
      }),
    })

    emit('submitted', {
      role: props.currentRole,
      rating: form.value.rating,
      level: form.value.level,
      tags: [...form.value.tags],
      wouldtakeagain: form.value.woudlTakeAgain,
      text: form.value.text.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    })

    submitted.value = true
  } catch (err) {
    console.error('Error submitting review:', err)
    errors.value.text = 'Failed to submit review. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

function handleClose() {
  emit('close')
}

watch(() => props.isOpen, (open) => {
  if (open) {
    form.value = emptyForm()
    errors.value = {}
    submitted.value = false
  }
})
</script>
