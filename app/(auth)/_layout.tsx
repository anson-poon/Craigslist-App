import { Stack } from "expo-router";
import { FC } from "react";

const AuthLayout: FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Public Routes */}
      <Stack.Screen name="index" options={{ title: "Welcome" }} />
      <Stack.Screen name="signIn" options={{ title: "Sign In" }} />
      <Stack.Screen name="signUp" options={{ title: "Sign Up" }} />
    </Stack>
  );
};

export default AuthLayout;
