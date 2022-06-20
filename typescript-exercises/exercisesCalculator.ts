type Rating = 1 | 2 | 3;
type RatingDescription = 'bad' | 'not too bad but could be better' | 'good';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

const calculateExercises = (
  exercises: Array<number>,
  target: number
): Result => {
  const sum = exercises.reduce((s, a) => s + a, 0);
  const average = sum / exercises.length;
  let rating: Rating = 2;
  let ratingDescription: RatingDescription = 'not too bad but could be better';
  if (average < target - 0.5) {
    rating = 1;
    ratingDescription = 'bad';
  }
  if (average > target + 0.5) {
    rating = 3;
    ratingDescription = 'good';
  }
  return {
    periodLength: exercises.length,
    trainingDays: exercises.filter((d) => d !== 0).length,
    success: target < average,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArgumentsEcxercises = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const all = args.slice(2, args.length).map((a) => Number(a));

  for (let i = 0; i < all.length; i++) {
    if (isNaN(all[i])) {
      throw new Error('Provided values were not numbers!');
    }
  }
  return all;
};

try {
  const allArgs = parseArgumentsEcxercises(process.argv);
  console.log(calculateExercises(allArgs.slice(1, allArgs.length), allArgs[0]));
} catch (error: unknown) {
  let errorMessage = 'Argument error';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
