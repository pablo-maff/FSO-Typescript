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

export function parseExerciseCalculatorArguments(args: string[]): ParsedExerciseValues {
  if (args.length < 4) throw new Error("Not enough arguments");

  const cleanArgs = args.slice(2);

  const allArgsAreNumbers = !cleanArgs.some(arg => isNaN(Number(arg)));

  if (allArgsAreNumbers) {
    const dailyExerciseHours = cleanArgs.map(hours => Number(hours)).slice(1);

    const allNumbersArePositive = dailyExerciseHours.some(n => n >= 0);

    if (!allNumbersArePositive) throw new Error("Can't input negative numbers as hours");

    return {
      targetDailyAverageExerciseHours: Number(args[2]),
      dailyExerciseHours: dailyExerciseHours
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
}