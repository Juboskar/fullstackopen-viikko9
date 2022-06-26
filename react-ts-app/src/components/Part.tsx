import { CoursePart } from '../types';
import { assertNever } from '../utils';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <div>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
          <br />
        </div>
      );

    case 'groupProject':
      return (
        <div>
          <div>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </div>
          <div>project exercises {part.groupProjectCount}</div>
          <br />
        </div>
      );

    case 'submission':
      return (
        <div>
          <div>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>submit to {part.exerciseSubmissionLink}</div>
          <br />
        </div>
      );

    case 'special':
      return (
        <div>
          <div>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>required skills: {part.requirements.join(', ')}</div>
          <br />
        </div>
      );

    default:
      return assertNever(part);
  }
};

export default Part;
