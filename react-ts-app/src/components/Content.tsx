import Part from './Part';
import { CoursePart } from '../types';

const Content = ({ parts }: { parts: CoursePart[] }) => (
  <div>
    {parts.map((part) => (
      <div key={part.name}>
        <Part part={part} />
      </div>
    ))}
  </div>
);

export default Content;
