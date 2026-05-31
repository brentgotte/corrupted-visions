export function useSpeech() {
  let currentAudio = null;
  let currentObjectUrl = null;
  let pendingAudio = null;

  const cleanupObjectUrl = () => {
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = null;
    }
  };

  const speak = async (text, { volume = 1 } = {}) => {
    stop();

    const cleanText = String(text ?? '').replace(/\s+/g, ' ').trim();
    if (!cleanText) throw new Error('No text provided for TTS.');

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText }),
    };

    let response;
    try {
      response = await fetch('/api/tts', requestOptions);
    } catch {
      response = await fetch('http://localhost:5173/api/tts', requestOptions);
    }

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`TTS failed: ${response.status} ${errText}`);
    }

    const audioBlob = await response.blob();
    if (!audioBlob || audioBlob.size === 0) {
      throw new Error('TTS returned empty audio.');
    }

    cleanupObjectUrl();
    currentObjectUrl = URL.createObjectURL(audioBlob);

    currentAudio = new Audio(currentObjectUrl);
    currentAudio.volume = volume;
    currentAudio.preload = 'auto';

    try {
      await currentAudio.play();
      return { played: true, pending: false, engine: 'kokoro-local' };
    } catch (err) {
      if (err && err.name === 'NotAllowedError') {
        pendingAudio = currentAudio;
        return { played: false, pending: true, engine: 'kokoro-local' };
      }
      throw err;
    }
  };

  const resumePendingSpeech = async () => {
    if (!pendingAudio) return false;

    try {
      await pendingAudio.play();
      pendingAudio = null;
      return true;
    } catch {
      return false;
    }
  };

  const hasPendingSpeech = () => Boolean(pendingAudio);

  const stop = () => {
    pendingAudio = null;

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }

    cleanupObjectUrl();
  };

  const updateVolume = (volume) => {
    if (currentAudio) currentAudio.volume = volume;
  };

  return { speak, stop, updateVolume, resumePendingSpeech, hasPendingSpeech };
}
