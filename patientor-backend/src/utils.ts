import { v1 as uuid } from 'uuid';
import { PatientEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringValue = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing info');
  }
  return text;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): PatientEntry => {
  const id = uuid();
  const newEntry: PatientEntry = {
    id: id,
    name: parseStringValue(name),
    dateOfBirth: parseStringValue(dateOfBirth),
    ssn: parseStringValue(ssn),
    gender: parseStringValue(gender),
    occupation: parseStringValue(occupation),
  };

  return newEntry;
};

export default toNewPatientEntry;
