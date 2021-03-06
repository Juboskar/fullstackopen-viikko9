import { CoursePart } from '../types';

const Total = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <p>
      Number of exercises{' '}
      {parts.reduce((carry: number, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};
export default Total;
