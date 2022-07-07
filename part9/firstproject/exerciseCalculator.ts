interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseData {
  target: number;
  hours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  args = args.slice(2);
  args.forEach((arg: string): void => {
    if (isNaN(Number(arg))) throw new Error('All arguments are not numbers');
  });
  return {
    target: Number(args[0]),
    hours: args.slice(1).map((a: string) => Number(a)),
  };
};

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const trainingDays: number = hours.reduce(
    (prev: number, cur: number): number => {
      return cur !== 0 ? prev + 1 : prev;
    },
    0
  );
  const average: number =
    hours.reduce((prev: number, cur: number): number => {
      return prev + cur;
    }, 0) / hours.length;
  let rating: 1 | 2 | 3;
  const descriptions: Array<string> = [
    'pretty far',
    'not too bad',
    'very good',
  ];
  if (target - average >= 1) {
    rating = 1;
  } else if (target - average > 0 && target - average < 1) {
    rating = 2;
  } else {
    rating = 3;
  }
  return {
    periodLength: hours.length,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription: descriptions[rating - 1],
    target,
    average,
  };
};

try {
  const { target, hours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log('Error:', e.message);
  } else {
    console.log('Unkown error');
  }
}
