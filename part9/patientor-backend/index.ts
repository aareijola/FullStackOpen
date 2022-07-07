import express from 'express';

const app = express();

const PORT = 3003;

app.get('/api/ping', (_req, res) => {
  console.log('Someone pinged');
  res.send('Pong!');
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
