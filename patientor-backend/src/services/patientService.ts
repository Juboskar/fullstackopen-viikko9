import patientData from '../../data/entries';

import { Entry, NonSensitivePatientEntry, Patient } from '../types';

const patients: Array<NonSensitivePatientEntry> = patientData;

const getEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: Patient): NonSensitivePatientEntry => {
  patients.push(patient);
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  };
};

const addEntryToPatient = (entry: Entry, id: string): Entry => {
  const patient = patientData.filter((p) => p.id === id)[0];
  if (!patient) {
    throw new Error('incorrect id');
  }
  patient.entries.push(entry);
  return entry;
};

const getOneById = (id: string): Patient => {
  const patient = patientData.filter((patient) => patient.id === id)[0];
  if (!patient) {
    throw new Error('patient not found');
  }
  return patient;
};

export default { addEntryToPatient, getEntries, addPatient, getOneById };
