import express from 'express';
import { parseBmiCalculatorArguments } from './utils';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const {height, weight} = req.query;

    if (typeof height !== "string" || typeof weight !== "string") {
      throw new Error("One of the parameters is not a string");
    }

    const { cm, kg } = parseBmiCalculatorArguments([height, weight]);

    const calculatedBmi = calculateBmi(cm,kg);

    const response = {
      weight: kg,
      height: cm,
      bmi: calculatedBmi
    };

    res.status(200).json(response);
  } catch(error: unknown) {
      let errorMessage = "Something went wrong:";

      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
      }

      console.error(errorMessage);

      res.status(400).json({
      error: "malformatted parameters"
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});