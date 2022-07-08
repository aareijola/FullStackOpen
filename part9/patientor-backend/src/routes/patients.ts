import patientService from '../services/patientService';
import express from 'express';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
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
