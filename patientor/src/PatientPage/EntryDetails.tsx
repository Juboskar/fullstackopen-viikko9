import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';
import { assertNever } from '../utils';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      {entry.discharge.criteria}: {entry.discharge.date}
    </div>
  );
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  let color;
  switch (entry.healthCheckRating) {
    case 0:
      color = 'green';
      break;
    case 1:
      color = 'yellow';
      break;
    case 2:
      color = 'red';
      break;
    case 3:
      color = 'darkred';
      break;
  }
  return (
    <div>
      <FavoriteIcon style={{ color: color }} />
    </div>
  );
};

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <div>Employer: {entry.employerName}</div>
      sickleave: {entry.sickLeave?.startDate}-{entry.sickLeave?.endDate}{' '}
    </div>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
