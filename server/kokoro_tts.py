import sys
import numpy as np
import soundfile as sf
from kokoro import KPipeline

def main():
    if len(sys.argv) < 3:
        print("Usage: python kokoro_tts.py <output_wav_path> <text>", file=sys.stderr)
        sys.exit(1)

    output_path = sys.argv[1]
    text = sys.argv[2]

    pipeline = KPipeline(lang_code="a")
    chunks = []

    for _, _, audio in pipeline(text, voice="af_heart"):
        chunks.append(audio)

    if not chunks:
        print("No audio generated", file=sys.stderr)
        sys.exit(2)

    full_audio = np.concatenate(chunks)
    sf.write(output_path, full_audio, 24000)

if __name__ == "__main__":
    main()