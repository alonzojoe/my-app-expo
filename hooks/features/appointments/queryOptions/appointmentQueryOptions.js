import { queryOptions } from "@tanstack/react-query";
import { getAppointments } from "../../../../services/Medical/apiCalls";
import { getWaitlisted } from "../../../../services/Medical/apiCalls";

export const createAppointmentQueryOptions = async (PatientNo) => {
  return queryOptions({
    queryKey: ["appointments", PatientNo],
    queryFn: () => getAppointments(PatientNo),
    refetchOnMount: "always",
  });
};

export const createWaitlistedQueryOptions = async (payload) => {
  return queryOptions({
    queryKey: ["waitlisted"],
    queryFn: () => getWaitlisted(payload),
    refetchOnMount: "always",
  });
};
