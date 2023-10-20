import patientsData from '../../data/patients';
import { Patients, NonSensitivePatients } from '../types';

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

export default {
  getPatients,
  getNonSensitivePatients
};