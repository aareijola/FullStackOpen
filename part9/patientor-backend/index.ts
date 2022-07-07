import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('Someone pinged');
  res.send('Pong!');
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
