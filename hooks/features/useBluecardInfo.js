import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CIVIL_STATUS } from "../../constants/global";
import moment from "moment";

const useBluecardInfo = () => {
  const { authUser } = useSelector((state) => state.auth);

  const label = useMemo(
    () => CIVIL_STATUS.find((c) => c.id === authUser?.CivilStatusID),
    [authUser]
  );

  const PatientInfo = {
    name: authUser?.FullName,
    birthdate: moment(authUser?.BirthDate).format("MMMM DD, YYYY"),
    address: "-",
    gender: authUser?.Gender === "F" ? "FEMALE" : "MALE",
    civilStatus: label,
    dateissued: "-",
  };

  return PatientInfo;
};

export default useBluecardInfo;
