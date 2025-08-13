import { useSelector } from "react-redux";
import { CIVIL_STATUS } from "../../constants/global";

const useBluecardInfo = () => {
  const { authUser } = useSelector((state) => state.auth);
};

export default useBluecardInfo;
