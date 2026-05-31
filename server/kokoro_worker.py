import base64
import io
import json
import sys
import traceback

import numpy as np
import soundfile as sf
from kokoro import KPipeline


protocol_out = sys.stdout

sys.stdout = sys.stderr

pipeline = None


def get_pipeline():
    global pipeline
    if pipeline is None:
        pipeline = KPipeline(lang_code="a", repo_id="hexgrad/Kokoro-82M")
    return pipeline


def synthesize(text):
    pipe = get_pipeline()
    chunks = []

    for _, _, audio in pipe(text, voice="af_heart"):
        chunks.append(audio)

    if not chunks:
        raise RuntimeError("No audio generated")

    full_audio = np.concatenate(chunks)
    wav = io.BytesIO()
    sf.write(wav, full_audio, 24000, format="WAV")
    return base64.b64encode(wav.getvalue()).decode("ascii")


for line in sys.stdin:
    try:
        request = json.loads(line)
        
        # Handle warmup request
        if request.get("warmup"):
            response = {"id": request.get("id"), "ok": True, "warmup": True}
            protocol_out.write(json.dumps(response) + "\n")
            protocol_out.flush()
            continue
        
        audio = synthesize(str(request.get("text", "")).strip())
        response = {"id": request.get("id"), "ok": True, "audio": audio}
    except Exception as err:
        response = {
            "id": request.get("id") if "request" in locals() else None,
            "ok": False,
            "error": str(err),
            "trace": traceback.format_exc(),
        }

    protocol_out.write(json.dumps(response) + "\n")
    protocol_out.flush()
