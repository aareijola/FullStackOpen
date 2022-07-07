import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  try {
    if (!isNaN(weight) && !isNaN(Number(height)) && weight > 0 && height > 0) {
      res.status(200).send({
        weight,
        height,
        bmi: calculateBmi(Number(height), Number(weight)),
      });
    } else {
      throw new Error('both inputs must be numbers');
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`Error: ${e.message}`);
      res.status(400).send({ error: 'malformatted parameters' });
    } else {
      console.log('Unknown error');
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
