import { useParams } from 'react-router-dom';
import { addPatient, useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import axios from 'axios';
import GenderIcon from '../components/GenderIcon';

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  if (!id) return <div></div>;

  const patient = patients[id];
  if (!patient) {
    return <div>user not found</div>;
  }

  const getMissingInfo = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(addPatient(patientFromApi));
    } catch (e) {
      console.error(e);
    }
  };

  if (!patient.ssn) {
    void getMissingInfo();
  }

  return (
    <div>
      <h2>
        {patient.name} <GenderIcon gender={patient.gender} />
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientPage;
