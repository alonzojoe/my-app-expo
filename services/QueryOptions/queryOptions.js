import { queryOptions } from "@tanstack/react-query";
import { fetchPhysicians } from "../Medical/apiCalls";

export const createPhysiciansQueryOptions = (PatientHistoryID, ReferID) => {
  return queryOptions({
    queryKey: ["Physicians", PatientHistoryID, ReferID],
    queryFn: () => fetchPhysicians(PatientHistoryID, ReferID),
    staleTime: 1000 * 30, //30secs
  });
};
