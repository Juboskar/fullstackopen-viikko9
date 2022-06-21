import patientData from '../../data/patients.json';

import { NonSensitivePatientEntry, PatientEntry } from '../types';

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

const addPatient = (patient: PatientEntry): NonSensitivePatientEntry => {
  patients.push(patient);
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  };
};

export default {
  getEntries,
  addPatient,
};
