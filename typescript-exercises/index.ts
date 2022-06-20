import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exercisesCalculator';

app.use(express.json());

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body.target || !req.body.daily_exercises) {
    res.json({
      error: 'parameters missing',
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {
      daily_exercises,
      target,
    }: { daily_exercises: Array<number>; target: number } = req.body;

    for (let i = 0; i < daily_exercises.length; i++) {
      if (isNaN(target) || isNaN(daily_exercises[i])) {
        res.json({
          error: 'malformatted parameters',
        });
      }
    }

    const result = calculateExercises(daily_exercises, target);
    res.send(result);
  }
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!').status(200);
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.heigth);
  const weight = Number(req.query.weight);
  if (!height || !weight) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
  }
  const result = calculateBmi(height, weight);
  res.status(200).json({ height, weight, result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
