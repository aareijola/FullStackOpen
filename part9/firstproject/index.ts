import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).send({
      error: 'parameters missing',
    });
  }
  if (isNaN(Number(target)) || Number(target) < 0) {
    res.status(400).send({ error: 'malformatted parameters1' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  for (let i = 0; i < daily_exercises.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (isNaN(Number(daily_exercises[i]))) {
      res.status(400).send({ error: 'malformatted parameters2' });
      return; // never hurts to be sure
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const hours: Array<number> = daily_exercises;
  res.status(200).json(calculateExercises(hours, Number(target)));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
