import { useStateValue } from "../state";
import { Entry, EntryType } from "../types";
import { Button, Grid } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import {
  DiagnosisSelection,
  TextField,
  SelectField,
} from "../AddPatientModal/FormField";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export interface TypeOption {
  value: EntryType;
  label: string;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.HealthCheck, label: "Health check" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational healthcare" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (values.type !== "Hospital") {
          errors.type = "Only hospital type allowed currently";
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <SelectField label="Type" name="type" options={typeOptions} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
                <p>Adding NYI, submitted values are printed to console</p>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
