import { useParams } from 'react-router-dom';
import { addPatient, useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import { Entry, Patient } from '../types';
import axios from 'axios';
import GenderIcon from '../components/GenderIcon';
import React from 'react';
import EntryList from './EntryList';
import AddEntryModal from '../AddEntryModal';
import { Button } from '@material-ui/core';
import { AddEntryFormValues } from '../AddEntryModal/AddEntryForm';
// import AddEntryForm from './AddEntryForm';

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

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

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const openModal = (): void => setModalOpen(true);

  const patient = patients[id as string];

  const submitNewEntry = async (values: AddEntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}`,
        values
      );
      const updatedPatient = {...patient, entries: patient.entries.concat(newEntry)};
      dispatch(addPatient(updatedPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

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
      <AddEntryModal
        onSubmit={submitNewEntry}
        onClose={() => closeModal()}
        modalOpen={modalOpen}
        error={error}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
