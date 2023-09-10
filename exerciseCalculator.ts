interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises (dailyExerciseHours: number[], targetDailyAverageExerciseHours: number) : ExerciseReport {
  const periodLength = dailyExerciseHours.length;

  const trainingDays = dailyExerciseHours.filter(dailyHours => dailyHours > 0).length;

  const totalExerciseHours = dailyExerciseHours.reduce((acc, curr) => acc + curr, 0);

  const averageExerciseHours = totalExerciseHours / periodLength;

  const targetSuccess = averageExerciseHours >= targetDailyAverageExerciseHours;

  let rating = 1;
  let ratingDescription = "Not enough exercise. You were far from your target.";

  if (targetSuccess) {
    rating = 3;
    ratingDescription = "Good job! You reached your exercise target.";
  }
  else if (targetDailyAverageExerciseHours - averageExerciseHours <= 1) {
    rating = 2;
    ratingDescription = "Not too bad but could do better.";
  }

  const exerciseReport = {
    periodLength,
    trainingDays,
    success: targetSuccess,
    rating,
    ratingDescription,
    target: targetDailyAverageExerciseHours,
    average: averageExerciseHours
  };

  return exerciseReport
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));