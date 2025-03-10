import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { updateExistingUser } from "@/services/UserServices";
import { useAuth } from "@/AuthContext";

export function UserProfileSettings() {

  const { user } = useAuth(); // Get authenticated user

  // Mandatory Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Optional Fields
  const [description, setDescription] = useState("");
  // const [profilePicture, setProfilePicture] = useState("null");


  // Function to update username in Firestore
  const usersUsernameUpdate = () => {
    if (user?.uid) {
      updateExistingUser(user.uid, { username });
    }
  };

  // Function to update description in Firestore
  const usersDescriptionUpdate = () => {
    if (user?.uid) {
      updateExistingUser(user.uid, { description: description || "Description not created!" });
    }
  };
  
  return (

    /* Form Fields */

    <View style={styles.basicLayout}>
      <Text style={styles.pageLabel}>User Settings</Text>


      {/* Done */}
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Username:</Text> 
        <View style={styles.row}>
          <TextInput style={styles.text} value={username} onChangeText={setUsername} />
          <Button title="Save" onPress={() => { 
            usersUsernameUpdate(); 
            alert("Username Changed!"); 
          }} />
        </View>
      </View>
    
      {/* Done */}
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>User Description:</Text> 
        <View style={styles.row}>
          <TextInput style={styles.text} value={description} onChangeText={setDescription} />
          <Button title="Save" onPress={() => { 
            usersDescriptionUpdate(); 
            alert("Description changed or created!"); 
          }} />
        </View>
      </View>


    </View>
  );

}

const styles = StyleSheet.create({
  basicLayout: { 
    flex: 1, 
    alignItems: "center", 
    padding: 5, 
    width: "100%",
    backgroundColor: "#F5F5DC",
  },
  pageLabel: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 30
  },
  formLabel: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 5,
    textAlign: "left", 
    width: "100%", 
  },
  formContainer: { 
    width: "100%", 
    marginBottom: 15 
  },
  row: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between" 
  },
  text: {
    flex: 1, 
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10, 
  },
});
