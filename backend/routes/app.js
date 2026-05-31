const express = require('express');
const cors = require('cors');

const profileRoutes = require('./routes/profile');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', profileRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});