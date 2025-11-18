import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../../../services/Medical/apiCalls";

const useMedicalrecords = () => {
  const { authUser } = useSelector((state) => state.auth);

  const PatientID = authUser?.PatientID;

  const {
    data: MEDICAL_RECORDS,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transaction", PatientID],
    queryFn: () => fetchTransactions(PatientID),
  });

  const filteredRecords = useMemo(() => {
    const query = (searchDebounce || "").trim().toLowerCase();
    if (!Array.isArray(MEDICAL_RECORDS) || MEDICAL_RECORDS.length === 0)
      return [];
    return MEDICAL_RECORDS.filter(
      (record) =>
        (record.transactionNo || "").toLowerCase().includes(query) ||
        (record.transactionDate || "").toLowerCase().includes(query)
    );
  }, [searchDebounce, MEDICAL_RECORDS]);

  console.log("filtered", filteredRecords);

  const selectRecord = useCallback((medical) => {
    setSelected(medical);
  }, []);

  return {
    MEDICAL_RECORDS,
    isFetching,
    error,
    refetch,
    authUser,
    PatientID,
    filteredRecords,
    selectRecord,
  };
};

export default useMedicalrecords;
