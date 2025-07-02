import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  IconButton,
} from "react-native-paper";
import { useRouter } from "expo-router";

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2EAAE1",
  },
};

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const router = useRouter();

  console.log(theme);
  return (
    // <View style={{ flex: 1 }}>
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
                onPress={() => router.replace("/home")}
              />
            ),
          }}
        />
      </Stack>
    </PaperProvider>
    //Stack component Renders child component with page title and back button
    //Slot component Renders child component without page title and back button same as children in React
    //   <Text>Footer</Text>
    // </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
