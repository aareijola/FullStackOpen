import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import { updatePatient, useStateValue } from '../state';
import { Patient } from '../types';
import { Male, Female } from '@mui/icons-material';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const updatePatientData = async (id: string) => {
    try {
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(updatePatient(patient));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
      } else {
        console.error('Unknown error', e);
      }
    }
  };

  if (!id) {
    return null;
  }
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];
  if (!patient) {
    return null;
  }
  if (!patient.ssn) {
    void updatePatientData(id);
  }
  let genderIcon = null;
  switch (patient.gender) {
    case 'male':
      genderIcon = <Male />;
      break;
    case 'female':
      genderIcon = <Female />;
      break;
    default:
      genderIcon = null;
  }

  return (
    <div>
      <h2>
        {patient.name + ' '}
        {genderIcon}
      </h2>
      <p>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>
    </div>
  );
};

export default PatientPage;
