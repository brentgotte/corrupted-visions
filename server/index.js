import './env.js';
import express from 'express';
import cors from 'cors';
import reviewRoutes from './routes/review.js';
import ttsRoutes from './routes/tts.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', ttsRoutes);
app.use('/api', reviewRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'server/index.js' });
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});