import React from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";

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

/*
    The Listing component displays a listing card with a name, price, and other information
*/
export function Listing({ id, name, price, image, description, category, isNew, onPress }: ListingProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image style={styles.thumb} source={image ? { uri: image } : require("../assets/images/icon.png")} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>${price}</Text>
                <Text>{description}</Text>
                <Text>Category: {category}</Text>
                <Text>Condition: {isNew ? "New" : "Used"}</Text>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
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
    },
    price: {
        fontSize: 18,
        fontWeight: "400",
        marginBottom: 8,
    },
});
