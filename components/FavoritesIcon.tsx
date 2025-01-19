import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CartContext } from "../CartContext";

import { NavigationProp } from "@react-navigation/native";

export function FavoritesIcon({ navigation }: { navigation: NavigationProp<any> }) {
    const { getItemsCount } = useContext(CartContext);
    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
                onPress={() => {
                    navigation.navigate("Favorites");
                }}
            >
                Favorites ({getItemsCount()})
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        backgroundColor: "#6a1b9a",
        height: 38,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontWeight: "bold",
    },
});
