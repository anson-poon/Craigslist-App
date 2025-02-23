import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert, TouchableOpacity} from "react-native";

import { createNewListing } from "../services/ListingsService"; // Ensure this is correctly imported
import { Timestamp } from "firebase/firestore";

export function CreateThisListing() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [price, setPrice] = useState("");
  const [userID, setUserID] = useState("");

  return (

    /* Form Fields */
    <View style={styles.basicLayout}>
      <TextInput
        style={styles.textField}
        placeholder="Product Name"
        placeholderTextColor="black"
        value={productName}
        onChangeText={setProductName}
      />

      <TextInput
        style={styles.textField}
        placeholder="Category"
        placeholderTextColor="black"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.textField}
        placeholder="Description"
        placeholderTextColor="black"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.textField}
        placeholder="Image Url"
        placeholderTextColor="black"
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      <TextInput
        style={styles.textField}
        placeholder="Price"
        placeholderTextColor="black"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        style={styles.textField}
        placeholder="User ID"
        placeholderTextColor="black"
        value={userID}
        onChangeText={setUserID}
      />

      {/* New/Used Buttons  */}
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Condition:</Text>

        <TouchableOpacity onPress={() => setIsNew(true)} style={styles.buttonLayout}>
          <View style={[styles.buttonCircle, isNew && styles.optionPressed]} />
          <Text>New</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsNew(false)} style={styles.buttonLayout}>
          <View style={[styles.buttonCircle, !isNew && styles.optionPressed]} />
          <Text>Used</Text>
        </TouchableOpacity>
      </View>

  
      {/* Create Button - Need to add more form validation here  */}
      <Button
          title="Create This Listing"

          // Number Call - Fixes error from string price not reading correctly when displaying the listing page of the item 
          // Source URL: https://www.w3schools.com/jsref/jsref_Number.asp
          onPress={() => {

            const numericPrice = Number(price); 

          // Call function from listing services - similar format for update and delete later as well 
          createNewListing({
            productName,
            category,
            description,
            imageUrl,
            isNew,
            price: numericPrice, 
            userID,
            dateCreated: Timestamp.now(),
          });
        }}

    // Need to create auto clear forms once successfully created listing item 
/>

    </View>
  );
}

const styles = StyleSheet.create({
  basicLayout: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  textField: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 40,
    width: "90%",
    borderRadius: 5,
    backgroundColor: "white",
    color: "black",
    
  },
  buttonContainer: {
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "flex-start", 
    width: "90%",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 15,
    marginRight: 10,
  },
  buttonLayout: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },
  buttonCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  optionPressed: {
    backgroundColor: "black", 
  },
 
});

