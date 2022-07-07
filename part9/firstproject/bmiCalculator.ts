interface BodyMeasurements {
  weight: number;
  height: number;
}

const parseBmiArguments = (args: Array<string>): BodyMeasurements => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Input values were not numbers!');
  }
};

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

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log('Error:', e.message);
  } else {
    console.log('Unknown error');
  }
}
