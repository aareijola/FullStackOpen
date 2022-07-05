const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / ((height * height) / 10000);
  if (bmi < 16) {
    return 'Underweight (severe thinness)';
  } else if (bmi >= 16 && bmi < 17) {
    return 'Undewrweight (moderate thinness)';
  } else if (bmi >= 17 && bmi < 18.5) {
    return 'Underweight (mild thinness)';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight (pre-obese)';
  } else if (bmi >= 30 && bmi < 35) {
    return 'Obese (class I)';
  } else if (bmi >= 35 && bmi < 40) {
    return 'Obese (class II)';
  } else {
    return 'Obese (class III)';
  }
};

console.log(calculateBmi(180, 74));
