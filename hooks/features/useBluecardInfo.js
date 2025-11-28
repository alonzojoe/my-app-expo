import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CIVIL_STATUS } from "../../constants/global";
import moment from "moment";

const useBluecardInfo = () => {
  const { authUser } = useSelector((state) => state.auth);

  const label = useMemo(
    () => CIVIL_STATUS.find((c) => c.id === authUser?.CivilStatus),
    [authUser]
  );

  const PatientInfo = {
    name: `${authUser?.LastName}, ${authUser?.FirstName} ${authUser?.MiddleName} `,
    birthdate: authUser?.BirthDate,
    address: `${authUser?.MunicipalityName}, ${authUser?.ProvinceName}`,
    gender: authUser?.Gender === "F" ? "FEMALE" : "MALE",
    civilstatus: label?.name,
    dateissued: "-",
    patientno: authUser?.PatientNo,
    qrcontent: `JBL-${authUser?.PatientNo}`,
  };

  console.log("pinfo", PatientInfo);
  console.log("authUser", authUser);

  return PatientInfo;
};

export default useBluecardInfo;
