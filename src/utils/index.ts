import { Gender, NewPatient } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error(`Incorrect or missing name ${name}`);
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date ${date}`);
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error(`Incorrect or missing ssn ${ssn}`);
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error(`Icorrect or missing occupation ${occupation}`);
  }

  return occupation;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender ${gender}`);
  }

  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'occupation' in object && 'gender' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender)
    };

    return newPatient;
  }

  throw new Error('Icorrect data: some fields are missing');
};

export default toNewPatient;