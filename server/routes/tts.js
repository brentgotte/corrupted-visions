import express from 'express';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// server/routes -> server
const ROOT = path.resolve(__dirname, '..');
const PYTHON_EXE = path.resolve(ROOT, '../.venv/Scripts/python.exe');
const PY_WORKER = path.resolve(ROOT, 'kokoro_worker.py');
const MAX_CACHE_ITEMS = 100;
const WORKER_STARTUP_WAIT = 5000; // Give worker 5s to initialize

let worker = null;
let workerBuffer = '';
let nextRequestId = 1;
let workerReady = false;
const pendingRequests = new Map();
const audioCache = new Map();

function rememberAudio(text, audio) {
  if (audioCache.has(text)) audioCache.delete(text);
  audioCache.set(text, audio);

  if (audioCache.size > MAX_CACHE_ITEMS) {
    const oldestKey = audioCache.keys().next().value;
    audioCache.delete(oldestKey);
  }
}

function startWorker() {
  if (worker && !worker.killed) return worker;

  console.log(`[TTS] Starting worker: ${PYTHON_EXE} ${PY_WORKER}`);
  workerReady = false;
  worker = spawn(PYTHON_EXE, [PY_WORKER], {
    stdio: ['pipe', 'pipe', 'pipe'],
    windowsHide: true,
  });

  worker.stdout.on('data', (data) => {
    workerBuffer += data.toString();
    
    // Mark worker as ready after first successful connection
    if (!workerReady && workerBuffer.includes('\n')) {
      workerReady = true;
      console.log('[TTS] Worker ready');
    }

    const lines = workerBuffer.split(/\r?\n/);
    workerBuffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.trim()) continue;

      let message;
      try {
        message = JSON.parse(line);
      } catch (err) {
        console.error('Invalid Kokoro worker message:', line);
        continue;
      }

      const pending = pendingRequests.get(message.id);
      if (!pending) continue;

      pendingRequests.delete(message.id);

      if (message.ok) {
        const audio = Buffer.from(message.audio, 'base64');
        rememberAudio(pending.text, audio);
        pending.resolve(audio);
      } else {
        pending.reject(new Error(message.error || 'Kokoro worker failed'));
      }
    }
  });

  worker.stderr.on('data', (data) => {
    console.error(`[Kokoro worker stderr]: ${data.toString()}`);
  });

  worker.on('error', (err) => {
    console.error(`[Kokoro worker error]: ${err.message}`);
    worker = null;
    workerReady = false;
  });

  worker.on('exit', (code) => {
    console.error(`[Kokoro worker exited with code ${code}]`);
    for (const [, pending] of pendingRequests) {
      pending.reject(new Error(`Kokoro worker exited with code ${code}`));
    }

    pendingRequests.clear();
    worker = null;
    workerReady = false;
  });

  return worker;
}

function synthesize(text) {
  const cachedAudio = audioCache.get(text);
  if (cachedAudio) return Promise.resolve(cachedAudio);

  const activeWorker = startWorker();
  const id = nextRequestId++;

  return new Promise((resolve, reject) => {
    pendingRequests.set(id, { resolve, reject, text });
    activeWorker.stdin.write(`${JSON.stringify({ id, text })}\n`, (err) => {
      if (!err) return;
      pendingRequests.delete(id);
      reject(err);
    });
  });
}

startWorker();

setTimeout(() => {
  if (worker && !worker.killed) {
    worker.stdin.write(JSON.stringify({ id: 0, warmup: true }) + '\n', (err) => {
      if (err) console.error('[TTS] Warmup failed:', err.message);
    });
  }
}, 500);

router.get('/tts', (_req, res) => {
  res.json({ ok: true, route: 'tts mounted' });
});

router.post('/tts', async (req, res) => {
  try {
    const text = String(req.body?.text ?? '').trim();
    if (!text) {
      return res.status(400).json({ success: false, message: 'text is required' });
    }

    const audio = await synthesize(text);
    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Length', String(audio.length));
    res.send(audio);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'TTS failed' });
  }
});

export default router;
