import rawPatientData from '../../data/patients.json';

import { NonSensitivePatientEntry, PatientEntry } from '../types';

const patientData = rawPatientData as PatientEntry[];
for (let i = 0; i < patientData.length; i++) {
  if (patientData[i].entries === undefined) patientData[i].entries = [];
}

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

const getOneById = (id: string): PatientEntry => {
  const patient = patientData.filter((patient) => patient.id === id)[0];
  if (!patient) {
    throw new Error('patient not found');
  }
  return patient;
};

export default {
  getEntries,
  addPatient,
  getOneById,
};
