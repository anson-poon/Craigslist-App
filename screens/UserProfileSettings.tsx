import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { updateExistingUser } from "@/services/UserServices";

export function UserProfileSettings() {

  // Mandatory Fields
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Optional Fields
  const [description, setDescription] = useState("");
  // const [profilePicture, setProfilePicture] = useState("null");
  
  return (
    <View style={styles.basicLayout}>
      <Text style={styles.pageLabel}>User Settings</Text>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email:</Text> 
        <View style={styles.row}>
          <TextInput style={styles.text} value={email} onChangeText={setEmail} />
          <Button title="Save"  />
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>First Name:</Text> 
        <View style={styles.row}>
          <TextInput style={styles.text} value={firstname} onChangeText={setFirstName} />
          <Button title="Save" />
        </View>
      </View>

      
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Last Name:</Text> 
        <View style={styles.row}>
          <TextInput style={styles.text} value={lastname} onChangeText={setLastName} />
          <Button title="Save" />
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Username:</Text> 
        <View style={styles.row}>
          <TextInput style={styles.text} value={username} onChangeText={setUsername} />
          <Button title="Save" />
        </View>
      </View>
 
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Password:</Text> 
        <View style={styles.row}>
          <TextInput style={styles.text} value={password} onChangeText={setPassword} />
          <Button title="Save" />
        </View>
      </View>

    
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>User Description:</Text> 
        <View style={styles.row}>
          <TextInput style={styles.text} value={description} onChangeText={setDescription} />
          <Button title="Save"/>
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
