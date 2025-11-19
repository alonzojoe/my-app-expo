import { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../../../services/Medical/apiCalls";
import useDebounce from "./../../useDebounce";
import { formatDate } from "./../../../libs/utils";

const useMedicalrecords = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(null);
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

  const searchDebounce = useDebounce(searchQuery);

  const filteredRecords = useMemo(() => {
    const query = (searchDebounce || "").trim().toLowerCase();
    if (!Array.isArray(MEDICAL_RECORDS) || MEDICAL_RECORDS.length === 0)
      return [];
    return MEDICAL_RECORDS.map((record) => ({
      ...record,
      transDate: formatDate(record.AdmissionDateTime),
    })).filter(
      (record) =>
        (record.TransactionNo || "").toLowerCase().includes(query) ||
        (record.transDate || "").toLowerCase().includes(query)
    );
  }, [searchDebounce, MEDICAL_RECORDS]);

  console.log("filtered", filteredRecords);

  const selectRecord = useCallback((medical) => {
    setSelected(medical);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchDebounce,
    MEDICAL_RECORDS,
    isFetching,
    error,
    refetch,
    authUser,
    PatientID,
    filteredRecords,
    selected,
    selectRecord,
  };
};

export default useMedicalrecords;
