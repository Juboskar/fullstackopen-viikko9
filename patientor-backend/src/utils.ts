import { v1 as uuid } from 'uuid';
import {
  Discharge,
  DischargeFields,
  Entry,
  EntryFields,
  Fields,
  Gender,
  HealthCheckRating,
  Patient,
  SickLeave,
  SickLeaveFields,
} from './types';

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
    throw new Error('Incorrect or missing string value:' + text);
  }
  return text;
};

const isType = (text: unknown): text is string => {
  return (
    text === 'Hospital' ||
    text === 'OccupationalHealthcare' ||
    text === 'HealthCheck'
  );
};

const parseType = (text: unknown): string => {
  if (!text || !isType(text)) {
    throw new Error('Incorrect or missing type: ' + text);
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

const isStringArray = (arr: unknown): arr is string[] => {
  return Array.isArray(arr) && !arr.some((v) => typeof v !== 'string');
};

const parseStringArray = (arr: unknown): string[] | undefined => {
  if (arr === undefined) return undefined;
  if (!isStringArray(arr)) {
    throw new Error('Incorrect diagnoselist: ' + arr);
  }
  return arr;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      'Incorrect or missing healtCheckRating: ' + healthCheckRating
    );
  }
  return healthCheckRating;
};

const toDischarge = (dis: DischargeFields): Discharge => {
  const discharge = {
    date: parseDate(dis.date),
    criteria: parseStringValue(dis.criteria),
  };
  return discharge;
};

const toSickLeave = (slf: SickLeaveFields): SickLeave | undefined => {
  if (slf === undefined) {
    return undefined;
  }
  const sickLeave = {
    startDate: parseDate(slf.startDate),
    endDate: parseDate(slf.endDate),
  };
  return sickLeave;
};

export const toNewPatientEntry = ({
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

export const toNewEntry = (entryfields: EntryFields): Entry => {
  const id = uuid();
  const newEntry = {
    id: id,
    description: parseStringValue(entryfields.description),
    date: parseDate(entryfields.date),
    specialist: parseStringValue(entryfields.specialist),
    diagnosisCodes: parseStringArray(entryfields.diagnosisCodes),
  };
  switch (parseType(entryfields.type)) {
    case 'Hospital':
      return {
        type: 'Hospital',
        ...newEntry,
        discharge: toDischarge(entryfields.discharge as DischargeFields),
      };
    case 'OccupationalHealthcare':
      return {
        type: 'OccupationalHealthcare',
        ...newEntry,
        employerName: parseStringValue(entryfields.employerName),
        sickLeave: toSickLeave(entryfields.sickLeave as SickLeaveFields),
      };
    case 'HealthCheck':
      return {
        type: 'HealthCheck',
        ...newEntry,
        healthCheckRating: parseHealthCheckRating(
          entryfields.healthCheckRating
        ),
      };
    default:
      throw new Error('incorrect type');
  }
};
