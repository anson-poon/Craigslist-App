import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    // attempt sign in with function from firebase auth sdk
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      const user = userData.user;
      console.log(userData);
      setUser(user);
      // TODO: Route to browse screen
      // router.replace();
    } catch (error: unknown) {
      // error when signing in
      if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("Unknown error encountered.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      {/*  Show error if necessary */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {/*  Continue // submit with auth */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      {/* Allow redirect to sign up */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Not a member?</Text>
        <TouchableOpacity onPress={() => router.replace("/SignUp")}>
          <Text style={styles.createAccountText}> Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0077FF",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    fontSize: 16,
    color: "#333",
  },
  createAccountText: {
    fontSize: 16,
    color: "#0077FF",
    fontWeight: "bold",
  },
});
