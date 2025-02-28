
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  // use an object to map firebase error codes to user friendly err msgs
  const firebaseErrors: Record<string, string> = {
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/email-already-in-use":
      "This email is already registered. Try again, or sign in.",
    "auth/wrong-password": "Invalid credentials, try again.",
    "auth/user-not-found": "No account found with this email, try again.",
    "auth/invalid-credential": "Invalid credentials, try again.",
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    //  attempt sign in with function from firebase auth sdk
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      // error when signing in
      if (error instanceof FirebaseError) {
        // use firebaseerrors object to get user friendly err msg
        const errorMsg =
          firebaseErrors[error.code] || "Unknown error encountered.";
        setError(errorMsg);
        console.log(error.code);
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
