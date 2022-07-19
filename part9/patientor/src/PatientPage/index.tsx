import axios from "axios";
import React from "react";
import { apiBaseUrl } from "../constants";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { addEntryToPatient, updatePatient, useStateValue } from "../state";
import {
  Patient,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../types";
import { Male, Female, MedicalServices, Work } from "@mui/icons-material";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const HospitalEntryComponent = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "5px",
        padding: "3px",
        paddingLeft: "10px",
      }}
    >
      <p>
        {entry.date + " "}
        <MedicalServices />
      </p>
      <div>
        {entry.diagnosisCodes?.map((d) => (
          <div key={d}>
            <i>- {diagnoses[d].name}</i>
          </div>
        ))}
      </div>
      <div>
        Discharge: {entry.discharge.date}: {entry.discharge.criteria} &#9989;
      </div>
      <br />
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};

const OccupationalHealthcareEntryComponent = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "5px",
        padding: "3px",
        paddingLeft: "10px",
      }}
    >
      <p>
        {entry.date + " "}
        <Work />
        <i> {entry.employerName}</i>
      </p>
      <div>
        <i>{entry.description}</i>
      </div>
      <br></br>
      <div>
        {entry.diagnosisCodes?.map((d) => (
          <div key={d}>
            <i>- {diagnoses[d].name}</i>
          </div>
        ))}
      </div>
      {entry.sickLeave ? (
        <div>
          <br />
          on sick leave: {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate} 🛌
        </div>
      ) : null}
      <br />
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};

const HealthCheckEntryComponent = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses }] = useStateValue();
  const healthEmojis = ["💚", "💛", "🧡", "💔"];
  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "5px",
        padding: "3px",
        paddingLeft: "10px",
      }}
    >
      <p>
        {entry.date + " "}
        <MedicalServices />
      </p>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>
        {entry.diagnosisCodes?.map((d) => (
          <div key={d}>
            <i>- {diagnoses[d].name}</i>
          </div>
        ))}
      </div>
      <div>{healthEmojis[entry.healthCheckRating]}</div>
      <br />
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};

const EntryComponent = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComponent entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => setModalOpen(false);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id as string}/entries`,
        values
      );
      dispatch(addEntryToPatient(newEntry, patient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
      }
    }
  };

  const updatePatientData = async (id: string) => {
    try {
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(updatePatient(patient));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
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
    case "male":
      genderIcon = <Male />;
      break;
    case "female":
      genderIcon = <Female />;
      break;
    default:
      genderIcon = null;
  }

  return (
    <div>
      <h2>
        {patient.name + " "}
        {genderIcon}
      </h2>
      <p>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>
      {patient.entries?.length === 0 ? null : (
        <p>
          <b>Entries</b>
        </p>
      )}
      {!patient.entries
        ? null
        : patient.entries.map((e) => <EntryComponent entry={e} key={e.id} />)}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add new entry
      </Button>
    </div>
  );
};

export default PatientPage;
