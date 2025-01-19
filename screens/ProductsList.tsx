import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Product } from "../components/Product";
import { getProducts } from "../services/ProductsService";
import { NavigationProp } from "@react-navigation/native";

/*
    The ProductsList component displays a list of products rerieved from the ProductsService.
*/
export function ProductsList({ navigation }: { navigation: NavigationProp<any> }) {
    function renderProduct({
        item: product,
    }: {
        item: { id: number; name: string; price: number; image: any; description: string };
    }) {
        return (
            <Product
                {...product}
                onPress={() => {
                    navigation.navigate("ProductDetails", {
                        productId: product.id,
                    });
                }}
            />
        );
    }

    const [products, setProducts] = useState<
        { id: number; name: string; price: number; image: any; description: string }[]
    >([]);

    useEffect(() => {
        setProducts(getProducts());
    });

    return (
        <FlatList
            style={styles.productsList}
            contentContainerStyle={styles.productsListContainer}
            keyExtractor={(item) => item.id.toString()}
            data={products}
            renderItem={renderProduct}
        />
    );
}
const styles = StyleSheet.create({
    productsList: {
        backgroundColor: "#f7f7f7",
    },
    productsListContainer: {
        backgroundColor: "#f7f7f7",
        marginHorizontal: 14,
    },
});
