import { Stack } from "expo-router";
import { FC } from "react";

const AuthLayout: FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* public routes for users not signed in */}
      <Stack.Screen name="index" options={{ title: "Welcome" }} />
      <Stack.Screen name="SignIn" options={{ title: "Sign In" }} />
      <Stack.Screen name="SignUp" options={{ title: "Sign Up" }} />
    </Stack>
  );
};

export default AuthLayout;
