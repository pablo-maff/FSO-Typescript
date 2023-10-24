import { Gender, NewPatient } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
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
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender ${gender}`);
  }

  return gender;
};

const isObject = (object: unknown): object => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  return object;
};

const toNewPatient = (object: unknown): NewPatient => {
  const parsedObject = isObject(object);

  if (
    "name" in parsedObject &&
    "dateOfBirth" in parsedObject &&
    "ssn" in parsedObject &&
    "occupation" in parsedObject &&
    "gender" in parsedObject
  ) {
    const newPatient: NewPatient = {
      name: parseName(parsedObject.name),
      dateOfBirth: parseDate(parsedObject.dateOfBirth),
      ssn: parseSsn(parsedObject.ssn),
      occupation: parseOccupation(parsedObject.occupation),
      gender: parseGender(parsedObject.gender),
      entries: [],
    };

    return newPatient;
  }

  throw new Error("Icorrect data: some fields are missing");
};

// const isEntry = (param: string): param is EntryType => {
//   return Object.values(EntryType)
//     .map((e) => e.toString())
//     .includes(param);
// };

// const parseEntryType = (entryType: unknown): EntryType => {
//   if (!entryType || !isString(entryType) || !isEntry(entryType)) {
//     throw new Error(`Incorrect or missing entry type ${entryType}`);
//   }

//   return entryType;
// };

// const parseEntries = (object: unknown): BaseEntry => {
//   const parsedObject = isObject(object);

//   if (
//     "type" in parsedObject &&
//     "id" in parsedObject &&
//     "description" in parsedObject &&
//     "date" in parsedObject &&
//     "specialist" in parsedObject
//   ) {
//     const entry: BaseEntry = {
//       id: parsedObject.id,
//       description: parsedObject.description,
//       type: parseEntryType(parsedObject.type),
//       date: parsedObject.date,
//       specialist: parsedObject.specialist
//     };
//     return entry;
//   }

//   throw new Error("Incorrect data: some fields are missing")
// };

const parseId = (id: unknown): string => {
  if (!isString(id)) {
    throw new Error(`Incorrect or missing id ${id}`);
  }

  return id;
};

const extractRequestId = (object: unknown): string => {
  const parsedObject = isObject(object);

  if ("id" in parsedObject) {
    return parseId(parsedObject.id);
  }

  throw new Error("Incorrect or missing id");
};

export { toNewPatient, extractRequestId };
