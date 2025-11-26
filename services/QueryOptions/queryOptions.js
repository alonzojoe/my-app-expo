import { queryOptions } from "@tanstack/react-query";
import {
  fetchPhysicians,
  fetchDiagnosis,
  fetchLabResults,
} from "../Medical/apiCalls";

export const createPhysiciansQueryOptions = (PatientHistoryID, ReferID) => {
  return queryOptions({
    queryKey: ["physicians", PatientHistoryID, ReferID],
    queryFn: () => fetchPhysicians(PatientHistoryID, ReferID),
    staleTime: 1000 * 30, //30secs
  });
};

export const createDiagnosisQueryOptions = (PatientHistoryID, ReferID) => {
  return queryOptions({
    queryKey: ["diagnosis", PatientHistoryID, ReferID],
    queryFn: () => fetchDiagnosis(PatientHistoryID, ReferID),
    staleTime: 1000 * 30,
  });
};

export const createLabQueryOptions = (PatientHistoryID) => {
  return queryOptions({
    queryKey: ["diagnosis", PatientHistoryID],
    queryFn: () => fetchLabResults(PatientHistoryID),
    staleTime: 1000 * 30,
  });
};
