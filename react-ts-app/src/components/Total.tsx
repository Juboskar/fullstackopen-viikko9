const Total = ({
  parts,
}: {
  parts: { name: string; exerciseCount: number }[];
}) => {
  return (
    <p>
      Number of exercises{' '}
      {parts.reduce((carry: number, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};
export default Total;
