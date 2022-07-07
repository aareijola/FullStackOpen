import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses';

const app = express();
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('Someone pinged');
  res.send('Pong!');
});

app.use('/api/diagnoses', diagnosisRouter);

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
