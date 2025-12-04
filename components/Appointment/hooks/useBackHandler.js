import { useEffect } from "react";
import { BackHandler, Alert } from "react-native";
import { useRouter } from "expo-router";

/**
 * Custom hook to handle Android hardware back button
 * @param {Object} options
 * @param {function} [options.onBackPress] - optional custom callback function
 * @param {string} [options.routePath] - optional route path to navigate when back pressed
 * @param {boolean} [options.exitOnBack=false] - whether to exit the app
 */
const useBackHandler = ({
  onBackPress,
  routePath,
  exitOnBack = false,
} = {}) => {
  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      if (onBackPress) {
        onBackPress();
        return true;
      }

      if (routePath) {
        router.replace(routePath);
        return true;
      }

      if (exitOnBack) {
        Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
          { text: "Cancel", onPress: () => null, style: "cancel" },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [onBackPress, routePath, exitOnBack, router]);
};

export default useBackHandler;
