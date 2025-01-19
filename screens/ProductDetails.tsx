import React, { useEffect, useState, useContext } from "react";
import { Text, Image, View, ScrollView, SafeAreaView, Button, StyleSheet } from "react-native";
import { getProduct } from "../services/ProductsService.js";
import { CartContext } from "../CartContext";
import { RouteProp } from "@react-navigation/native";

type ProductDetailsProps = {
    route: RouteProp<{ ProductDetails: { productId: number } }, "ProductDetails">;
};

export function ProductDetails({ route }: ProductDetailsProps) {
    const { productId } = route.params;
    const [product, setProduct] = useState<{
        id: number;
        image: any;
        name: string;
        price: number;
        description: string;
    } | null>(null);

    const { addItemToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchedProduct = getProduct(productId);
        if (fetchedProduct) {
            setProduct(fetchedProduct);
        }
    }, [productId]);

    function onAddToCart() {
        if (product) {
            addItemToCart(product.id);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {product && (
                    <>
                        <Image style={styles.image} source={product.image} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{product.name}</Text>
                            <Text style={styles.price}>$ {product.price}</Text>
                            <Text style={styles.description}>{product.description}</Text>
                            <Button onPress={onAddToCart} title="Add to cart" />
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: "black",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1,
        marginVertical: 20,
    },
    image: {
        height: 300,
        width: "100%",
    },
    infoContainer: {
        padding: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
    },
    price: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        fontWeight: "400",
        color: "#787878",
        marginBottom: 16,
    },
});
