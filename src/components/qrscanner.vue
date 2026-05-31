<template>
  <div class="flex flex-col items-center gap-6 p-6">

    <!-- Volume control -->
    <div class="flex items-center gap-3 w-full max-w-sm">
      <span class="text-sm text-gray-500">🔈</span>
      <input v-model="volume" type="range" min="0" max="1" step="0.1" class="w-full accent-blue-500" />
      <span class="text-sm text-gray-500">🔊</span>
    </div>

    <!-- Scan button -->
    <button @click="handleAudioButton" :disabled="loading"
      class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-50">
      {{ loading ? 'Scanning...' : 'Play audio output' }}
    </button>

    <!-- Status feedback -->
    <p v-if="status" class="text-sm text-gray-600">{{ status }}</p>

    <!-- Stop audio -->
    <button v-if="isReading" @click="stopReading" class="text-red-500 underline text-sm">
      Stop Audio
    </button>
  </div>
</template>

<script setup>
// FIX #1: removed onMounted auto-trigger — browsers (and Meta glasses) block
//         audio that plays without a user gesture, so we wait for a click.
// FIX #4: getQRCodeFromGlasses() now reads the ?qr= URL param so real
//         QR-codes from your printed site actually work. Falls back to '123'.
import { ref, watch } from 'vue';
import { useProfileAudio } from '../../composables/profile_audio.js';

const { readProfileByQRCode, stop, updateVolume, resumePendingSpeech, hasPendingSpeech } = useProfileAudio();

const volume = ref(0.8);
const loading = ref(false);
const isReading = ref(false);
const status = ref('');

// FIX #4: read ?qr=<code> from the URL so the Meta glasses can pass the
//         scanned value in, e.g. https://yoursite.com/?qr=abc123
async function getQRCodeFromGlasses() {
  const params = new URLSearchParams(window.location.search);
  const qrParam = params.get('qr');
  if (qrParam) return qrParam;

  // fallback mock while developing
  await new Promise((resolve) => setTimeout(resolve, 500));
  return '123';
}

watch(volume, (newVol) => updateVolume(newVol));

// FIX #1: onMounted removed — no more auto-trigger on load.

const handleAudioButton = async () => {
  if (await resumePendingSpeech()) {
    isReading.value = true;
    status.value = 'Playing Kokoro audio...';
    return;
  }
  if (!loading.value) await handleScan();
};

const handleScan = async () => {
  loading.value = true;
  isReading.value = true;
  status.value = 'Looking up profile...';

  try {
    const qrCode = await getQRCodeFromGlasses();
    const result = await readProfileByQRCode(qrCode, volume.value);

    if (!result?.profile) {
      status.value = 'Profile not found.';
      isReading.value = false;
      return;
    }

    const { profile, speechResult } = result;

    if (speechResult.played) {
      status.value = `Playing Kokoro voice for ${profile.name}...`;
      isReading.value = true;
    } else if (speechResult.pending || hasPendingSpeech()) {
      status.value = `Autoplay blocked. Click "Play audio output" for ${profile.name}.`;
      isReading.value = true;
    } else {
      status.value = 'Kokoro generated no playable audio.';
      isReading.value = false;
    }
  } catch (err) {
    status.value = `Kokoro error: ${err instanceof Error ? err.message : String(err)}`;
    isReading.value = false;
  } finally {
    loading.value = false;
  }
};

const stopReading = () => {
  stop();
  isReading.value = false;
  status.value = '';
};
</script>
