import diagnosesData from '../../data/diagnoses';
import { Diagnoses } from '../types/types';

const diagnoses: Diagnoses[] = diagnosesData;

const getDiagnoses = (): Diagnoses[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};