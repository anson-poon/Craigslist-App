import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationProp } from "@react-navigation/native";

/*
    Ths displays user profile basic layout 
*/
export function UserProfile({ navigation }: { navigation: NavigationProp<any> }) {
    return (
    <View style={styles.basicLayout}>

      {/* This needs to be changed later to a READ user profile pic for dynamic changes
      during different user login profile pics */}
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
  basicLayout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5DC",
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
    color: "#263238",
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
