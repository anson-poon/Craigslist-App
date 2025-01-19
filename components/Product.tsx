import React from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
interface ProductProps {
    name: string;
    price: number;
    image: { uri: string };
    onPress: () => void;
}

/*
    The Product component displays a product card with a name, price, and image.
*/
export function Product({ name, price, image, onPress }: ProductProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image style={styles.thumb} source={image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>$ {price}</Text>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        shadowOpacity: 0.8,
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
