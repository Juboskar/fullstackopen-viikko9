import patientData from '../../data/patients.json';

import { NonSensitivePatientEntry } from '../types';

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

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
};
