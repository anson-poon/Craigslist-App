import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/AuthContext";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebaseConfig";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();
  // use an object to map firebase error codes to user friendly err msgs
  const firebaseErrors: Record<string, string> = {
    "auth/email-already-in-use":
      "This email is already registered. Try again, or sign in.",
    "auth/wrong-password": "Invalid credentials, try again.",
    "auth/user-not-found": "No account found with this email, try again.",
    "auth/invalid-credential": "Invalid credentials, try again.",
    "auth/invalid-email": "Please enter a valid email address.",
  };

  const handleSignUp = async () => {
    if (!email || !username || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // attempt sign up with function from firebase auth sdk
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userData.user;
      setUser(user);

      // Create user document in Firestore
      await setDoc(doc(FIREBASE_DB, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: serverTimestamp(),
      });
      console.log(
        "User document successfully created in Firestore for UID:",
        user.uid
      );
    } catch (error) {
      if (error instanceof FirebaseError) {
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
      <Text style={styles.title}>Create an account</Text>

      {/* input fields for user details */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="oneTimeCode"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        textContentType="oneTimeCode"
      />

      {/* Show error if necessary */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Continue button to submit the registration */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Allow redirect to login screen */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already a member?</Text>
        <TouchableOpacity onPress={() => router.replace("/SignIn")}>
          <Text style={styles.loginTextLink}> Log in</Text>
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    color: "#333",
  },
  loginTextLink: {
    fontSize: 16,
    color: "#0077FF",
    fontWeight: "bold",
  },
});
