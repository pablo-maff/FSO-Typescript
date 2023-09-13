import express from 'express';
import { parseBmiCalculatorArguments } from './utils';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query

  if (typeof height !== "string" || typeof weight !== "string") {
    throw new Error("One of the parameters is not a string")
  }

  const { cm, kg } = parseBmiCalculatorArguments([height, weight]);

  const calculatedBmi = calculateBmi(cm,kg)

  res.send(calculatedBmi);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});