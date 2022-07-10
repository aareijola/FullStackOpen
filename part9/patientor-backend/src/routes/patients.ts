import patientService from '../services/patientService';
import express from 'express';
import toNewPatient from '../utils';
import { Fields } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body as Fields);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e: unknown) {
    let msg = 'Something went wrong:';
    if (e instanceof Error) {
      msg += 'Error:' + e.message;
    }
    res.status(400).send(msg);
  }
});

export default router;
