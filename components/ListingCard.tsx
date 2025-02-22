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

export function Listing({ id, name, price, image, description, category, isNew, onPress }: ListingProps) {
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme ?? "light");

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} delayPressIn={250}>
            <Image style={styles.thumb} source={image ? { uri: image } : require("../assets/images/icon.png")} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>${price}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.category}>Category: {category}</Text>
                <Text style={styles.condition}>Condition: {isNew ? "New" : "Used"}</Text>
            </View>
        </TouchableOpacity>
    );
}

const getStyles = (colorScheme: "light" | "dark") => {
    const backgroundColor = { light: "#ffffff", dark: "#000000" };
    const textColor = { light: "#000000", dark: "#ffffff" };

    return StyleSheet.create({
        productsList: {
            backgroundColor: backgroundColor[colorScheme],
        },
        productsListContainer: {
            backgroundColor: backgroundColor[colorScheme],
            marginHorizontal: 14,
        },
        card: {
            backgroundColor: colorScheme === "dark" ? "#222" : "white",
            borderRadius: 12,
            shadowOpacity: 0.2,
            shadowRadius: 4,
            shadowColor: "black",
            shadowOffset: {
                height: 0,
                width: 0,
            },
            elevation: 2,
            marginVertical: 20,
        },
        thumb: {
            height: 200,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            width: "100%",
        },
        infoContainer: {
            padding: 12,
        },
        name: {
            fontSize: 20,
            fontWeight: "bold",
            color: textColor[colorScheme],
        },
        price: {
            fontSize: 18,
            fontWeight: "400",
            marginBottom: 8,
            color: textColor[colorScheme],
        },
        description: {
            color: textColor[colorScheme],
        },
        category: {
            color: textColor[colorScheme],
        },
        condition: {
            color: textColor[colorScheme],
        },
    });
};
