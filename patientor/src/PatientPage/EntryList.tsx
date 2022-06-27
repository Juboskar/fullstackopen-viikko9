import { useStateValue } from '../state';
import { Entry } from '../types';
import EntryDetails from './EntryDetails';

const EntryList = ({ entries }: { entries?: Entry[] }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div>
      {entries?.map((e: Entry) => (
        <div
          key={e.id}
          style={{
            border: '1px solid',
            borderRadius: '5px',
            padding: '10px',
            marginTop: '5px',
            marginBottom: '5px',
          }}
        >
          <div style={{ color: 'red' }}>{e.type}</div>
          <div>{e.date}</div>
          <div>
            <em>{e.description}</em>
          </div>
          <ul>
            {e.diagnosisCodes?.map((d) => (
              <li key={d}>
                {d} {diagnoses[d]?.name}
              </li>
            ))}
          </ul>
          <EntryDetails entry={e} />
          <div>diagnose by {e.specialist}</div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default EntryList;
