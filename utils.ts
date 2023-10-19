interface ParsedBmiValues {
  cm: number;
  kg: number;
}

export function parseBmiCalculatorArguments(args: string[]): ParsedBmiValues {
  if (args.length < 2) throw new Error("Not enough arguments");
  if (args.length > 2) throw new Error("Too many arguments");

  const cmString = args[0];
  const kgString = args[1];

  const allArgsAreNumbers = !isNaN(Number(cmString)) && !isNaN(Number(kgString));

  if (allArgsAreNumbers) {
    const cm = Number(cmString);
    const kg = Number(kgString);

    if (cm <= 0) throw new Error("You need to specify a valid height in centimeters");

    if (kg <= 0) throw new Error("You need to specify a valid weight in kilograms");

    return {
      cm,
      kg
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
}

interface ParsedExerciseValues {
  targetDailyAverageExerciseHours: number;
  dailyExerciseHours: number[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseExerciseCalculatorArguments(target: number, daily_exercises: any[]): ParsedExerciseValues {
  if (!daily_exercises || !target) {
    throw new Error('parameters missing');
  }

  const allDailyExerciseValuesAreNumbers = !daily_exercises.some(arg => isNaN(Number(arg)));

  if (typeof target !== 'number' || !allDailyExerciseValuesAreNumbers) {
    throw new Error('malformatted parameters');
  }

  const dailyExerciseHours = daily_exercises.map(hours => Number(hours));

  const allNumbersArePositive = dailyExerciseHours.every(n => n >= 0);

  if (!allNumbersArePositive) {
    throw new Error('malformatted paramaters');
  }

  return {
    targetDailyAverageExerciseHours: target,
    dailyExerciseHours: dailyExerciseHours
  };
}