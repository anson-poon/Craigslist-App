import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Craigslist</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/SignIn")}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/SignUp")}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7F7",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    color: "#333333",
    paddingBottom: "45%",
  },
  button: {
    backgroundColor: "#0077FF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "35%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
