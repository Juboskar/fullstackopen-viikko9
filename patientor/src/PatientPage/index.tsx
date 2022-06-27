import { useParams } from 'react-router-dom';
import { addPatient, useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import axios from 'axios';
import GenderIcon from '../components/GenderIcon';
import React from 'react';
import EntryList from './EntryList';

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
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
      <EntryList entries={patient.entries} />
    </div>
  );
};

export default PatientPage;
