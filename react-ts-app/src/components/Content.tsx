import Part from './Part';

const Content = ({
  parts,
}: {
  parts: { name: string; exerciseCount: number }[];
}) => (
  <div>
    {parts.map((part) => (
      <Part
        key={part.name}
        name={part.name}
        exerciseCount={part.exerciseCount}
      />
    ))}
  </div>
);

export default Content;
