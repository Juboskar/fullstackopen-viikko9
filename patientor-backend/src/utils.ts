import { v1 as uuid } from 'uuid';
import { Fields, Gender, Patient } from './types';

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringValue = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing name, ssn or occupation:' + text);
  }
  return text;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): Patient => {
  const id = uuid();
  const newEntry: Patient = {
    id: id,
    name: parseStringValue(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseStringValue(ssn),
    gender: parseGender(gender),
    occupation: parseStringValue(occupation),
    entries: [],
  };

  return newEntry;
};

export default toNewPatientEntry;
