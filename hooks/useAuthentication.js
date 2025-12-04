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
      try {
        const storedUser = await AsyncStorage.getItem("auth-user");

        if (storedUser) {
          const userData = JSON.parse(storedUser);
          dispatch(setUser({ user: userData }));
          console.log("Redirecting, user found:", userData);

          setTimeout(() => {
            router.replace("/(dashboard)/home");
          }, 100);
        }
      } catch (error) {
        console.log("Error checking user authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  return { isLoading };
};

export default useAuthentication;
