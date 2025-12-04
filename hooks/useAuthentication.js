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
    let mounted = true;

    const checkAuthentication = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("auth-user");

        if (!mounted) return;

        if (storedUser) {
          const userData = JSON.parse(storedUser);
          dispatch(setUser({ user: userData }));
          router.replace("/(dashboard)/home");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuthentication();

    // Fallback timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (mounted) {
        console.warn("Auth check timeout reached");
        setIsLoading(false);
      }
    }, 3000);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [dispatch, router]);

  return { isLoading };
};

export default useAuthentication;
