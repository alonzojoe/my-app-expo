import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/auth-slice";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      console.clear();
      try {
        const storedUser = await AsyncStorage.getItem("auth-user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          dispatch(setUser({ user: userData }));
          console.log("Redirecting, user found:", userData);

          try {
            router.replace("/(dashboard)/home");
          } catch (navError) {
            console.log("Navigation error:", navError);
            setIsLoading(false);
          }
        } else {
          console.log("No user found, staying on login screen");
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error checking user authentication:", error);
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  return { isLoading };
};
export default useAuthentication;
