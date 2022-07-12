import {
  Gender,
  NewPatient,
  Entry,
  NewEntry,
  HealthCheckRating,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date:' + date);
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

export const isEntry = (entry: unknown): entry is Entry => {
  const castEntry = entry as Entry;
  if (
    !castEntry.date ||
    !castEntry.specialist ||
    !isDate(castEntry.date) ||
    !isString(castEntry.specialist)
  ) {
    return false;
  }
  switch (castEntry.type) {
    case 'Hospital':
      if (!castEntry.discharge) {
        return false;
      }
      break;
    case 'OccupationalHealthcare':
      if (!castEntry.employerName || !isString(castEntry.employerName)) {
        return false;
      }
      break;
    case 'HealthCheck':
      if (
        !Object.values(HealthCheckRating).includes(castEntry.healthCheckRating)
      ) {
        return false;
      }
      break;
    default:
      return false;
  }

  return true;
};

const parseEntries = (entries: unknown): Array<Entry> => {
  const castEntries = entries as Array<unknown>;
  for (let i = 0; i < castEntries.length; i++) {
    if (!isEntry(castEntries[i])) {
      console.log(castEntries[i]);
      throw new Error('Incorrect or missing entries');
    }
  }
  return castEntries as Array<Entry>;
};

export interface Fields {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
}

export const toNewEntry = (entry: unknown): NewEntry => {
  if (isEntry(entry)) {
    return entry as NewEntry;
  } else {
    throw new Error('Malformatted entry');
  }
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };
  return newEntry;
};
