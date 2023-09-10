function calculateBmi(cm: number, kg: number): string {
  if (cm <= 0) throw new Error("Error: You need to specify a valid height in centimeters");

  if (kg <= 0) throw new Error("You need to specify a valid weight in kilograms");

  const centimeterToMeter = cm / 100;

  const bmi = parseFloat((kg / Math.pow(centimeterToMeter, 2)).toFixed(1));

  if (bmi < 16) {
    return "UnderWeight (Severe thinness)"
  }
  else if (bmi <= 16.9) {
    return "Underweight (Moderate thinness)"
  }
  else if (bmi <= 18.4) {
    return "Underweight (Mild thinness)"
  }
  else if (bmi <= 24.9) {
    return "Normal (healthy weight)"
  }
  else if (bmi <= 29.9) {
    return "Overweight (Pre-obese)"
  }
  else if (bmi <= 34.9) {
    return "Obese (Class I)"
  }
  else if (bmi <= 39.9) {
    return "Obese (Class II)"
  };

  return "Obese (Class III)";
}

try {
console.log(calculateBmi(180, 74));
} catch (error: unknown) {
  let errorMessage = "Something went wrong:";

  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }

  console.error(errorMessage);
}