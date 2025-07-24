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
    setIsLoading(true);
    const checkUser = async () => {
      console.clear();
      try {
        const storedUser = await AsyncStorage.getItem("auth-user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          dispatch(setUser({ user: userData }));
          console.log("Redirecting, user found:", userData);
          router.replace("/home");
        } else {
          console.log("No user found, staying on login screen");
        }
      } catch (error) {
        console.log("Error checking user authentication:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    checkUser();
  }, []);

  return { isLoading };
};

export default useAuthentication;
