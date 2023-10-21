import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = patientsService.getNonSensitivePatients();

  res.send(data);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient);

    res.status(201).json(addedPatient);
  } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';

      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }

      res.status(400).json({
        error: errorMessage
      });
    }
  });

export default router;