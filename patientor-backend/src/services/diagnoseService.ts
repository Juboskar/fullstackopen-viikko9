import diagnoseData from '../../data/diagnoses.json';

import { DiagnoseEntry } from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnoseData;

const getEntries = () => {
  return diagnoses;
};

export default {
  getEntries,
};
