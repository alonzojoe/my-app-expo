import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  IconButton,
} from "react-native-paper";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import store from "../store";
import useNetInfo from "../hooks/useNetInfo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ToastManager from "toastify-react-native/components/ToastManager";

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#004C82",
  },
};

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const hasNet = useNetInfo();
  const theme = Colors.light;
  const router = useRouter();
  const queryClient = new QueryClient();
  console.log(theme);

  console.log("hasNet?: ", hasNet);
  return (
    // <View style={{ flex: 1 }}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PaperProvider theme={appTheme}>
            <StatusBar style="auto" />
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme.navBackground,
                },
                headerTintColor: theme.title,
                headerTitleAlign: "center",
              }}
            >
              <Stack.Screen
                name="index"
                options={{
                  title: "Home",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(auth)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(dashboard)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="about"
                options={{ title: "About Page", headerShown: true }}
              />
              {/* <Stack.Screen
          name="faqs"
          options={{ title: "FAQ", headerShown: true }}
        /> */}
              <Stack.Screen
                name="faqs"
                options={{
                  title: "FAQ",
                  headerShown: true,
                  headerLeft: () => (
                    <IconButton
                      icon="arrow-left"
                      onPress={() => router.replace("/(dashboard)/home")}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="medical"
                options={{
                  title: "Medical Records",
                  headerShown: true,
                  headerLeft: () => (
                    <IconButton
                      icon="arrow-left"
                      onPress={() => router.replace("/(dashboard)/home")}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="bluecard"
                options={{
                  title: "My Virtual Blue Card",
                  headerShown: true,
                  headerLeft: () => (
                    <IconButton
                      icon="arrow-left"
                      onPress={() => router.replace("/(dashboard)/profile")}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="onlineappointment"
                options={{
                  title: "Appointment Details",
                  headerShown: true,
                  headerLeft: () => (
                    <IconButton
                      icon="arrow-left"
                      onPress={() => router.replace("/(dashboard)/home")}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="onsiteappointment"
                options={{
                  title: "Appointment Details",
                  headerShown: true,
                  headerLeft: () => (
                    <IconButton
                      icon="arrow-left"
                      onPress={() => router.replace("/(dashboard)/home")}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="rate"
                options={{
                  title: "Rate",
                  headerShown: true,
                  headerLeft: () => (
                    <IconButton
                      icon="arrow-left"
                      onPress={() => router.replace("/(dashboard)/profile")}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="registration"
                options={{
                  title: "Account Activation",
                  headerShown: true,
                  headerLeft: () => (
                    <IconButton
                      icon="arrow-left"
                      onPress={() => router.replace("/")}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="nointernet"
                options={{
                  title: "No Internet",
                  headerShown: false,
                }}
              />
            </Stack>
          </PaperProvider>
        </Provider>
      </QueryClientProvider>
      <ToastManager />
    </GestureHandlerRootView>
    //Stack component Renders child component with page title and back button
    //Slot component Renders child component without page title and back button same as children in React
    //   <Text>Footer</Text>
    // </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
