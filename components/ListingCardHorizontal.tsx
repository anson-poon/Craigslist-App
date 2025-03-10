import React from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

interface ListingProps {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: { uri: string };
    isNew: boolean;
    onPress: () => void;
}

export function ListingHorizontal({ id, name, price, image, isNew, onPress }: ListingProps) {
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme ?? "light");

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} delayPressIn={250}>
            <Image style={styles.thumb} source={image ? { uri: image } : require("../assets/images/icon.png")} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>${price}</Text>
                <Text style={styles.condition}>{isNew ? "New" : "Used"}</Text>
            </View>
        </TouchableOpacity>
    );
}

const getStyles = (colorScheme: "light" | "dark") => {
    const cardBackgroundColor = { light: "#ffffff", dark: "#222222" };
    const textColor = { light: "#000000", dark: "#ffffff" };

    return StyleSheet.create({
        card: {
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "row",
            backgroundColor: cardBackgroundColor[colorScheme],
            borderRadius: 12,
            shadowOpacity: 0.2,
            shadowRadius: 4,
            shadowColor: "black",
            elevation: 2,
            marginVertical: 8,
        },
        thumb: {
            width: "40%",
            height: 150,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
        },
        infoContainer: {
            flex: 1,
            padding: 12,
        },
        name: {
            fontSize: 18,
            fontWeight: "600",
            color: textColor[colorScheme],
            marginBottom: 8,
        },
        price: {
            fontSize: 18,
            fontWeight: "500",
            color: textColor[colorScheme],
        },
        condition: {
            color: textColor[colorScheme],
        },
    });
};
