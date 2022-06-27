import { useParams } from 'react-router-dom';
import { addPatient, useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import { Entry, Patient } from '../types';
import axios from 'axios';
import GenderIcon from '../components/GenderIcon';
import React from 'react';

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const getMissingInfo = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id as string}`
        );
        dispatch(addPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (patients[id as string] === undefined || !patients[id as string].ssn) {
      void getMissingInfo();
    }
  }, [dispatch]);

  const patient = patients[id as string];

  if (patients[id as string] === undefined) {
    return <div>patient not found</div>;
  }

  return (
    <div>
      <h2>
        {patient.name} <GenderIcon gender={patient.gender} />
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      <div>
        {patient.entries?.map((e: Entry) => (
          <div key={e.id}>
            {e.date} <em>{e.description}</em>
            <ul>
              {e.diagnosisCodes?.map((d) => (
                <li key={d}>
                  {d} {diagnoses[d]?.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
