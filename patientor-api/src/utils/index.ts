import {
  Diagnose,
  Discharge,
  EntryType,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatient,
  SickLeave,
} from "../types";

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
    throw new Error(`Not an object: ${object}`);
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

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error(`Incorrect or missing description ${description}`);
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error(`Incorrect or missing specialist ${specialist}`);
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  const parsedObject = isObject(object);

  if (!("diagnosisCodes" in parsedObject)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }

  return parsedObject.diagnosisCodes as Array<Diagnose["code"]>;
};

const isNumber = (value: unknown): value is number => {
  return (
    typeof value === "number" ||
    value instanceof Number ||
    !isNaN(Number(value))
  );
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v)
    .includes(param);
};

const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
  const parsedObject = isObject(object);

  if (
    "healthCheckRating" in parsedObject &&
    isNumber(parsedObject.healthCheckRating) &&
    isHealthCheckRating(Number(parsedObject.healthCheckRating))
  ) {
    return Number(parsedObject.healthCheckRating);
  }

  throw new Error(`Incorrect or missing healthCheckRating`);
};

const isDischarge = (object: unknown): object is Discharge => {
  const parsedObject = isObject(object);

  return (
    "date" in parsedObject &&
    "criteria" in parsedObject &&
    isString(parsedObject.date) &&
    isDate(parsedObject.date) &&
    isString(parsedObject.criteria)
  );
};

const parseDischarge = (object: unknown): Discharge => {
  const parsedObject = isObject(object);

  if ("discharge" in parsedObject && isDischarge(parsedObject.discharge)) {
    return parsedObject.discharge;
  }

  throw new Error(`Incorrect or missing discharge`);
};

const parseEmployerName = (object: unknown): string => {
  const parsedObject = isObject(object);

  if ("employerName" in parsedObject && isString(parsedObject.employerName)) {
    return parsedObject.employerName;
  }

  throw new Error("Incorrect or missing employerName");
};

const isSickLeave = (object: unknown): object is SickLeave => {
  const parsedObject = isObject(object);

  return (
    "startDate" in parsedObject &&
    "endDate" in parsedObject &&
    isString(parsedObject.startDate) &&
    isString(parsedObject.endDate) &&
    isDate(parsedObject.startDate) &&
    isDate(parsedObject.endDate)
  );
};

const parseSickLeave = (object: unknown): SickLeave | undefined => {
  const parsedObject = isObject(object);

  if (!("sickLeave" in parsedObject)) {
    return undefined;
  }

  if (isSickLeave(parsedObject.sickLeave)) {
    return parsedObject.sickLeave;
  }

  throw new Error(`Incorrect sickLeave`);
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const toNewEntry = (object: unknown): NewEntry => {
  const parsedObject = isObject(object);

  if (
    "type" in parsedObject &&
    "description" in parsedObject &&
    "date" in parsedObject &&
    "specialist" in parsedObject
  ) {
    const baseEntry = {
      description: parseDescription(parsedObject.description),
      date: parseDate(parsedObject.date),
      specialist: parseSpecialist(parsedObject.specialist),
      diagnosisCodes: parseDiagnosisCodes(parsedObject),
    };

    switch (parsedObject.type) {
      case EntryType.HealthCheck:
        return {
          ...baseEntry,
          type: EntryType.HealthCheck,
          healthCheckRating: parseHealthCheckRating(parsedObject),
        };

      case EntryType.Hospital:
        return {
          ...baseEntry,
          type: EntryType.Hospital,
          discharge: parseDischarge(parsedObject),
        };

      case EntryType.OccupationalHealthcare:
        return {
          ...baseEntry,
          type: EntryType.OccupationalHealthcare,
          employerName: parseEmployerName(parsedObject),
          sickLeave: parseSickLeave(parsedObject),
        };

      default:
        return assertNever(object as never);
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};

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

export { toNewPatient, extractRequestId, toNewEntry };
