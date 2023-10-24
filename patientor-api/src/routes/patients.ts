import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatient, extractRequestId, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = patientsService.getNonSensitivePatients();

  res.send(data);
});

router.get("/:id", (req, res) => {
  try {
    const id = extractRequestId(req.params);

    const patient = patientsService.getPatient(id);

    res.json(patient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient);

    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const id = extractRequestId(req.params);
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientsService.addEntry(id, newEntry);

    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;
