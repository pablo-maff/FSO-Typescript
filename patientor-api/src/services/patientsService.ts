import patientsData from '../../data/patients';
import { Patient, NonSensitivePatients, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = patientsData;
const nonSensitivePatients: NonSensitivePatients[] = patientsData
  .map(({id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return nonSensitivePatients;
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuidv4();

  const newPatient = {
    id,
    ...patient
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};