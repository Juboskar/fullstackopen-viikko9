import { Field, Form, Formik } from 'formik';
import { Grid, Button } from '@material-ui/core';
import {
  DiagnosisSelection,
  HealthCheckOption,
  SelectField,
  TextField,
  TypeField,
  TypeOption,
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Discharge, HealthCheckRating, SickLeave } from '../types';
import { useState } from 'react';

export type AddEntryFormValues = {
  type: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';
  description: string;
  date: string;
  specialist: string;
  healthCheckRating: HealthCheckRating;
  discharge: Discharge;
  employerName: '';
  sickLeave: SickLeave;
};

interface Props {
  onSubmit: (values: AddEntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckOptions: HealthCheckOption[] = [
  { value: 0, label: 'Healthy' },
  { value: 1, label: 'LowRisk' },
  { value: 2, label: 'HighRisk' },
  { value: 3, label: 'CriticalRisk' },
];

const typeOptions: TypeOption[] = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
  { value: 'Hospital', label: 'Hospital' },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const [typeState, setType] = useState<TypeOption>({
    value: 'HealthCheck',
    label: 'Health Check',
  });

  const handleOnClick = (t: TypeOption) => {
    setType(t);
  };

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        healthCheckRating: 0,
        discharge: { criteria: '', date: '' },
        employerName: '',
        sickLeave: { startDate: '', endDate: '' },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
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
            <TypeField
              label="Type"
              name="type"
              options={typeOptions}
              action={handleOnClick}
            />

            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <div>
              {typeState.value === 'HealthCheck' && (
                <SelectField
                  label="Health rating"
                  name="healthCheckRating"
                  options={healthCheckOptions}
                />
              )}
            </div>

            <div>
              {typeState.value === 'Hospital' && (
                <>
                  <Field
                    label="Discharge date"
                    name="discharge.date"
                    placeholder="Discharge date"
                    component={TextField}
                  />
                  <Field
                    label="Discharge criteria"
                    name="discharge.criteria"
                    placeholder="Discharge criteria"
                    component={TextField}
                  />
                </>
              )}
            </div>

            <div>
              {typeState.value === 'OccupationalHealthcare' && (
                <>
                  <Field
                    label="Employer"
                    name="employerName"
                    placeholder="Employer"
                    component={TextField}
                  />
                  <Field
                    label="Sickleave start"
                    name="sickLeave.start"
                    placeholder="Sickleave start"
                    component={TextField}
                  />
                  <Field
                    label="Sickleave end"
                    name="sickLeave.end"
                    placeholder="Sickleave end"
                    component={TextField}
                  />
                </>
              )}
            </div>

            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: 'left' }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: 'right',
                }}
                type="submit"
                variant="contained"
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
