import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { createNewListing } from "../services/ListingsService"; // Will use this import for integrating front + back

export function CreateThisListing() {
    const [listingAttribute, placeText] = useState({
      productName: '',
      category: '',
      description: '',
      imageUrl: '',
      isNew: false,
      price: '',
      userID: '',
      dateCreated:'',
    });

    return (
        <View style={styles.basicLayout}>

        <TextInput
        style={styles.textField}
        placeholder="Product Name"
        placeholderTextColor="black"
        value={listingAttribute.productName}
        onChangeText={(text) => placeText({ ...listingAttribute, productName: text })}
        />

        <TextInput
        style={styles.textField}
        placeholder="Category"
        placeholderTextColor="black"
        value={listingAttribute.productName}
        onChangeText={(text) => placeText({ ...listingAttribute, category: text })}
        />

        <TextInput
        style={styles.textField}
        placeholder="Description"
        placeholderTextColor="black"
        value={listingAttribute.productName}
        onChangeText={(text) => placeText({ ...listingAttribute, description: text })}
        />

        <TextInput
        style={styles.textField}
        placeholder="Image URL"
        placeholderTextColor="black"
        value={listingAttribute.productName}
        onChangeText={(text) => placeText({ ...listingAttribute, imageUrl: text })}
        />


        <TextInput
        style={styles.textField}
        placeholder="Is New"
        placeholderTextColor="black"
        value={listingAttribute.productName}
        onChangeText={(text) => placeText({ ...listingAttribute, imageUrl: text })} // Fix this for is New atrribute 
        />

        <TextInput
        style={styles.textField}
        placeholder="Price"
        placeholderTextColor="black"
        value={listingAttribute.productName}
        onChangeText={(text) => placeText({ ...listingAttribute, price: text })}
        />

        <TextInput
        style={styles.textField}
        placeholder="User ID"
        placeholderTextColor="black"
        value={listingAttribute.productName}
        onChangeText={(text) => placeText({ ...listingAttribute, userID: text })}
        />

        <TextInput
        style={styles.textField}
        placeholder="Date Created"
        placeholderTextColor="black"
        value={listingAttribute.productName}
        onChangeText={(text) => placeText({ ...listingAttribute, dateCreated: text })}
        />
     
        </View>
      );
    }

const styles = StyleSheet.create({
    basicLayout: {
      justifyContent: 'center', 
      alignItems: 'center', 
      flex: 1,
      backgroundColor: 'white', 
      padding: 10,
    },
    textField: {
      borderColor: 'black', 
      borderWidth: 5,
      marginBottom: 15,
      paddingHorizontal: 15,
      color: 'black', 
      backgroundColor: 'white', 
      alignContent: 'center'
    },
    buttonText: {
      color: 'black', 
    }
  });
  