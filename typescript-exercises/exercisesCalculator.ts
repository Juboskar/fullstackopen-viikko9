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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
