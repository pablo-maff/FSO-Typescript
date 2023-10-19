import express from 'express';
import { parseBmiCalculatorArguments, parseExerciseCalculatorArguments } from './utils';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if (!daily_exercises || !target) {
      throw new Error('parameters missing');
    }

    if (!Array.isArray(daily_exercises) || (typeof target !== 'number' && isNaN(Number(target)))) {
      throw new Error('malformatted paramaters');
    }

    const { targetDailyAverageExerciseHours, dailyExerciseHours } = parseExerciseCalculatorArguments(Number(target), daily_exercises);

    const result = calculateExercises(targetDailyAverageExerciseHours, dailyExerciseHours);

    res.status(200).json({
      ...result
    });
  } catch(error: unknown) {
    let errorMessage = "Something went wrong:";

    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    console.error(errorMessage);

    res.status(400).json({
      error: errorMessage
  });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});