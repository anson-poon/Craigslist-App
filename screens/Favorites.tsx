import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { CartContext } from "../CartContext";

import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    Cart: undefined;
    // Add other screens here if needed
};

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, "Cart">;

/*
    The Cart component displays a list of items in the cart.
*/
export function Favorites({ navigation }: { navigation: CartScreenNavigationProp }) {
    const { items, getItemsCount, getTotalPrice } = useContext(CartContext);

    function Totals() {
        let [total, setTotal] = useState(0);
        useEffect(() => {
            setTotal(getTotalPrice());
        });
        return (
            <View style={styles.cartLineTotal}>
                <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
                <Text style={styles.lineRight}>$ {total}</Text>
            </View>
        );
    }
    function renderItem({
        item,
    }: {
        item: { product: { name: string; id: number } | undefined; qty: number; totalPrice: number };
    }) {
        return (
            <View style={styles.cartLine}>
                <Text style={styles.lineLeft}>
                    {item.product?.name ?? "Unknown"} x {item.qty}
                </Text>
                <Text style={styles.lineRight}>$ {item.totalPrice}</Text>
            </View>
        );
    }

    return (
        <FlatList
            style={styles.itemsList}
            contentContainerStyle={styles.itemsListContainer}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.product?.id.toString() ?? Math.random().toString()}
            ListFooterComponent={Totals}
        />
    );
}
const styles = StyleSheet.create({
    cartLine: {
        flexDirection: "row",
    },
    cartLineTotal: {
        flexDirection: "row",
        borderTopColor: "#dddddd",
        borderTopWidth: 1,
    },
    lineTotal: {
        fontWeight: "bold",
    },
    lineLeft: {
        fontSize: 20,
        lineHeight: 40,
        color: "#333333",
    },
    lineRight: {
        flex: 1,
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 40,
        color: "#333333",
        textAlign: "right",
    },
    itemsList: {
        backgroundColor: "#eeeeee",
    },
    itemsListContainer: {
        backgroundColor: "#eeeeee",
        paddingVertical: 8,
        marginHorizontal: 8,
    },
});
