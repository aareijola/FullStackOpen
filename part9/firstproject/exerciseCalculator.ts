interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
