import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

const useNetInfo = () => {
  const [hasNet, setHasNet] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setHasNet(state.isConnected);
    });

    return () => unsubscribe();
  });

  return hasNet;
};

export default useNetInfo;
