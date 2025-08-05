import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useRouter } from "expo-router";

const useNetInfo = () => {
  const [hasNet, setHasNet] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setHasNet(state.isConnected);
    });

    return () => unsubscribe();
  });

  if (!hasNet) {
    router.replace("/nointernet");
    return null;
  }

  return hasNet;
};

export default useNetInfo;
