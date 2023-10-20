/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientsService.getNonSensitivePatients();

  res.send(data);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const addedPatient = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });

  res.status(201).json(addedPatient);
});

export default router;