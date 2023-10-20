import patientsData from '../../data/patients';
import { Patients, NonSensitivePatients, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Patients[] = patientsData;
const nonSensitivePatients: NonSensitivePatients[] = patientsData
  .map(({id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));

const getPatients = () => {
  return patients;
};

const getNonSensitivePatients = () => {
  return nonSensitivePatients;
};

const addPatient = (patient: NewPatient): Patients => {
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