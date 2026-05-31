import { useSpeech } from './Usespeech';

const mockProfiles = {
  '123': {
    name: 'Claar van der Does',
    role_type: 'Teacher',
    institution: 'Amsterdam University of applied sciences',
    match_confidence: '74%',
  },
};

export function useProfileAudio() {
  const { speak, stop, updateVolume, resumePendingSpeech, hasPendingSpeech } = useSpeech();

  async function readProfileByQRCode(qrCode, volume = 1) {
    let profile = mockProfiles[qrCode];

    if (!profile) {
      try {
        const response = await fetch(`http://localhost:5173/api/profile/${qrCode}`);
        if (!response.ok) throw new Error(`Profile request failed: ${response.status}`);
        profile = await response.json();
      } catch {
        profile = mockProfiles[qrCode] ?? null;
      }
    }

    if (!profile) return null;

    const text = `Name: ${profile.name}. Role type: ${profile.role_type}. Institution: ${profile.institution}. Match confidence: ${profile.match_confidence}.`;

    const speechResult = await speak(text, { volume });
    return { profile, speechResult };
  }

  return { readProfileByQRCode, stop, updateVolume, resumePendingSpeech, hasPendingSpeech };
}