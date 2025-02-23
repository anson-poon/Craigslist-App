import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";


export function ProfileHome() {
    return (
      <View style={styles.container}>
          
        {/* Settings Icon */}
        <View style={styles.settingsIcon}>
          <FontAwesome6 name="user-gear" size={24} color="black" />
        </View>
  
        {/* User Profile Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.userName}>Dog Owner One</Text>
          <Image source={require("../assets/images/dog.jpg")} style={styles.profilePhotoImage} />
          <Text style={styles.description}>
            I am an example user on this platform. I have sold X amount of products, 
            and Y amount of feedback has been given to me!
          </Text>

        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  profilePhotoImage: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    marginVertical: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  settingsIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default ProfileHome;
