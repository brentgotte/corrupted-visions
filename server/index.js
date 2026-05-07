import './env.js';
import express from 'express';
import cors from 'cors';
import reviewRoutes from './routes/review.js';

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/api', reviewRoutes);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});